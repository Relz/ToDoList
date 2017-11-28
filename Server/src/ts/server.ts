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

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users/:token', (req: express.Request, res: express.Response) => {
	let id: number;

	try {
		id = Token.decodeId(req.params.token);
	} catch (exception) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	DataBase.getUserInfoById(id, (result: ResponseCode, info: UserInfo) => {
		const response: JsonResponse = new JsonResponse(result, info);
		return res.status(response.httpStatus).send(response);
	});
});

app.post('/users/registration', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.signIn || !req.body.password || !req.body.name) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response.jsonString());
	}

	const login: string = req.body.signIn;
	const password: string = req.body.password;
	const name: string = req.body.name;

	const onTakeUserId: any = (result: ResponseCode, id: number) => {
		const user: User = new User(id, login, password, name);
		DataBase.editUser(id, password, user, (result: ResponseCode) => {
			let response: JsonResponse = new JsonResponse(result);
			if (result === ResponseCode.OK) {
				response.body = { token: Token.createFromId(id) };
			} else {
				response.code = ResponseCode.INTERNAL_ERROR;
			}
			res.status(response.httpStatus).send(response.jsonString());
		});
	};

	DataBase.insertUser(login, password, (result: ResponseCode) => {
		if (result == ResponseCode.OK) {
			return DataBase.getUserId(login, password, onTakeUserId);
		}
		const response: JsonResponse = new JsonResponse(result);
		res.status(response.httpStatus).send(response.jsonString());
	});
});

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.signIn || !req.body.password) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response.jsonString());
	}

	const login: string = req.body.signIn;
	const password: string = req.body.password;

	DataBase.getUserId(login, password, (result: ResponseCode, id: number) => {
		const response: JsonResponse = new JsonResponse(result);
		if (response.code === ResponseCode.OK) {
			response.body = { token: Token.createFromId(id) };
		}
		res.status(response.httpStatus).send(response.jsonString());
	});
});

app.put('/users/edit/:token', (req: express.Request, res: express.Response) => {
	let userId: number;

	try {
		userId = Token.decodeId(req.params.token);
	} catch (exception) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	if (!req.body || !req.body.signIn || !req.body.name || !req.body.password) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response);
	}

	const login: string = req.body.signIn;
	const password: string = req.body.password;
	const newPassword: string = req.body.newPassword !== undefined ? req.body.newPassword : password;
	const name: string = req.body.name;
	const newData: User = new User(userId, login, newPassword, name);

	DataBase.editUser(userId, password, newData, (result: ResponseCode) => {
		const response: JsonResponse = new JsonResponse(result);
		res.status(response.httpStatus).send(response);
	});
});

app.delete('/users/delete/:token', (req: express.Request, res: express.Response) => {
	let id: number;

	try {
		id = Token.decodeId(req.params.token);
	} catch (err) {
		let response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	DataBase.deleteUserById(id, (result: ResponseCode) => {
		let response: JsonResponse = new JsonResponse(result);
		res.status(response.httpStatus).send(response);
	});
});

app.get('/tasks/:token', (req: express.Request, res: express.Response) => {
	let id: number;

	try {
		id = Token.decodeId(req.params.token);
	} catch (exception) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	DataBase.getUserTasks(id, (result: ResponseCode, userTasks: Task[]) => {
		const response: JsonResponse = new JsonResponse(result, userTasks);
		return res.status(response.httpStatus).send(response);
	});
});

app.post('/tasks/create/:token', (req: express.Request, res: express.Response) => {
	let userId: number;

	try {
		userId = Token.decodeId(req.params.token);
	} catch (exception) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	if (!req.body || !req.body.title || !req.body.description) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response);
	}

	const task: Task = new Task(
		undefined, req.body.title, req.body.description, Date.now(), req.body.deadline, false, userId);

	DataBase.insertTask(task, (result: ResponseCode) => {
		const response: JsonResponse = new JsonResponse(result);
		res.status(response.httpStatus).send(response);
	});
});

app.listen(Config.port, () => {
});
