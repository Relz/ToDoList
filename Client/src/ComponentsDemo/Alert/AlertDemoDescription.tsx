import * as React from 'react';

export class AlertDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется опционально указать
				тип, сообщение и видимость:<br/>
				AlertType:
				<ul>
					<li>Success</li>
					<li>Info</li>
					<li>Warning</li>
					<li>Danger</li>
				</ul>
				<br/>
				Пример:<br/>
				&lt;Alert<br/>
				&emsp;type={'{AlertType.Success}'}<br/>
				&emsp;message={'{\'Великолепно!\'}'}<br/>
				/&gt;<br/>
				<br/>
				&lt;Alert<br/>
				&emsp;type={'{AlertType.Danger}'}<br/>
				&emsp;message={'{\'Произошёл некий казус...\'}'}<br/>
				&emsp;visible={'{false}'}<br/>
				/&gt;<br/>
			</span>
		);
	}
}
