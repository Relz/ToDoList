import { Config } from './Config';
import { Database, OPEN_CREATE, OPEN_READWRITE } from 'sqlite3';
import { UserInfo } from './UserInfo';
import { User } from './User';
import { ResponseCode } from './ResponseCode';
import { Task } from './Task';
import { PasswordEncoder, PasswordInfo } from './PasswordEncoding';

export class DataBase {
	private static _instance: Database =
		new Database(Config.dbName, OPEN_READWRITE | OPEN_CREATE, (err: Error) => DataBase.initialize(err));

	public static setTaskDone(
		userId: number, taskId: number, isDone: boolean, callback: (result: ResponseCode) => void
	): void {
		const query: string = 'UPDATE task SET isDone = ? WHERE id = ? AND userId = ?';
		DataBase._instance.run(query, isDone, taskId, userId, function (err: Error): void {
			if (err) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}
			callback(this.changes > 0 ? ResponseCode.OK : ResponseCode.WRONG_ID);
		});
	}

	public static setTaskImportant(
		userId: number, taskId: number, isImportant: boolean, callback: (result: ResponseCode) => void
	): void {
		const query: string = 'UPDATE task SET isImportant = ? WHERE id = ? AND userId = ?';
		DataBase._instance.run(query, isImportant, taskId, userId, function (err: Error): void {
			if (err) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}
			callback(this.changes > 0 ? ResponseCode.OK : ResponseCode.WRONG_ID);
		});
	}

	public static deleteTask(userId: number, taskId: number, callback: (result: ResponseCode) => void): void {
		DataBase._instance.run('DELETE FROM task WHERE id = ? AND userId = ?', taskId, userId, function(err: Error): void {
			if (err) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}
			callback(this.changes > 0 ? ResponseCode.OK : ResponseCode.WRONG_ID);
		});
	}

	public static insertTask(task: Task, callback: (result: ResponseCode) => void): void {
		const query: string =
			'INSERT INTO task ' +
				'(title, description, creationDate, deadline, isDone, isImportant, userId)' +
				'VALUES (?, ?, ?, ?, ?, ?, ?)';
		DataBase._instance.run(
			query,
			task.title === undefined ? '' : task.title,
			task.description === undefined ? '' : task.description,
			task.creationDate === undefined ? Date.now() : task.creationDate,
			task.deadline === undefined ? null : task.deadline,
			task.isDone === undefined ? false : task.isDone,
			task.isImportant === undefined ? false : task.isImportant,
			task.userId === undefined ? null : task.userId,
			(err: Error) => {
				callback(err ? ResponseCode.INTERNAL_ERROR : ResponseCode.OK);
			}
		);
	}

	public static editTask(task: Task, callback: (result: ResponseCode) => void): void {
		const query: string =
			'UPDATE task SET title = ?, description = ?, deadline = ?, isDone = ?, isImportant = ? WHERE id = ? AND userId = ?';
		DataBase._instance.run(
			query,
			task.title,
			task.description,
			task.deadline,
			task.isDone,
			task.isImportant,
			task.id,
			task.userId,
			function (err: Error): void {
				if (err) {
					return callback(ResponseCode.INTERNAL_ERROR);
				}
				callback(this.changes > 0 ? ResponseCode.OK : ResponseCode.WRONG_ID);
			}
		);
	}

	public static editUser(id: number, password: string, newData: User, callback: (result: ResponseCode) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, user: User) => {
			if (err) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}

			if (!user) {
				return callback(ResponseCode.WRONG_ID);
			}

			const passCorrect: boolean = PasswordEncoder.isCorrect(password, new PasswordInfo(user.password, user.salt));
			if (passCorrect === undefined) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}

			if (!passCorrect) {
				return callback(ResponseCode.WRONG_PASSWORD);
			}

			if (newData.login !== user.login) {
				DataBase.isLoginInUse(newData.login, (isInUse: boolean) => {
					if (isInUse) {
						callback(ResponseCode.WRONG_LOGIN);
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
				return callback(ResponseCode.WRONG_LOGIN);
			}

			const passwordInfo: PasswordInfo = PasswordEncoder.encode(password);
			if (passwordInfo === undefined) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}

			const query: string = 'INSERT INTO user (login, password, salt) VALUES (?, ?, ?)';
			DataBase._instance.run(query, login, passwordInfo.hash, passwordInfo.salt, (err: Error): void => {
				callback(err ? ResponseCode.INTERNAL_ERROR : ResponseCode.OK);
			});
		});
	}

	public static deleteUserById(id: number, callback: (result: ResponseCode) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: User) => {
			if (err) {
				return callback(ResponseCode.INTERNAL_ERROR);
			}
			if (!row) {
				return callback(ResponseCode.WRONG_ID);
			}
			DataBase._instance.run('DELETE FROM user WHERE id = ?', id, (err: Error) => {
				callback(err ? ResponseCode.INTERNAL_ERROR : ResponseCode.OK);
			});
		});
	}

	public static getUserId(login: string, password: string, callback: (result: ResponseCode, id: number) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE login = ?', login, (err: Error, row: User) => {
			if (err) {
				return callback(ResponseCode.INTERNAL_ERROR, 0);
			}
			if (!row) {
				return callback(ResponseCode.WRONG_LOGIN, 0);
			}

			const passCorrect: boolean = PasswordEncoder.isCorrect(password, new PasswordInfo(row.password, row.salt));
			if (passCorrect === undefined) {
				return callback(ResponseCode.INTERNAL_ERROR, 0);
			}

			if (!passCorrect) {
				return callback(ResponseCode.WRONG_PASSWORD, 0);
			}

			callback(ResponseCode.OK, row.id);
		});
	}

	public static getUserInfoById(id: number, callback: (result: ResponseCode, info: UserInfo) => void): void {
		DataBase._instance.get('SELECT * FROM user WHERE id = ?', id, (err: Error, row: User) => {
			if (err) {
				callback(ResponseCode.INTERNAL_ERROR, null);
			} else if (!row) {
				callback(ResponseCode.WRONG_ID, null);
			} else {
				callback(ResponseCode.OK, new UserInfo(row.login, row.name));
			}
		});
	}

	public static isLoginInUse(login: string, callback: (isInUse: boolean) => void): void {
		DataBase._instance.get('SELECT 1 FROM user WHERE login = ?', login, (err: Error, row: User) => {
			callback(row !== undefined);
		});
	}

	public static getUserTasks(
		id: number, isDone: boolean, callback: (result: ResponseCode, userTasks: Task[]) => void
	): void {
		DataBase._instance.all(
			'SELECT * FROM task WHERE userId = ? AND isDone = ?', id, isDone,
			(err: Error, rows: Task[]) => {
				if (err) {
					callback(ResponseCode.INTERNAL_ERROR, undefined);
				} else if (!rows) {
					callback(ResponseCode.WRONG_ID, undefined);
				} else {
					callback(ResponseCode.OK, rows);
				}
			}
		);
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
			'isImportant  INTEGER(1),' +
			'userId       INTEGER' +
			');', () => {}
		);
	}

	private static createUserTable(): void {
		DataBase._instance.run(
			'CREATE TABLE IF NOT EXISTS user (' +
			'id       INTEGER PRIMARY KEY,' +
			'login    VARCHAR UNIQUE,' +
			'password VARCHAR,' +
			'name     VARCHAR,' +
			'salt     VARCHAR' +
			');', () => {}
		);
	}

	private static initialize(err: Error): void {
		if (err) {
			return;
		}
		DataBase.createTaskTable();
		DataBase.createUserTable();
	}

	private static updateUser(id: number, newData: User, callback: (result: number) => void): void {
		const passwordInfo: PasswordInfo = PasswordEncoder.encode(newData.password);
		if (passwordInfo === undefined) {
			return callback(ResponseCode.INTERNAL_ERROR);
		}

		const query: string = 'UPDATE user SET login = ?, password = ?, name = ?, salt = ? WHERE id = ?';
		DataBase._instance.run(query, newData.login, passwordInfo.hash, newData.name, passwordInfo.salt, id, (err: Error) => {
			callback(err ? ResponseCode.INTERNAL_ERROR : ResponseCode.OK);
		});
	}
}
