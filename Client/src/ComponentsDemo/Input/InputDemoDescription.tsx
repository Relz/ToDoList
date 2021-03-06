import * as React from 'react';

export class InputDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать тип с помощью перечислимых типов:<br/>
				InputType:
				<ul>
					<li>Text</li>
					<li>Password</li>
					<li>DateTime <b>(поддерживается в Chrome/Opera и Edge для рабочего стола)</b></li>
					<li>DateTImeLocal <b>(поддерживается в Chrome/Opera и Edge для рабочего стола)</b></li>
					<li>Date</li>
					<li>Month <b>(поддерживается в Chrome/Opera и Edge для рабочего стола)</b></li>
					<li>Time</li>
					<li>Week <b>(поддерживается в Chrome/Opera и Edge для рабочего стола)</b></li>
					<li>Number</li>
					<li>Email</li>
					<li>Url</li>
					<li>Search</li>
					<li>TelephoneNumber</li>
					<li>Color</li>
				</ul>
				Можно указать свойство disabled = {'true'}, если хотите применить стиль неактивного поля ввода.<br/><br/>
				Также можно указать функцию в свойство onChange,
				которая будет выполняться при каждом изменении <b>value</b> в поле ввода.<br/>
				<br/>
				Пример:<br/>
				&lt;Input<br/>
				&emsp;type={'{InputType.Text}'}<br/>
				/><br/>
				<br/>
				&lt;Input<br/>
				&emsp;type={'{InputType.Password}'}<br/>
				&emsp;disabled={'{true}'}<br/>
				/><br/>
				<br/>
				&lt;Input<br/>
				&emsp;type={'{InputType.Password}'}<br/>
				&emsp;disabled={'{true}'}<br/>
				&emsp;onChange={'{(value: string) => console.log(value)}'}<br/>
				/><br/>
			</span>
		);
	}
}
