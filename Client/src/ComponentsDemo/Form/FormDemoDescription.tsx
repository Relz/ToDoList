import * as React from 'react';

export class FormDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				Разработчику доступно 3 вида форм:
				<ul>
					<li><strong>SignInForm</strong></li>
					<li><strong>RegisterForm</strong></li>
					<li><strong>EditTaskForm</strong>
						- можно использовать как для редактирования, так и для создания задачи
					</li>
				</ul>
				<p>
					Все вышеперечисленные формы наследуются от класса
					<strong>Form</strong>, который реализует интерфейс <strong>IFormProps</strong>.
				</p>
				<p>
					Наследникам класса <strong>Form</strong> неопходимо имплементировать методы:
					<ul>
						<li><strong>getInner()</strong> - возвращает массив JSX.Element который вставляется в форму перед кнопкой</li>
						<li><strong>onSubmit()</strong> - срабатывает при отправке формыы</li>
					</ul>
				</p>
			</div>
		);
	}
}
