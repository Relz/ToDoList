import * as React from 'react';

export class TabDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать массив TabItem'ов.<br/>
				TabItem имеет три свойства:
				<ul>
					<li>id</li>
					<li>label</li>
					<li>loadContent</li>
				</ul>
				<b>id</b> - уникальное строковое значение в <b>рамках этого массива</b>.
				Не путайте с html аттрибутом <b>id</b>, которое должно быть уникальным в рамках всей страницы.<br/>
				<br/>
				<b>label</b> - это текст в кнопке, при нажатии на которую выполнится
				функция загрузки контента <b>loadContent</b>.
				Функция выполнится по мере надобности и только единожды.
				<br/>
				<br/>
				Пример:<br/>
				&lt;Tab tabItems={'{'}[<br/>
				&emsp;new TabItem(<br/>
				&emsp;&emsp;'demoTab1',<br/>
				&emsp;&emsp;'Tab1',<br/>
				&emsp;&emsp;(onLoadComplete: (content: JSX.Element) => void) =><br/>
				&emsp;&emsp;&emsp;TabDemo.createContent('First tab', onLoadComplete)<br/>
				&emsp;),<br/>
				&emsp;new TabItem(<br/>
				&emsp;&emsp;'demoTab2',<br/>
				&emsp;&emsp;'Tab2',<br/>
				&emsp;&emsp;(onLoadComplete: (content: JSX.Element) => void) =><br/>
				&emsp;&emsp;&emsp;TabDemo.createContent('Second tab', onLoadComplete)<br/>
				&emsp;),<br/>
				&emsp;new TabItem(<br/>
				&emsp;&emsp;'demoTab3',<br/>
				&emsp;&emsp;'Tab3',<br/>
				&emsp;&emsp;(onLoadComplete: (content: JSX.Element) => void) =><br/>
				&emsp;&emsp;&emsp;TabDemo.createContent('Third tab', onLoadComplete)<br/>
				&emsp;),<br/>
				&emsp;new TabItem(<br/>
				&emsp;&emsp;'demoTab4',<br/>
				&emsp;&emsp;'Tab4',<br/>
				&emsp;&emsp;(onLoadComplete: (content: JSX.Element) => void) =><br/>
				&emsp;&emsp;&emsp;TabDemo.createContent('Fours tab', onLoadComplete)<br/>
				&emsp;)<br/>
				]{'}'}/><br/>
			</span>
		);
	}
}
