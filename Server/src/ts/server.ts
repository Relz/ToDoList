import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { DataBase } from './DataBase';
import { Config } from './Config';
import { JsonResponse } from './JsonResponse';
import { Token } from './Token';

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

app.get('/users', () => {
});

app.post('/', () => {
});

app.post('/users/authenticate', (req, res) => {
	let responseJson: JsonResponse = new JsonResponse;

	try {
		if (!req.body || !req.body.login || !req.body.password) {
			responseJson.responseCode = ResponseStatus.BAD_REQUEST;
			return res.status(responseJson.responseCode).send(responseJson);
		}

		const login = req.body.login;
		const password = req.body.password;

		DataBase.getUserId(login, password, (err, id) => {
			if (err) {
				throw err;
			}
			if (id === DataBase.Result.USER_NOT_EXISTS) {
				responseJson.responseCode = ResponseStatus.FORBIDDEN;
			} else if (id === DataBase.Result.WRONG_PASSWORD) {
				responseJson.responseCode = ResponseStatus.FORBIDDEN;
			} else {
				const payload = { user_id: id };
				const token = Token.create(payload);
				responseJson.responseCode = ResponseStatus.OK;
				responseJson.response = { token: token };
			}
			res.status(responseJson.responseCode).send(responseJson);
		});
	} catch (error) {
		responseJson.responseCode = ResponseStatus.INTERNAL_SERVER_ERROR;
		res.status(responseJson.responseCode).send(responseJson);
	}
});

app.put('/', () => {
});

app.delete('/', () => {
});

app.listen(Config.port, () => {
});
