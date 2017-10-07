import * as cors from 'cors';
import * as express from 'express';
import { CONFIG } from './config';
import { token } from './token';

const app: express.Express = express();

app.use(cors());

app.get('/', () => {
	console.log('Hello from GET');
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

app.listen(CONFIG.PORT, () => {
	console.log(`Express server listening on port ${CONFIG.PORT}`);
});