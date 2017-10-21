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

const app: express.Express = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

enum ResponseStatus {
	OK = 200,
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	INTERNAL_SERVER_ERROR = 500
}

app.get('/users/:token', (req: express.Request, res: express.Response) => {
	let id: number;
	try {
		id = Token.verify(req.params.token).id;
	}
	catch (exception) {
		if (exception instanceof JsonWebTokenError) {
			res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(2));
			return;
		}
		if (exception instanceof TokenExpiredError) {
			res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(3));
			return;
		}
	}
	DataBase.getUserInfoById(id, (userInfo: UserInfo) => {
		const jsonResponse: JsonResponse = new JsonResponse(undefined, userInfo);
		let responseStatus: number;
		if (userInfo) {
			jsonResponse.responseCode = 0;
			responseStatus = ResponseStatus.OK;
		} else {
			jsonResponse.responseCode = 1;
			responseStatus = ResponseStatus.BAD_REQUEST;
		}
		res.status(responseStatus).send(jsonResponse);
	});
});

app.post('/users/registration', (req: express.Request, res: express.Response) => {
	let responseBody: JsonResponse = new JsonResponse();

	if (!req.body || !req.body.login || !req.body.password) {
		responseBody.responseCode = 1;
		return res.status(ResponseStatus.BAD_REQUEST).send(responseBody);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	const onTakeNewUserId: any = (takeIdResult: DbResult, id: number) => {
		if (takeIdResult == DbResult.OK) {
			const token: string = Token.create({ id: id });
			responseBody.response = { token: token };
			res.status(ResponseStatus.OK).send(responseBody);
		} else {
			responseBody.responseCode = 4;
			res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(responseBody);
		}
	};

	DataBase.insertUser(login, password, (insertResult: DbResult) => {
		switch (insertResult) {
			case DbResult.QUERY_ERROR:
				responseBody.responseCode = 2;
				res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(responseBody);
				break;
			case DbResult.LOGIN_IN_USE:
				responseBody.responseCode = 3;
				res.status(ResponseStatus.BAD_REQUEST).send(responseBody);
				break;
			case DbResult.OK:
				DataBase.getUserId(login, password, onTakeNewUserId);
				break;
		}
	});
});

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	if (!req.body || !req.body.login || !req.body.password) {
		return res.status(ResponseStatus.BAD_REQUEST).send(new JsonResponse(1));
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	DataBase.getUserId(login, password, (id: number) => {
		let jsonResponse: JsonResponse = new JsonResponse();
		let httpStatus: number;
		if (id === DbResult.USER_NOT_EXISTS) {
			jsonResponse.responseCode = 2;
			httpStatus = ResponseStatus.FORBIDDEN;
		} else if (id === DbResult.WRONG_PASSWORD) {
			jsonResponse.responseCode = 3;
			httpStatus = ResponseStatus.FORBIDDEN;
		} else {
			const token: string = Token.create({ id: id });
			jsonResponse.responseCode = 0;
			jsonResponse.response = { token: token };
			httpStatus = ResponseStatus.OK;
		}
		res.status(httpStatus).send(jsonResponse);
	});
});

app.put('/', () => {
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

	const newData: User = new User(
		userId,
		req.body.login,
		(req.body.newPassword !== undefined) ? req.body.newPassword : req.body.password,
		req.body.name
	);

	DataBase.editUser(userId, req.body.password, newData, (dbResult: number) => {
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

app.delete('/', () => {
});

app.listen(Config.port, () => {
});
