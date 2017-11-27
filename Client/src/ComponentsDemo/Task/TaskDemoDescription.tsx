import * as React from 'react';

export class TaskDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать:<br/>
				TabItem имеет три свойства:
				<ul>
					<li>id</li>
					<li>userId</li>
					<li>title</li>
					<li>description</li>
					<li>isImportant</li>
					<li>isDone</li>
				</ul>
				<b>id</b> - идентификатор задачи, скорее всего будет браться от сервера.<br/>
				<br/>
				<b>userId</b> - идентифиатор пользователя, скорее всего будет браться из куков,
				в которые попадёт после аутентификации<br/>
				<br/>
				<b>title</b> - заголовок задачи<br/>
				<br/>
				<b>description</b> - описание задачи<br/>
				<br/>
				<b>isImportant</b> - важна ли задача<br/>
				<br/>
				<b>isDone</b> - выполнена ли задача<br/>
				<br/>
				Пример:<br/>
				&lt;Task<br/>
				&emsp;id={1}<br/>
				&emsp;userId={1}<br/>
				&emsp;title={'{\'Не важная\'}'}<br/>
				&emsp;description={'{\'Не завершённая\'}'}<br/>
				&emsp;isImportant={'{\'false\'}'}<br/>
				&emsp;isDone={'{\'false\'}'}<br/>
				/><br/>
			</span>
		);
	}
}
