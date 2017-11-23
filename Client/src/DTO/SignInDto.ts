export class SignInDto {
	private _email: string = '';
	private _password: string = '';

	public get password(): string {
		return this._password;
	}

	public set password(value: string) {
		this._password = value;
	}

	public get email(): string {
		return this._email;
	}

	public set email(email: string) {
		this._email = email;
	}
}
