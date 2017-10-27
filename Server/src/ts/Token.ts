import * as jsonWebToken from 'jsonwebtoken';
import { Config } from './Config';

export class Token {
	static createFromId(id: number): string {
		return jsonWebToken.sign({ id: id }, Config.secret, { expiresIn: Config.tokenLifeTime });
	}

	static verify(token: string): any {
		return jsonWebToken.verify(token, Config.secret);
	}
}
