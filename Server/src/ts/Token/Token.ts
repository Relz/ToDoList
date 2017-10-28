import * as jsonWebToken from 'jsonwebtoken';
import { Config } from '../Config';
import { TokenPayload } from './TokenPayload';
import { ITokenPayload } from './ITokenPayload';

export class Token {
	static createFromId(id: number): string {
		return jsonWebToken.sign(new TokenPayload(id).toObject(), Config.secret, { expiresIn: Config.tokenLifeTime });
	}

	static decodeId(token: string): number {
		return (jsonWebToken.verify(token, Config.secret) as ITokenPayload).id;
	}
}
