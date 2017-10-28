import * as React from 'react';
import { ButtonDemo } from './Button/ButtonDemo';
import '../sass/app.sass';
import '../sass/components_demo.sass';
import { ButtonDemoDescription } from './Button/ButtonDemoDescription';

export class ComponentsDemoPage extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<table className='components_demo'>
				<thead>
					<tr>
						<td className='demo_column'>Демнострация</td>
						<td className='description_column'>Описание</td>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td><ButtonDemo/></td>
						<td><ButtonDemoDescription/></td>
					</tr>
				</tbody>
			</table>
		);
	}
}
