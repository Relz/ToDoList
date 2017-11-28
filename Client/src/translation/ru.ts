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
		public static readonly emailPlaceholder: string = 'Логин';
		public static readonly passwordPlaceholder: string = 'Пароль';
	};
	public static RegisterForm = class {
		public static readonly title: string = 'Регистрация';
		public static readonly button: string = 'Зарегистрироваться';
		public static readonly emailPlaceholder: string = 'Логин';
		public static readonly namePlaceholder: string = 'Имя';
		public static readonly passwordPlaceholder: string = 'Пароль';
		public static readonly passwordRepeatPlaceholder: string = 'Повторите пароль';
	};
	public static AccountForm = class {
		public static readonly title: string = 'Настройки аккаунта';
		public static readonly button: string = 'Сохранить';
		public static readonly emailPlaceholder: string = 'Логин';
		public static readonly namePlaceholder: string = 'Имя';
		public static readonly oldPasswordPlaceholder: string = 'Старый пароль';
		public static readonly newPasswordPlaceholder: string = 'Новый пароль';
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
				public static readonly badBody: string = 'Чего-то в отправленной информации не нашлось...';
				public static readonly userAlreadyExists: string = 'Данный логин уже зарегистрирован в системе';
				public static readonly success: string = 'Вы успешно зарегистрированы в системе!';
				public static readonly badConnection: string = 'Не удаётся установить соединение с сервером';
			};
		};
		public static Account = class {
			public static FormMessage = class {
				public static readonly internalServerError: string = 'Извините! Произошла внутренняя ошибка сервера';
				public static readonly badBody: string = 'Чего-то в отправленной информации не нашлось...';
				public static readonly loginInUse: string = 'Данный логин уже занят';
				public static readonly success: string = 'Изменения сохранены!';
				public static readonly badConnection: string = 'Не удаётся установить соединение с сервером';
				public static readonly noUserInfo: string = 'Не удалось получить информацию о вашей учётной записи';
			};
		};
		public static SignIn = class {
			public static FormMessage = class {
				public static readonly invalidLogin: string = 'Чувак, такого логина не существует!';
				public static readonly invalidPassword: string = 'Чувак, ты вводишь не правильный пароль!';
			};
		};
		public static Shared = class {
			public static readonly internalServerError: string = 'Извините! Произошла внутренняя ошибка сервера';
			public static readonly badConnection: string = 'Не удаётся установить соединение с сервером';
		};
	};
}
