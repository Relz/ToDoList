import { Config } from './Config';
import * as sqlite3 from 'sqlite3';

export class DataBase {
	public static readonly userNotExists = -1;
	public static readonly wrongPassword = -2;

	private static db = new sqlite3.Database(Config.dbName, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: Error) => {
		if (err) {
			throw err;
		}
	});

	public static getUserId(login: string, password: string, callBack: (err, rowId) => any): void {
		DataBase.db.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: any) => {
			if (!row) {
				callBack(err, DataBase.userNotExists);
			} else if (password !== row.password) {
				callBack(err, DataBase.wrongPassword);
			} else {
				callBack(err, row.id);
			}
		});
	}

	public static getUsers(): any[] {
		let result: any[] = [];
		DataBase.db.each('SELECT * FROM user', (err: Error, row: any) => {
			if (err) {
				throw err;
			}
			result.push(row);
		});

		return result;
	}

	// Must be called before first using
	public static init(): void {
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
