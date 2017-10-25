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
	let response: JsonResponse = new JsonResponse();

	try {
		id = Token.verify(req.params.token).id;
	} catch (exception) {
		response.code = ResponseCode.BAD_TOKEN;
		return res.status(HttpStatusCode.BAD_REQUEST).send(response);
	}

	DataBase.getUserInfoById(id, (result: ResponseCode, info: UserInfo) => {
		response.code = result;
		switch (result) {
			case ResponseCode.INTERNAL_ERROR:
				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
			case ResponseCode.WRONG_ID:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.OK:
				response.body = info;
				return res.status(HttpStatusCode.OK).send(response);
		}
	});
});

app.post('/users/registration', (req: express.Request, res: express.Response) => {
	let response: JsonResponse = new JsonResponse();

	if (!req.body || !req.body.login || !req.body.password) {
		response.code = ResponseCode.BAD_BODY;
		return res.status(HttpStatusCode.BAD_REQUEST).send(response);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	const onTakeUserId: any = (result: ResponseCode, id: number) => {
		if (result != ResponseCode.OK) {
			response.code = ResponseCode.INTERNAL_ERROR;
			return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(response);
		}
		response.code = ResponseCode.OK;
		response.body = { token: Token.createFrom(id) };
		return res.status(HttpStatusCode.OK).send(response);
	};

	DataBase.insertUser(login, password, (result: ResponseCode) => {
		switch (result) {
			case ResponseCode.OK:
				return DataBase.getUserId(login, password, onTakeUserId);
			case ResponseCode.WRONG_LOGIN:
				response.code = ResponseCode.WRONG_LOGIN;
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.INTERNAL_ERROR:
				response.code = ResponseCode.INTERNAL_ERROR;
				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send(response);
		}
	});
});

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	let response: JsonResponse = new JsonResponse();

	if (!req.body || !req.body.login || !req.body.password) {
		response.code = ResponseCode.BAD_BODY;
		return res.status(HttpStatusCode.BAD_REQUEST).send(response);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;

	DataBase.getUserId(login, password, (result: ResponseCode, id: number) => {
		response.code = result;
		switch (result) {
			case ResponseCode.OK:
				response.body = { token: Token.createFrom(id) };
				return res.status(HttpStatusCode.OK).send(response);
			case ResponseCode.WRONG_LOGIN:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.WRONG_PASSWORD:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.INTERNAL_ERROR:
				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
		}
	});
});

app.put('/users/edit/:token', (req: express.Request, res: express.Response) => {
	let userId: number;
	let response: JsonResponse = new JsonResponse();

	try {
		userId = Token.verify(req.params.token).id;
	} catch (err) {
		response.code = ResponseCode.BAD_TOKEN;
		return res.status(HttpStatusCode.BAD_REQUEST).send(response);
	}

	if (!req.body || !req.body.login || !req.body.name || !req.body.password) {
		response.code = ResponseCode.BAD_BODY;
		return res.status(HttpStatusCode.BAD_REQUEST).send(response);
	}

	const login: string = req.body.login;
	const password: string = req.body.password;
	const newPassword: string = req.body.newPassword !== undefined ? req.body.newPassword : password;
	const name: string = req.body.name;
	const newData: User = new User(userId, login, newPassword, name);

	DataBase.editUser(userId, password, newData, (result: ResponseCode) => {
		response.code = result;
		switch (result) {
			case ResponseCode.OK:
				return res.status(HttpStatusCode.OK).send();
			case ResponseCode.WRONG_ID:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.WRONG_PASSWORD:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.WRONG_LOGIN:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.INTERNAL_ERROR:
				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
		}
	});
});

app.delete('/users/delete/:token', (req: express.Request, res: express.Response) => {
	let id: number;
	let response: JsonResponse = new JsonResponse();

	try {
		id = Token.verify(req.params.token).id;
	} catch (err) {
		response.code = ResponseCode.BAD_TOKEN;
		return res.status(HttpStatusCode.BAD_REQUEST).send(response);
	}

	DataBase.deleteUserById(id, (result: ResponseCode) => {
		response.code = result;
		switch (result) {
			case ResponseCode.OK:
				return res.status(HttpStatusCode.OK).send(response);
			case ResponseCode.WRONG_ID:
				return res.status(HttpStatusCode.BAD_REQUEST).send(response);
			case ResponseCode.INTERNAL_ERROR:
				return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send();
		}
	});
});

app.listen(Config.port, () => {
});
