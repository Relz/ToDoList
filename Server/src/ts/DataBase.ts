import { Config } from './Config';
import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { UserInfo } from './UserInfo';
import { User } from './User';

export class DataBase {
	private static _instance: Database =
		new Database(Config.dbName, OPEN_READWRITE | OPEN_CREATE, (err: Error) => DataBase.initialize(err));

    public static editUser(id: number, password: string, newData: User, callback: (dbResult: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: any) => {
			if (err) {
				throw err;
			}
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
        
	public static getUserId(login: string, password: string, callBack: (rowId: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (err) {
				throw err;
			}
			if (!row) {
				callBack(DbResult.USER_NOT_EXISTS);
			} else if (password !== row.password) {
				callBack(DbResult.WRONG_PASSWORD);
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
    
    public static isLoginInUse(login: string, callback: (isInUse: boolean) => void): void {
		DataBase._instance.get('SELECT 1 FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (err) {
				throw err;
			}

			callback(row !== undefined);
		});
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
    
    private static updateUser(id: number, newData: User, callback: (dbResult: number) => void): void {
		const query: string = 'UPDATE user SET login = ?, password = ?, name = ? WHERE id = ?';
		DataBase._instance.run(query, [newData.login, newData.password, newData.name, id], (err: Error) => {
			if (err) {
				throw err;
			}
			callback(DbResult.OK);
		})
	}
}

export enum DbResult {
	USER_NOT_EXISTS = -1,
	WRONG_PASSWORD = -2,
	LOGIN_IN_USE = -3,
	OK = -4
}
