import { Config } from './Config';
import * as sqlite3 from 'sqlite3';

export class DataBase {
	private static db: sqlite3.Database;

	public static getUserId(login: string, password: string, callBack: (err: Error, rowId: number) => any): void {
		if (!DataBase.db) {
			throw new Error('Attempting to use DB before initialization');
		}

		DataBase.db.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (!row) {
				callBack(err, DataBase.Result.USER_NOT_EXISTS);
			} else if (password !== row.password) {
				callBack(err, DataBase.Result.WRONG_PASSWORD);
			} else {
				callBack(err, row.id);
			}
		});
	}

	public static getUsers(): any[] {
		if (!DataBase.db) {
			throw new Error('Attempting to use DB before initialization');
		}

		let result: any[] = [];
		DataBase.db.each('SELECT * FROM user', (err: Error, row: any) => {
			if (err) {
				throw err;
			}
			result.push(row);
		});

		return result;
	}

	public static init(): void {
		if (DataBase.db) {
			throw new Error('Attempting to initialize DB twice');
		}

		DataBase.db = new sqlite3.Database(Config.dbName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error) => {
			if (err) {
				throw err;
			}
			DataBase.createTaskTable();
			DataBase.createUserTable();
		});
	}

	private static createTaskTable(): void {
		DataBase.db.run('CREATE TABLE IF NOT EXISTS task (' +
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
		DataBase.db.run('CREATE TABLE IF NOT EXISTS user (' +
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
}

export namespace DataBase {
	export enum Result {
		USER_NOT_EXISTS = -1,
		WRONG_PASSWORD = -2
	}
}
