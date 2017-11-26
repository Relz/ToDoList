import * as React from 'react';

export class ButtonDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется тип и размер с помощью перечислимых типов:<br/>
				ButtonType:
				<ul>
					<li>Basic</li>
					<li>Default</li>
					<li>Primary</li>
					<li>Success</li>
					<li>Info</li>
					<li>Warning</li>
					<li>Danger</li>
					<li>Link</li>
				</ul>
				ButtonSize:
				<ul>
					<li>ExtraSmall</li>
					<li>Small</li>
					<li>Medium</li>
					<li>Large</li>
				</ul>
				Также можно указать параметр disabled = {'true'}, если хотите применить стиль неактивной кнопки.<br/>
				<br/>
				Пример:<br/>
				&lt;Button<br/>
				&emsp;type={'{ButtonType.Basic}'}<br/>
				&emsp;size={'{ButtonSize.ExtraSmall}'}<br/>
				><br/>
				&emsp;Пример кнопки<br/>
				&lt;/Button&gt;
				<br/>
				<br/>
				&lt;Button<br/>
				&emsp;type={'{ButtonType.Basic}'}<br/>
				&emsp;size={'{ButtonSize.ExtraSmall}'}<br/>
				&emsp;disabled={'{true}'}<br/>
				><br/>
				&emsp;Пример неактивной кнопки<br/>
				&lt;/Button&gt;
			</span>
		);
	}
}
