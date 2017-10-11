import * as cors from 'cors';
import * as express from 'express';
import { Config } from './Config';
import { DataBase } from './DataBase';

const app: express.Express = express();

app.use(cors());
DataBase.init();

app.get('/', () => {
});

app.get('/users', () => {
});

app.post('/', () => {
});

app.put('/', () => {
});

app.delete('/', () => {
});

app.listen(Config.port, () => {
});
