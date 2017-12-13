import * as crypto from 'crypto';
import { Config } from './Config';

export class PasswordEncoder {
	public static encode(password: string): PasswordInfo {
		const salt: string = PasswordEncoder.getSalt();
		if (salt === undefined) {
			return undefined;
		}
		return PasswordEncoder.encrypt(password, salt);
	}

	public static isCorrect(password: string, valid: PasswordInfo): boolean {
		try {
			const key: string = PasswordEncoder.encrypt(password, valid.salt).hash;
			return key === valid.hash;
		} catch (err) {
			return undefined;
		}
	}

	private static encrypt(password: string, salt: string): PasswordInfo {
		try {
			const key: string =
				crypto.pbkdf2Sync(password, salt, Config.encryptIterations, Config.encryptKeyLength, 'sha512')
					.toString('hex');
			return new PasswordInfo(key, salt);
		} catch (err) {
			return undefined;
		}
	}

	private static getSalt(): string {
		try {
			return crypto.randomBytes(Math.ceil(Config.encryptSaltLength / 2))
				.toString('hex')
				.slice(0, Config.encryptSaltLength);
		} catch (err) {
			return undefined;
		}
	}
}

export class PasswordInfo {
	private _hash: string;
	private _salt: string;

	constructor(hash: string, salt: string) {
		this._hash = hash;
		this._salt = salt;
	}

	public get hash(): string {
		return this._hash;
	}

	public get salt(): string {
		return this._salt;
	}
}
