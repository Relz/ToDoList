export class UserInfo {
	public login: string;
	public name: string;

	constructor()
	constructor(login: string, name: string)
	constructor(login?: string, name?: string) {
		this.login = login;
		this.name = name;
	}
}
