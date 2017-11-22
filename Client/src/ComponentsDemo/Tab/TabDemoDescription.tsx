import * as React from 'react';

export class TabDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать массив TabItem'ов.<br/>
				TabItem имеет два свойства:
				<ul>
					<li>label</li>
					<li>loadContent</li>
				</ul>
				<b>label</b> - это текст в кнопке, при нажатии на которую выполнится <b>функция загрузки контента</b>.
				Функция выполнится по мере надобности и только единожды.
				<br/>
				<br/>
				Пример:<br/>
				&lt;Tab tabItems={'{'}[<br/>
				&emsp;new TabItem('demoTab1', 'Tab1', () => TabDemo.createContent('First tab')),<br/>
				&emsp;new TabItem('demoTab2', 'Tab2', () => TabDemo.createContent('Second tab')),<br/>
				&emsp;new TabItem('demoTab3', 'Tab3', () => TabDemo.createContent('Third tab')),<br/>
				&emsp;new TabItem('demoTab4', 'Tab4', () => TabDemo.createContent('Fours tab')),<br/>
				]{'}'}/><br/>
			</span>
		);
	}
}
