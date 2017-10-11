import * as cors from 'cors';
import * as express from 'express';
import { Config } from './Config';
import { DataBase } from './DataBase';

const app: express.Express = express();

app.use(cors());
DataBase.init();

app.get('/', () => {
	console.log('Hello from GET');
});

app.get('/users', () => {
	console.log(DataBase.getUsers());
});

app.post('/', () => {
	console.log('Hello from POST');
});

app.put('/', () => {
	console.log('Hello from PUT');
});

app.delete('/', () => {
	console.log('Hello from DELETE');
});

app.listen(Config.port, () => {
	console.log(`Express server listening on port ${Config.port}`);
});
