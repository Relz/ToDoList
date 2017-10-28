import * as React from 'react';

export class ButtonDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<span>
				При использовании компонента от разработчика потребуется указать эти классы с помощью перечислимых типов:<br/>
				ButtonType:<br/>
				&emsp;&emsp;- Basic<br/>
				&emsp;&emsp;- Default<br/>
				&emsp;&emsp;- Primary<br/>
				&emsp;&emsp;- Success<br/>
				&emsp;&emsp;- Info<br/>
				&emsp;&emsp;- Warning<br/>
				&emsp;&emsp;- Danger<br/>
				&emsp;&emsp;- Link<br/>
				ButtonSize:<br/>
				&emsp;&emsp;- ExtraSmall<br/>
				&emsp;&emsp;- Small<br/>
				&emsp;&emsp;- Medium<br/>
				&emsp;&emsp;- Large<br/>
				Также можно указать параметр disabled = {'true'}, если хотите применить стиль неактивной кнопки.<br/>
				<br/>
				Пример:<br/>
				&lt;Button<br/>
				&emsp;type={'ButtonType.Basic'}<br/>
				&emsp;size={'ButtonSize.ExtraSmall'}<br/>
				><br/>
				&emsp;Пример кнопки<br/>
				&lt;/Button&gt;
				<br/>
				<br/>
				&lt;Button<br/>
				&emsp;type={'ButtonType.Basic'}<br/>
				&emsp;size={'ButtonSize.ExtraSmall'}<br/>
				&emsp;disabled={'true'}<br/>
				><br/>
				&emsp;Пример неактивной кнопки<br/>
				&lt;/Button&gt;
			</span>
		);
	}
}
