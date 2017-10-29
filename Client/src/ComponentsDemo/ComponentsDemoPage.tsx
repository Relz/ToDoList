import * as React from 'react';
import { ButtonDemo } from './Button/ButtonDemo';
import { ButtonDemoDescription } from './Button/ButtonDemoDescription';
import '../sass/components_demo.sass';

export class ComponentsDemoPage extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<table className='components_demo'>
				<thead>
					<tr>
						<td className='demo_column'>Демонстрация</td>
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
