/*tslint:disable:typedef*/
export class Translation {
	public static readonly pageHeader: string = 'ToDoList';
	public static Alt = class {
		public static readonly logo: string = 'ToDoList';
		public static readonly loadingSpinner: string = 'Загрузка...';
	};
	public static Menu = class {
		public static readonly login: string = 'Войти';
		public static readonly register: string = 'Зарегистрироваться';
		public static readonly logout: string = 'Выйти';
		public static readonly tasks: string = 'Список дел';
		public static readonly account: string = 'Аккаунт';
	};
	public static Page404 = class {
		public static readonly errorCode: string = '404';
		public static readonly header: string = 'Страница не найдена';
		public static readonly backToMainPage: string = 'Вернуться на главную страницу';
	};
	public static TaskForm = class {
		public static readonly namePlaceholder: string = 'Название';
		public static readonly descriptionPlaceholder: string = 'Описание';
		public static readonly deadlineCheckBoxTitle: string = 'Дедлайн';
		public static readonly doneCheckBoxTitle: string = 'Сделано';
		public static readonly importantCheckBoxTitle: string = 'Важно';
	};
	public static CreateTaskForm = class {
		public static readonly createTitle: string = 'Создание задачи';
		public static readonly createButton: string = 'Создать';
	};
	public static EditTaskForm = class {
		public static readonly editTitle: string = 'Редактирование задачи';
		public static readonly editButton: string = 'Сохранить';
	};
	public static SignInForm = class {
		public static readonly title: string = 'Авторизация';
		public static readonly button: string = 'Войти';
		public static readonly emailPlaceholder: string = 'Логин';
		public static readonly passwordPlaceholder: string = 'Пароль';
	};
	public static RegisterForm = class {
		public static readonly title: string = 'Регистрация';
		public static readonly button: string = 'Создать аккаунт';
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
		public static readonly editButtonText: string = 'Редактировать';
		public static readonly deleteButtonText: string = 'Удалить';
	};
	public static Page = class {
		public static Register = class {
			public static FormMessage = class {
				public static readonly passwordsNotMatch: string = 'Пароли не совпадают';
				public static readonly userAlreadyExists: string = 'Данный логин уже зарегистрирован в системе';
				public static readonly success: string = 'Вы успешно зарегистрированы в системе!';
			};
		};
		public static Account = class {
			public static FormMessage = class {
				public static readonly loginInUse: string = 'Данный логин уже занят';
				public static readonly wrongPassword: string = 'Неверный пароль';
				public static readonly success: string = 'Изменения сохранены!';
				public static readonly noUserInfo: string = 'Не удалось получить информацию о вашей учётной записи';
			};
		};
		public static SignIn = class {
			public static FormMessage = class {
				public static readonly invalidLogin: string = 'Такого логина не существует!';
				public static readonly invalidPassword: string = 'Неверный пароль';
			};
		};
		public static Tasks = class {
			public static readonly openTasks: string = 'Сделать';
			public static readonly closeTasks: string = 'Сделанные';
			public static readonly emptyList: string = 'Список пуст';
			public static FormMessage = class {
				public static readonly success: string = 'Задача добавлена';
			};
		};
		public static Shared = class {
			public static FormMessage = class {
				public static readonly internalServerError: string = 'Извините! Произошла внутренняя ошибка сервера';
				public static readonly badConnection: string = 'Не удаётся установить соединение с сервером';
				public static readonly badBody: string = 'Чего-то в отправленной информации не нашлось...';
			};
		};
	};
}
