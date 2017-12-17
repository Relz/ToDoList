/*tslint:disable:typedef*/
export class Constant {
	public static Path = class {
		public static readonly index: string = '/';
		public static readonly signIn: string = '/sign_in';
		public static readonly register: string = '/register';
		public static readonly account: string = '/account';
		public static readonly tasks: string = '/tasks';
		public static readonly editTask: string = '/edit_task';
		public static readonly demo: string = '/demo';
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
			public static GetDoneTasks = class {
				public static readonly path: string = '/tasks/done/';
				public static readonly method: string = 'GET';
			};
			public static GetNotDoneTasks = class {
				public static readonly path: string = '/tasks/not_done/';
				public static readonly method: string = 'GET';
			};
			public static CreateTask = class {
				public static readonly path: string = '/tasks/create/';
				public static readonly method: string = 'POST';
			};
			public static EditTask = class {
				public static readonly path: string = '/tasks/edit/';
				public static readonly method: string = 'PUT';
			};
			public static SetTaskImportant = class {
				public static readonly path: string = '/tasks/set_important/';
				public static readonly method: string = 'PUT';
			};
			public static SetTaskDone = class {
				public static readonly path: string = '/tasks/set_done/';
				public static readonly method: string = 'PUT';
			};
			public static DeleteTask = class {
				public static readonly path: string = '/tasks/delete/';
				public static readonly method: string = 'DELETE';
			};
		};
	};
	public static Client = class {
		public static readonly defaultUserName = 'Username';
	};
}
