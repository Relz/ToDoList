import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase } from './DataBase';
import { ResponseCode } from './ResponseCode';
import { JsonResponse } from './JsonResponse';
import { Config } from './Config';
import { Token } from './Token';
import { UserInfo } from './UserInfo';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
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
	}
	catch (exception) {
		const responseBody: JsonResponse = new JsonResponse(ResponseCode.INVALID_TOKEN);
		return res.status(HttpStatusCode.OK).send(responseBody);
	}

	DataBase.getUserInfoById(id, (resultCode: ResponseCode, info: UserInfo) => {
		const responseBody: JsonResponse = new JsonResponse(resultCode, info);
		return res.status(HttpStatusCode.OK).send(responseBody);
	});
});

app.post('/users/registration', (req: express.Request, res: express.Response) => {
	let responseBody: JsonResponse = new JsonResponse();

	if (!req.body || !req.body.login || !req.body.password) {
		responseBody.responseCode = ResponseCode.BAD_REQUEST;
		return res.status(HttpStatusCode.OK).send(responseBody);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	const onTakeUserId: any = (resultCode: ResponseCode, id: number) => {
		responseBody.responseCode = resultCode;
		if (resultCode != ResponseCode.OK) {
			return res.status(HttpStatusCode.OK).send(responseBody);
		}
		responseBody.response = { token: Token.createFormId(id) };
		return res.status(HttpStatusCode.OK).send(responseBody);
	};

	DataBase.insertUser(login, password, (resultCode: ResponseCode) => {
		if (resultCode != ResponseCode.OK) {
			responseBody.responseCode = resultCode;
			return res.status(HttpStatusCode.OK).send(responseBody);
		}
		DataBase.getUserId(login, password, onTakeUserId);
	});
});

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		return res.status(HttpStatusCode.OK).send(new JsonResponse(1));
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	DataBase.getUserId(login, password, (result: ResponseCode, id: number) => {
		switch (result) {
			case ResponseCode.INTERNAL_ERROR:
				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
			case ResponseCode.USER_NOT_EXISTS:
				return res.status(HttpStatusCode.OK).send(new JsonResponse(2));
			case ResponseCode.WRONG_PASSWORD:
				return res.status(HttpStatusCode.OK).send(new JsonResponse(3));
			default:
				res.status(HttpStatusCode.OK).send(new JsonResponse(0, { token: Token.create({ id: id }) }));
		}
	});
});

app.put('/users/edit/:token', (req: express.Request, res: express.Response) => {
	let userId: number;

	try {
		userId = Token.verify(req.params.token).id;
	} catch (err) {
		return res.status(HttpStatusCode.FORBIDDEN).send(new JsonResponse(5));
	}

	if (!req.body || !req.body.login || !req.body.name || !req.body.password) {
		return res.status(HttpStatusCode.BAD_REQUEST).send(new JsonResponse(1));
	}

	const login: string = req.body.login;
	const password: string = req.body.password;
	const newPassword: string = req.body.newPassword !== undefined ? req.body.newPassword : password;
	const name: string = req.body.name;

	const newData: User = new User(userId, login, newPassword, name);

	DataBase.editUser(userId, password, newData, (result: ResponseCode) => {
		switch (result) {
			case ResponseCode.USER_NOT_EXISTS:
				return res.status(HttpStatusCode.FORBIDDEN).send(new JsonResponse(2));
			case ResponseCode.WRONG_PASSWORD:
				return res.status(HttpStatusCode.FORBIDDEN).send(new JsonResponse(3));
			case ResponseCode.LOGIN_IN_USE:
				return res.status(HttpStatusCode.FORBIDDEN).send(new JsonResponse(6));
			default:
				res.status(HttpStatusCode.OK).send(new JsonResponse(0));
		}
	});
});

app.delete('/users/delete/:token', (req: express.Request, res: express.Response) => {
	let id: number;
	try {
		id = Token.verify(req.params.token).id;
	}
	catch (exception) {
		if (exception instanceof JsonWebTokenError) {
			return res.status(HttpStatusCode.BAD_REQUEST).send(new JsonResponse(2));
		}
		if (exception instanceof TokenExpiredError) {
			return res.status(HttpStatusCode.FORBIDDEN).send(new JsonResponse(3));
		}
	}

	DataBase.deleteUserById(id, (result: ResponseCode) => {
		if (result == ResponseCode.USER_NOT_EXISTS) {
			return res.status(HttpStatusCode.BAD_REQUEST).send(new JsonResponse(1));
		}
		res.status(HttpStatusCode.OK).send(new JsonResponse(0));
	});
});

app.listen(Config.port, () => {
});
