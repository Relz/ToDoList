import { Constant } from './Constant';
export class Memory {
	public static get token(): string | undefined {
		const token: string | null = localStorage.getItem(Memory.tokenKey);

		return token === null ? undefined : token;
	}

	public static set token(value: string | undefined) {
		if (value !== undefined) {
			localStorage.setItem(Memory.tokenKey, value);
		}
	}

	public static get userName(): string | undefined {
		const name: string | null = localStorage.getItem(Memory.userNameKey);

		return name === null ? Constant.Client.defaultUserName : name;
	}

	public static set userName(value: string | undefined) {
		if (value !== undefined) {
			localStorage.setItem(Memory.userNameKey, value);
		}
	}

	public static cleanup(): void {
		// localStorage.clear();
		localStorage.removeItem(Memory.tokenKey);
		localStorage.removeItem(Memory.userNameKey);
	}

	private static readonly tokenKey: string = 'token';
	private static readonly userNameKey: string = 'user_name';
}
