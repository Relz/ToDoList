/*tslint:disable:typedef*/
export class Translation {
	public static readonly pageHeader: string = 'To Do List';
	public static Alt = class {
		public static readonly logo: string = 'To Do List';
		public static readonly loadingSpinner: string = 'Загрузка...';
	};
	public static Menu = class {
		public static readonly login: string = 'Войти';
		public static readonly register: string = 'Зарегистрироваться';
		public static readonly logout: string = 'Выйти';
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
		public static readonly setDoneButtonText: string = 'Сделана';
		public static readonly setNotDoneButtonText: string = 'Не сделана';
		public static readonly setImportantButtonText: string = 'Пометить как важная';
		public static readonly setNotImportantButtonText: string = 'Пометить как не важная';
		public static readonly editButtonText: string = 'Редактировать';
	};
	public static Page = class {
		public static Register = class {
			public static FormMessage = class {
				public static readonly badBody = 'Чего-то в отправленной информации не нашлось...';
				public static readonly userAlreadyExists = 'Данный email уже зарегистрирован в системе';
				public static readonly success = 'Вы успешно зарегистрированы в системе!';
			};
		};
		public static SignIn = class {
			public static FormMessage = class {
				public static readonly invalidLogin = 'Чувак, такого логина не существует!';
				public static readonly invalidPassword = 'Чувак, ты вводишь не правильный пароль!';
			};
		};
	};
	public static Shared = class {
		public static readonly internalServerError = 'Извините! Произошла внутренняя ошибка сервера';
		public static readonly badConnection = 'Не удаётся установить соединение с сервером';
	};
}
