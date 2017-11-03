import * as React from 'react';

export class InputDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать тип с помощью перечислимых типов:<br/>
				InputType:<br/>
				&emsp;&emsp;- Text<br/>
				&emsp;&emsp;- Password<br/>
				&emsp;&emsp;- DateTime<br/>
				&emsp;&emsp;- DateTImeLocal<br/>
				&emsp;&emsp;- Date<br/>
				&emsp;&emsp;- Month<br/>
				&emsp;&emsp;- Time<br/>
				&emsp;&emsp;- Week<br/>
				&emsp;&emsp;- Number<br/>
				&emsp;&emsp;- Email<br/>
				&emsp;&emsp;- Url<br/>
				&emsp;&emsp;- Search<br/>
				&emsp;&emsp;- TelephoneNumber<br/>
				&emsp;&emsp;- Color<br/>
				Также можно указать параметр disabled = {'true'}, если хотите применить стиль неактивного поля ввода.<br/>
				<br/>
				Пример:<br/>
				&lt;Input<br/>
				&emsp;type={'InputType.Text'}<br/>
				/><br/>
				<br/>
				<br/>
				&lt;Input<br/>
				&emsp;type={'InputType.Password'}<br/>
				&emsp;disabled={'true'}<br/>
				/><br/>
			</span>
		);
	}
}
