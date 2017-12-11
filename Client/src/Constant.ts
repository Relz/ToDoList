/*tslint:disable:typedef*/
export class Constant {
	public static Path = class {
		public static readonly signIn: string = '/sign_in';
		public static readonly register: string = '/register';
		public static readonly account: string = '/account';
		public static readonly tasks: string = '/tasks';
	};
	public static Server = class {
		public static readonly headers: Headers = new Headers({ 'Content-Type': 'application/json' });
		public static readonly url: string = 'http://127.0.0.1:1507';
		public static Action = class {
			public static Register = class {
				public static readonly path: string = '/users/register';
				public static readonly method: string = 'POST';
			};
			public static SignIn = class {
				public static readonly path: string = '/users/authenticate';
				public static readonly method: string = 'POST';
			};
			public static GetUserInfo = class {
				public static readonly path: string = '/users/';
				public static readonly method: string = 'GET';
			};
			public static EditUser = class {
				public static readonly path: string = '/users/edit/';
				public static readonly method: string = 'PUT';
			};
		};
	};
	public static readonly tokenKey: string = 'token';
	public static get token(): string | undefined {
		const token: string | null = localStorage.getItem(Constant.tokenKey);

		return token === null ? undefined : token;
	}
}
