import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase } from './DataBase';
import { ResponseCode } from './ResponseCode';
import { JsonResponse } from './JsonResponse';
import { Config } from './Config';
import { Token } from './Token/Token';
import { UserInfo } from './UserInfo';
import { User } from './User';
import { Task } from './Task';

class Server {
	public express: express.Application;

	constructor() {
		this.express = express();
		this.express.use(cors());
		this.express.use(bodyParser.urlencoded({ extended: true }));
		this.express.use(bodyParser.json());
		this.routes();
		this.express.listen(Config.port, () => undefined);
	}

	private routes(): void {
		const router: express.Router = express.Router();
		router.get('/users/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}
			DataBase.getUserInfoById(userId, (result: ResponseCode, info: UserInfo) => {
				const response: JsonResponse = new JsonResponse(result, info);
				return res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.post('/users/register', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			if (!req.body || !req.body.login || !req.body.password || !req.body.name) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			const user: User = new User(undefined, req.body.login, req.body.password, req.body.name);

			const onTakeUserId: (result: ResponseCode, id: number) => void =
				(result: ResponseCode, id: number) => {
					user.id = id;
					DataBase.editUser(user.id, user.password, user, (result: ResponseCode) => {
						const response: JsonResponse = new JsonResponse(result);
						if (response.code === ResponseCode.OK) {
							response.body = { token: Token.createFromId(user.id) };
						}
						res.status(response.httpStatus).send(response.jsonString());
					});
				};

			DataBase.insertUser(user.login, user.password, (result: ResponseCode) => {
				if (result == ResponseCode.OK) {
					return DataBase.getUserId(user.login, user.password, onTakeUserId);
				}
				const response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.post('/users/authenticate', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			if (!req.body || !req.body.login || !req.body.password) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			const login: string = req.body.login;
			const password: string = req.body.password;

			DataBase.getUserId(login, password, (result: ResponseCode, id: number) => {
				const response: JsonResponse = new JsonResponse(result);
				if (response.code === ResponseCode.OK) {
					response.body = { token: Token.createFromId(id) };
				}
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.put('/users/edit/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			if (!req.body || !req.body.login || !req.body.name || !req.body.password) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			const login: string = req.body.login;
			const password: string = req.body.password;
			const newPassword: string = req.body.newPassword !== undefined ? req.body.newPassword : password;
			const name: string = req.body.name;
			const newData: User = new User(userId, login, newPassword, name);

			DataBase.editUser(userId, password, newData, (result: ResponseCode) => {
				const response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.delete('/users/delete/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			DataBase.deleteUserById(userId, (result: ResponseCode) => {
				let response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.get('/tasks/done/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			DataBase.getUserTasks(userId, true, (result: ResponseCode, userTasks: Task[]) => {
				const response: JsonResponse = new JsonResponse(result, userTasks);
				return res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.get('/tasks/not_done/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			DataBase.getUserTasks(userId, false, (result: ResponseCode, userTasks: Task[]) => {
				const response: JsonResponse = new JsonResponse(result, userTasks);
				return res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.post('/tasks/create/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			if (!req.body || !req.body.title || !req.body.description) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			const task: Task = new Task(
				undefined,
				req.body.title,
				req.body.description,
				Date.now(),
				req.body.deadline,
				!!req.body.isDone,
				!!req.body.isImportant,
				userId
			);

			DataBase.insertTask(task, (result: ResponseCode) => {
				const response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.put('/tasks/edit/:id/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			if (!req.body || !req.body.title || !req.body.description) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			const task: Task = new Task(
				req.params.id,
				req.body.title,
				req.body.description,
				undefined,
				req.body.deadline,
				req.body.isDone,
				req.body.isImportant,
				userId
			);

			DataBase.editTask(task, (result: ResponseCode) => {
				const response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.delete('/tasks/delete/:id/:token', (req: express.Request, res: express.Response) => {
			res.setHeader('Content-Type', 'application/json');
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			DataBase.deleteTask(userId, req.params.id, (result: ResponseCode) => {
				const response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		router.put('/tasks/set_done/:id/:token', (req: express.Request, res: express.Response) => {
			const userId: number = Token.decodeId(req.params.token);
			if (userId === undefined) {
			const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			if (!req.body || !req.body.isDone) {
				const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
				return res.status(response.httpStatus).send(response.jsonString());
			}

			DataBase.setTaskDone(userId, req.params.id, req.body.isDone, (result: ResponseCode) => {
				const response: JsonResponse = new JsonResponse(result);
				res.status(response.httpStatus).send(response.jsonString());
			});
		});

		this.express.use('/', router);
	}
}

export default new Server().express;
