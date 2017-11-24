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
	public static EditTaskForm = class {
		public static readonly editTitle: string = 'Редактирование задачи';
		public static readonly createTitle: string = 'Создание задачи';
		public static readonly checkBoxTitle: string = 'Дедлайн';
		public static readonly namePlaceholder: string = 'Название';
		public static readonly descriptionPlaceholder: string = 'Описание';
		public static readonly editButton: string = 'Сохранить';
		public static readonly createButton: string = 'Создать';
	};
	public static SignInForm = class {
		public static readonly title: string = 'Авторизация';
		public static readonly button: string = 'Вход';
		public static readonly emailPlaceholder = 'Эл. почта';
		public static readonly passwordPlaceholder = 'Пароль';
	};
	public static RegisterForm = class {
		public static readonly title: string = 'Регистрация';
		public static readonly button: string = 'Зарегестрироваться';
		public static readonly emailPlaceholder: string = 'Эл.почта';
		public static readonly namePlaceholder: string = 'Имя';
		public static readonly passwordPlaceholder: string = 'Пароль';
		public static readonly passwordRepeatPlaceholder: string = 'Повторите пароль';
	};
	public static Task = class {
		public static setDoneButtonText: string = 'Сделана';
		public static setNotDoneButtonText: string = 'Не сделана';
		public static setImportantButtonText: string = 'Пометить как важная';
		public static setNotImportantButtonText: string = 'Пометить как не важная';
		public static editButtonText: string = 'Редактировать';
	};
}
