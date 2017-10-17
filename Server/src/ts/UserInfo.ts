export class UserInfo {
	private _login: string;
	private _name: string;

	constructor()
	constructor(login: string, name: string)
	constructor(login?: string, name?: string) {
		this._login = login;
		this._name = name;
	}

	public get login(): string {
		return this._login;
	}

	public set login(value: string) {
		this._login = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
}
