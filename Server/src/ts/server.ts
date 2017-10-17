import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase } from './DataBase';
import { Config } from './Config';
import { JsonResponse } from './JsonResponse';
import { Token } from './Token';
import { UserInfo } from './UserInfo';

const app: express.Express = express();

enum ResponseStatus {
	OK = 200,
	BAD_REQUEST = 400,
	FORBIDDEN = 403,
	INTERNAL_SERVER_ERROR = 500
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
DataBase.init();

app.get('/', () => {
});

app.get('/users/:token', (req: express.Request, res: express.Response) => {
	DataBase.getUserInfoByToken(req.params.token, (userInfo: UserInfo) => {
		const jsonResponse: JsonResponse = new JsonResponse();
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

app.post('/', () => {
});

app.post('/users/authenticate', (req: any, res: any) => {
	let responseJson: JsonResponse = new JsonResponse;

	try {
		if (!req.body || !req.body.login || !req.body.password) {
			responseJson.responseCode = 1;
			return res.status(ResponseStatus.BAD_REQUEST).send(responseJson);
		}

		const login: string = req.body.login;
		const password: string = req.body.password;

		DataBase.getUserId(login, password, (id: number) => {
			let httpStatus: number;
			if (id === DataBase.Result.USER_NOT_EXISTS) {
				responseJson.responseCode = 2;
				httpStatus = ResponseStatus.FORBIDDEN;
			} else if (id === DataBase.Result.WRONG_PASSWORD) {
				responseJson.responseCode = 3;
				httpStatus = ResponseStatus.FORBIDDEN;
			} else {
				const token: string = Token.create({ userId: id });
				responseJson.responseCode = 0;
				responseJson.response = { token: token };
				httpStatus = ResponseStatus.OK;
			}
			res.status(httpStatus).send(responseJson);
		});
	} catch (error) {
		responseJson.responseCode = 4;
		res.status(ResponseStatus.INTERNAL_SERVER_ERROR).send(responseJson);
	}
});

app.put('/', () => {
});

app.delete('/', () => {
});

app.listen(Config.port, () => {
});
