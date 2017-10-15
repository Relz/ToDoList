import * as jwt from 'jsonwebtoken';
import { Config } from './config';

export class Token {
	static create(tokenData: any): any {
		return jwt.sign(tokenData, Config.secret, { expiresIn: Config.tokenLifeTime });
	}
}
