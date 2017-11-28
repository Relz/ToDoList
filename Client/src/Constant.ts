/*tslint:disable:typedef*/
export class Constant {
	public static Path = class {
		public static readonly login: string = '/signin';
		public static readonly register: string = '/register';
	};
	public static Server = class {
		public static readonly headers: Headers = new Headers({ 'Content-Type': 'application/json' });
		public static readonly url: string = 'http://127.0.0.1:1507';
		public static Action = class {
			public static Register = class {
				public static readonly path: string = '/users/registration';
				public static readonly method: string = 'POST';
			};
			public static SignIn = class {
				public static readonly path: string = '/users/authenticate';
				public static readonly method: string = 'POST';
			};
		};
	};
	public static readonly tokenKey: string = 'token';
	public static get token(): string | undefined {
		const token : string | null = localStorage.getItem(Constant.tokenKey);

		return token == null ? undefined : token;
	}
}
