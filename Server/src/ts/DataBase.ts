import { Config } from './Config';
import * as sqlite3 from 'sqlite3';

export class DataBase {
	private static db = new sqlite3.Database(Config.dbName);

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
