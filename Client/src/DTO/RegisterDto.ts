export class RegisterDto {
	private _email: string = '';
	private _password: string = '';
	private _repeatPassword: string = '';
	private _name: string = '';

	public get email(): string {
		return this._email;
	}

	public set email(value: string) {
		this._email = value;
	}

	public get password(): string {
		return this._password;
	}

	public set password(value: string) {
		this._password = value;
	}

	public get repeatPassword(): string {
		return this._repeatPassword;
	}

	public set repeatPassword(value: string) {
		this._repeatPassword = value;
	}

	public get name(): string {
		return this._name;
	}

	public set name(value: string) {
		this._name = value;
	}
}
