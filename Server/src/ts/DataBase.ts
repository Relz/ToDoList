import { Config } from './Config';
import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { UserInfo } from './UserInfo';
import { User } from './User';

export class DataBase {
	private static _instance: Database =
		new Database(Config.dbName, OPEN_READWRITE | OPEN_CREATE, (err: Error) => DataBase.initialize(err));

	public static editUser(id: number, password: string, newData: User, callback: (dbResult: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			DataBase.throwIf(err);
			if (!row) {
				callback(DbResult.USER_NOT_EXISTS);
				return;
			}

			const currentData: User = new User(row.id, row.login, row.password, row.name);

			if (password !== currentData.password) {
				callback(DbResult.WRONG_PASSWORD);
				return;
			}

			if (newData.login !== currentData.login) {
				DataBase.isLoginInUse(newData.login, (isInUse: boolean) => {
					if (isInUse) {
						callback(DbResult.LOGIN_IN_USE);
					} else {
						DataBase.updateUser(id, newData, callback);
					}
				});
			} else {
				DataBase.updateUser(id, newData, callback);
			}
		});
	}

	public static insertUser(login: string, password: string, callback: (result: DbResult) => void): void {
		DataBase.isLoginInUse(login, (isLoginFound: boolean): void => {
			if (isLoginFound) {
				callback(DbResult.LOGIN_IN_USE);
				return;
			}
			const query: string = 'INSERT INTO user (login, password) VALUES (?, ?)';
			DataBase._instance.run(query, login, password, (err: Error): void => {
				if (err) {
					callback(DbResult.QUERY_ERROR);
					return;
				}
				callback(DbResult.OK);
			});
		});
	}

	public static getUserId(login: string, password: string, callback: (dbResult: DbResult, id: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (err) {
				callback(DbResult.QUERY_ERROR, 0);
			} else if (!row) {
				callback(DbResult.USER_NOT_EXISTS, 0);
			} else if (password !== row.password) {
				callback(DbResult.WRONG_PASSWORD, 0);
			} else {
				callback(DbResult.OK, row.id);
			}
		});
	}

	public static getUserInfoById(id: number, callback: (userInfo: UserInfo) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			DataBase.throwIf(err);
			if (!row) {
				callback(undefined);
				return;
			}
			callback(new UserInfo(row.login, row.name));
			return;
		});
	}

	public static getUsers(): any[] {
		let result: any[] = [];
		DataBase._instance.each('SELECT * FROM user', (err: Error, row: any) => {
			DataBase.throwIf(err);
			result.push(row);
		});

		return result;
	}

	public static isLoginInUse(login: string, callback: (isInUse: boolean) => void): void {
		DataBase._instance.get('SELECT 1 FROM user WHERE login = ?', login, (err: Error, row: any) => {
			DataBase.throwIf(err);
			callback(row !== undefined);
		});
	}

	/**
	 * Don't let anyone instantiate this class.
	 */
	private constructor() { }

	private static createTaskTable(): void {
		DataBase._instance.run(
			'CREATE TABLE IF NOT EXISTS task (' +
			'id           INTEGER    PRIMARY KEY,' +
			'title        VARCHAR,' +
			'description  VARCHAR,' +
			'creationDate INTEGER,' +
			'deadline     INTEGER,' +
			'isDone       INTEGER(1),' +
			'userId       INTEGER' +
			');', DataBase.throwIf
		);
	}

	private static createUserTable(): void {
		DataBase._instance.run(
			'CREATE TABLE IF NOT EXISTS user (' +
			'id       INTEGER PRIMARY KEY,' +
			'login    VARCHAR UNIQUE,' +
			'password VARCHAR,' +
			'name     VARCHAR' +
			');', DataBase.throwIf
		);
	}

	private static initialize(err: Error): void {
		DataBase.throwIf(err);
		DataBase.createTaskTable();
		DataBase.createUserTable();
	}

	private static updateUser(id: number, newData: User, callback: (dbResult: number) => void): void {
		const query: string = 'UPDATE user SET login = ?, password = ?, name = ? WHERE id = ?';
		DataBase._instance.run(query, [newData.login, newData.password, newData.name, id], (err: Error) => {
			DataBase.throwIf(err);
			callback(DbResult.OK);
		});
	}

	private static throwIf(err: any): void {
		if (err) {
			throw err;
		}
	}
}

export enum DbResult {
	OK = 0,
	QUERY_ERROR = 1,
	USER_NOT_EXISTS = 2,
	WRONG_PASSWORD = 3,
	LOGIN_IN_USE = 4
}
