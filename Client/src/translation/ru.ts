/*tslint:disable:typedef*/
export class Translation {
	public static pageHeader: string = 'To Do List';
	public static Alt = class {
		public static logo: string = 'To Do List';
		public static loadingSpinner: string = 'Загрузка...';
	};
	public static Menu = class {
		public static readonly login: string = 'Войти';
		public static readonly register: string = 'Зарегистрироваться';
	};
	public static Page404 = class {
		public static readonly errorCode: string = '404';
		public static readonly header: string = 'Страница не найдена';
		public static readonly backToMainPage: string = 'Вернуться на главную страницу';
	};
}
