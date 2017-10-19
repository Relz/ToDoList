import { Config } from './Config';
import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { UserInfo } from './UserInfo';

export class DataBase {
	private static _instance: Database =
		new Database(Config.dbName, OPEN_READWRITE | OPEN_CREATE, (err: Error) => DataBase.initialize(err));

	public static getUserId(login: string, password: string, callBack: (rowId: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (err) {
				throw err;
			}
			if (!row) {
				callBack(DataBase.Result.USER_NOT_EXISTS);
			} else if (password !== row.password) {
				callBack(DataBase.Result.WRONG_PASSWORD);
			} else {
				callBack(row.id);
			}
		});
	}

	public static getUserInfoById(id: number, callback: (userInfo: UserInfo) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			if (err) {
				throw err;
			}
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
			if (err) {
				throw err;
			}
			result.push(row);
		});

		return result;
	}

	/**
	 * Don't let anyone instantiate this class.
	 */
	private constructor() { }

	private static createTaskTable(): void {
		DataBase._instance.run('CREATE TABLE IF NOT EXISTS task (' +
			'id INTEGER PRIMARY KEY,' +
			'title VARCHAR,' +
			'description VARCHAR,' +
			'creationDate INTEGER,' +
			'deadline INTEGER,' +
			'isDone INTEGER(1),' +
			'userId INTEGER);', (err: Error) => {
				if (err) {
					throw err;
				}
			}
		);
	}

	private static createUserTable(): void {
		DataBase._instance.run('CREATE TABLE IF NOT EXISTS user (' +
			'id INTEGER PRIMARY KEY,' +
			'login VARCHAR UNIQUE,' +
			'password VARCHAR,' +
			'name VARCHAR);', (err: Error) => {
				if (err) {
					throw err;
				}
			}
		);
	}

	private static initialize(err: Error): void {
		if (err) {
			throw err;
		}
		DataBase.createTaskTable();
		DataBase.createUserTable();
	}
}

export namespace DataBase {
	export enum Result {
		USER_NOT_EXISTS = -1,
		WRONG_PASSWORD = -2
	}
}
