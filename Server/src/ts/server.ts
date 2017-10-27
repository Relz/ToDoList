import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase } from './DataBase';
import { ResponseCode } from './ResponseCode';
import { JsonResponse } from './JsonResponse';
import { Config } from './Config';
import { Token } from './Token';
import { UserInfo } from './UserInfo';
import { User } from './User';
import * as HttpStatusCode from 'http-status-codes';

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/users/:token', (req: express.Request, res: express.Response) => {
	let id: number;

	try {
		id = Token.verify(req.params.token).id;
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
	if (!req.body || !req.body.login || !req.body.password) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	const onTakeUserId: any = (result: ResponseCode, id: number) => {
		if (result != ResponseCode.OK) {
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
		}
		const responseBody: Object = { token: Token.createFromId(id) };
		const response: JsonResponse = new JsonResponse(result, responseBody);
		res.status(response.httpStatus).send(response);
	};

	DataBase.insertUser(login, password, (result: ResponseCode) => {
		if (result == ResponseCode.OK) {
			return DataBase.getUserId(login, password, onTakeUserId);
		}
		const response: JsonResponse = new JsonResponse(result);
		res.status(response.httpStatus).send(response);
	});
});

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	DataBase.getUserId(login, password, (result: ResponseCode, id: number) => {
		const responseBody: Object = { token: Token.createFromId(id) };
		const response: JsonResponse = new JsonResponse(result, responseBody);
		res.status(response.httpStatus).send(response);
	});
});

app.put('/users/edit/:token', (req: express.Request, res: express.Response) => {
	let userId: number;

	try {
		userId = Token.verify(req.params.token).id;
	} catch (exception) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	if (!req.body || !req.body.login || !req.body.name || !req.body.password) {
		const response: JsonResponse = new JsonResponse(ResponseCode.BAD_BODY);
		return res.status(response.httpStatus).send(response);
	}

	const login: string = req.body.login;
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
		id = Token.verify(req.params.token).id;
	} catch (err) {
		let response: JsonResponse = new JsonResponse(ResponseCode.BAD_TOKEN);
		return res.status(response.httpStatus).send(response);
	}

	DataBase.deleteUserById(id, (result: ResponseCode) => {
		let response: JsonResponse = new JsonResponse(result);
		res.status(response.httpStatus).send(response);
	});
});

app.listen(Config.port, () => {
});
