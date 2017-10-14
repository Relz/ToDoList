import * as cors from 'cors';
import * as express from 'express';
import * as bodyParser from 'body-parser'
import { DataBase } from './DataBase';
import { Config } from './Config';
import { JsonResponse } from './JsonResponse';
import { Token } from './Token';

const app: express.Express = express();

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
			responseJson.responseCode = 400;
			responseJson.response = { message: 'Request should contain a login and a password' };
			return res.status(responseJson.responseCode).send(responseJson);
		}

		const login = req.body.login;
		const password = req.body.password;
		// Here will be checks for correctness of login and password

		DataBase.getUserId(login, password, (err, id) => {
			if (err) {
				throw err;
			}
			if (id === DataBase.userNotExists) {
				responseJson.responseCode = 403;
				responseJson.response = { message: 'The user does not exist' };
			} else if (id === DataBase.wrongPassword) {
				responseJson.responseCode = 403;
				responseJson.response = { message: 'The password is wrong' };
			} else {
				const payload = { user_id: id };
				const token = Token.create(payload);
				responseJson.responseCode = 200;
				responseJson.response = { token: token };
			}
			res.status(responseJson.responseCode).send(responseJson);
		});
	} catch (error) {
		responseJson.responseCode = 500;
		responseJson.response = { message: 'Something went wrong' };
		res.status(responseJson.responseCode).send(responseJson);
		// Here will be logging
	}
});

app.put('/', () => {
});

app.delete('/', () => {
});

app.listen(Config.port, () => {
});
