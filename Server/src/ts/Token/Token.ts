import * as jsonWebToken from 'jsonwebtoken';
import { Config } from '../Config';
import { TokenPayload } from './TokenPayload';

export class Token {
	static createFromId(id: number): string {
		return jsonWebToken.sign(new TokenPayload(id).toObject(), Config.secret, { expiresIn: Config.tokenLifeTime });
	}

	static decodeId(token: string): number {
		try {
			return (jsonWebToken.verify(token, Config.secret) as TokenPayload).id;
		} catch (err) {
			return undefined;
		}
	}
}
