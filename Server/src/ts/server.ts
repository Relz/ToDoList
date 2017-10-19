import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase } from './DataBase';
import { Config } from './Config';
import { JsonResponse } from './JsonResponse';
import { Token } from './Token';
import { UserInfo } from './UserInfo';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

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
	const jsonResponse: JsonResponse = new JsonResponse();
	let id: number;
	try {
		id = Token.verify(req.params.token).id;
	}
	catch (exception) {
		if (exception instanceof JsonWebTokenError) {
			res.status(ResponseStatus.BAD_REQUEST).send(jsonResponse);
		} else if (exception instanceof TokenExpiredError) {
			jsonResponse.responseCode = 2;
			res.status(ResponseStatus.BAD_REQUEST).send(jsonResponse);
		}
	}
	DataBase.getUserInfoById(id, (userInfo: UserInfo) => {
		jsonResponse.response = userInfo;
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

app.post('/users/authenticate', (req: express.Request, res: express.Response) => {
	let jsonResponse: JsonResponse = new JsonResponse();

	try {
		if (!req.body || !req.body.login || !req.body.password) {
			jsonResponse.responseCode = 1;
			return res.status(ResponseStatus.BAD_REQUEST).send(jsonResponse);
		}

		const login: string = req.body.login;
		const password: string = req.body.password;

		DataBase.getUserId(login, password, (id: number) => {
			let httpStatus: number;
			if (id === DataBase.Result.USER_NOT_EXISTS) {
				jsonResponse.responseCode = 2;
				httpStatus = ResponseStatus.FORBIDDEN;
			} else if (id === DataBase.Result.WRONG_PASSWORD) {
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
	} catch (error) {
		res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(jsonResponse);
	}
});

app.put('/', () => {
});

app.delete('/', () => {
});

app.listen(Config.port, () => {
});
