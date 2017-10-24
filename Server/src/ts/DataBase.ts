import { Config } from './Config';
import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { UserInfo } from './UserInfo';
import { User } from './User';
import { ResponseCode } from './ResponseCode';

export class DataBase {
	private static _instance: Database =
		new Database(Config.dbName, OPEN_READWRITE | OPEN_CREATE, (err: Error) => DataBase.initialize(err));

	public static editUser(id: number, password: string, newData: User, callback: (result: ResponseCode) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			DataBase.throwIf(err);
			if (!row) {
				callback(ResponseCode.USER_NOT_EXISTS);
				return;
			}

			const currentData: User = new User(row.id, row.login, row.password, row.name);

			if (password !== currentData.password) {
				callback(ResponseCode.WRONG_PASSWORD);
				return;
			}

			if (newData.login !== currentData.login) {
				DataBase.isLoginInUse(newData.login, (isInUse: boolean) => {
					if (isInUse) {
						callback(ResponseCode.LOGIN_IN_USE);
					} else {
						DataBase.updateUser(id, newData, callback);
					}
				});
			} else {
				DataBase.updateUser(id, newData, callback);
			}
		});
	}

	public static insertUser(login: string, password: string, callback: (result: ResponseCode) => void): void {
		DataBase.isLoginInUse(login, (isLoginFound: boolean): void => {
			if (isLoginFound) {
				callback(ResponseCode.LOGIN_IN_USE);
				return;
			}
			const query: string = 'INSERT INTO user (login, password) VALUES (?, ?)';
			DataBase._instance.run(query, login, password, (err: Error): void => {
				if (err) {
					callback(ResponseCode.INTERNAL_ERROR);
					return;
				}
				callback(ResponseCode.OK);
			});
		});
	}

	public static deleteUserById(id: number, callback: (result: ResponseCode) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			if (err) {
				throw err;
			}
			if (!row) {
				callback(ResponseCode.USER_NOT_EXISTS);
				return;
			}

			DataBase._instance.run('DELETE FROM user WHERE id = ?', id, (err: Error) => {
				if (err) {
					throw err;
				}
				callback(ResponseCode.OK);
			});
		});
	}

	public static getUserId(login: string, password: string, callback: (result: ResponseCode, id: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (err) {
				callback(ResponseCode.INTERNAL_ERROR, 0);
			} else if (!row) {
				callback(ResponseCode.USER_NOT_EXISTS, 0);
			} else if (password !== row.password) {
				callback(ResponseCode.WRONG_PASSWORD, 0);
			} else {
				callback(ResponseCode.OK, row.id);
			}
		});
	}

	public static getUserInfoById(id: number, callback: (result: ResponseCode, info: UserInfo) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			if (err) {
				callback(ResponseCode.INTERNAL_ERROR, null);
			} else if (!row) {
				callback(ResponseCode.USER_NOT_EXISTS, null);
			} else {
				callback(ResponseCode.OK, new UserInfo(row.login, row.name));
			}
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

	private static updateUser(id: number, newData: User, callback: (result: number) => void): void {
		const query: string = 'UPDATE user SET login = ?, password = ?, name = ? WHERE id = ?';
		DataBase._instance.run(query, [newData.login, newData.password, newData.name, id], (err: Error) => {
			DataBase.throwIf(err);
			callback(ResponseCode.OK);
		});
	}

	private static throwIf(err: any): void {
		if (err) {
			throw err;
		}
	}
}
