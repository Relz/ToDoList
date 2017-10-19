import * as jsonWebToken from 'jsonwebtoken';
import { Config } from './Config';

export class Token {
	static create(tokenData: any): string {
		return jsonWebToken.sign(tokenData, Config.secret, { expiresIn: Config.tokenLifeTime });
	}

	static verify(token: string): any {
		return jsonWebToken.verify(token, Config.secret);
	}
}
