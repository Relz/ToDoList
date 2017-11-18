import * as React from 'react';

export class TabDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать массив TabItem'ов.<br/>
				TabItem имеет два свойства:
				<ul>
					<li>label</li>
					<li>content</li>
				</ul>
				<b>label</b> - это текст в кнопке, при нажатии на которую отобразится <b>content</b>
				<br/>
				<br/>
				Пример:<br/>
				&lt;Tab tabItems={'{'}[<br/>
				&emsp;new TabItem('Tab1', TabDemo.createContent('First tab')),<br/>
				&emsp;new TabItem('Tab2', TabDemo.createContent('Second tab')),<br/>
				&emsp;new TabItem('Tab3', TabDemo.createContent('Third tab')),<br/>
				&emsp;new TabItem('Tab4', TabDemo.createContent('Fours tab')),<br/>
				]{'}'}/><br/>
			</span>
		);
	}
}
