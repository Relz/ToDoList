export class User {
	private _id: number;
	private _login: string;
	private _password: string;
	private _name: string;

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
}
