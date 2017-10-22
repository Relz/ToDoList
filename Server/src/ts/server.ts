import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase, DbResult } from './DataBase';
import { Config } from './Config';
import { JsonResponse } from './JsonResponse';
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
		if (exception instanceof JsonWebTokenError) {
			return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(2));
		}
		if (exception instanceof TokenExpiredError) {
			return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(3));
		}
	}

	DataBase.getUserInfoById(id, (userInfo: UserInfo) => {
		if (userInfo) {
			return res.status(ResponseStatus.OK).send(new JsonResponse(0, userInfo));
		}
		res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(1));
	});
});

app.post('/users/registration', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(1));
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	const onTakeNewUserId: any = (takeIdResult: DbResult, id: number) => {
		if (takeIdResult == DbResult.OK) {
			res.status(ResponseStatus.OK).send(new JsonResponse(0, { token: Token.create({ id: id }) }));
		} else {
			res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(new JsonResponse(4));
		}
	};

	DataBase.insertUser(login, password, (insertResult: DbResult) => {
		switch (insertResult) {
			case DbResult.QUERY_ERROR:
				return res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(new JsonResponse(2));
			case DbResult.LOGIN_IN_USE:
				return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(3));
			case DbResult.OK:
				DataBase.getUserId(login, password, onTakeNewUserId);
		}
	});
});

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {

		return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(1));
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	DataBase.getUserId(login, password, (dbResult: DbResult, id: number) => {
		switch (dbResult) {
			case DbResult.QUERY_ERROR:
				return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(1));
			case DbResult.USER_NOT_EXISTS:
				return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(2));
			case DbResult.WRONG_PASSWORD:
				return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(3));
			default:
				res.status(ResponseStatus.OK).send(new JsonResponse(0, { token: Token.create({ id: id }) }));
		}
	});
});

app.put('/users/edit/:token', (req: express.Request, res: express.Response) => {
	let userId: number;

	try {
		userId = Token.verify(req.params.token).id;
	} catch (err) {
		return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(5));
	}

	if (!req.body || !req.body.login || !req.body.name || !req.body.password) {
		return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(1));
	}

	const login: string = req.body.login;
	const password: string = req.body.password;
	const newPassword: string = req.body.newPassword !== undefined ? req.body.newPassword : password;
	const name: string = req.body.name;

	const newData: User = new User(userId, login, newPassword, name);

	DataBase.editUser(userId, password, newData, (dbResult: number) => {
		switch (dbResult) {
			case DbResult.USER_NOT_EXISTS:
				return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(2));
			case DbResult.WRONG_PASSWORD:
				return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(3));
			case DbResult.LOGIN_IN_USE:
				return res.status(ResponseStatus.FORBIDDEN).send(new JsonResponse(6));
			default:
				return res.status(ResponseStatus.OK).send(new JsonResponse(0));
		}
	});
});

app.delete('/users/delete/:token', (req: express.Request, res: express.Response) => {
	const jsonResponse: JsonResponse = new JsonResponse();

	let id: number;
	try {
		id = Token.verify(req.params.token).id;
	}
	catch (exception) {
		if (exception instanceof JsonWebTokenError) {
			jsonResponse.responseCode = 2;
			res.status(HttpStatusCode.BAD_REQUEST).send(jsonResponse);
			return;
		}
		if (exception instanceof TokenExpiredError) {
			jsonResponse.responseCode = 3;
			res.status(HttpStatusCode.FORBIDDEN).send(jsonResponse);
			return;
		}
	}

	DataBase.deleteUserById(id, (dbResult: DbResult) => {
		let httpStatusCode: number;
		if (dbResult == DbResult.USER_NOT_EXISTS) {
			jsonResponse.responseCode = 1;
			httpStatusCode = HttpStatusCode.BAD_REQUEST;
		} else {
			jsonResponse.responseCode = 0;
			httpStatusCode = HttpStatusCode.OK;
		}
		res.status(httpStatusCode).send(jsonResponse);
	});
});

app.listen(Config.port, () => {
});
