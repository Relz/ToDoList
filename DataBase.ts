import { CONFIG } from './config';

// 'Verbose' is for DEBUG only
const sqlite3 = require('sqlite3').verbose();

export class DataBase {
	private static db = new sqlite3.Database(CONFIG.DB_NAME);

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
			'login VARCHAR,' +
			'password VARCHAR,' +
			'name VARCHAR);', (err: Error) => {
				if (err) {
					throw err;
				}
			}
		);
	}
}
