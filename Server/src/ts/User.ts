export class User {
	private _id: number;
	private _login: string;
	private _password: string;
	private _name: string;
	private _salt: string;

	constructor(id?: number, login?: string, password?: string, name?: string, salt?: string) {
		this._id = id;
		this._login = login;
		this._password = password;
		this._name = name;
		this._salt = salt;
	}

	public get id(): number {
		return this._id;
	}
	public set id(value: number) {
		this._id = value;
	}

	public get login(): string {
		return this._login;
	}
	public set login(value: string) {
		this._login = value;
	}

	public get password(): string {
		return this._password;
	}
	public set password(value: string) {
		this._password = value;
	}

	public get name(): string {
		return this._name;
	}
	public set name(value: string) {
		this._name = value;
	}

	public get salt(): string {
		return this._salt;
	}

	public set salt(value: string) {
		this._salt = value;
	}

	public json(): object {
		return {
			id: this._id,
			login: this._login,
			password: this._password,
			name: this._name,
			salt: this._salt
		};
	}

	public static createFromUser(user: User): User {
		return new User(user._id, user._login, user._password, user._name, user._salt);
	}
}
