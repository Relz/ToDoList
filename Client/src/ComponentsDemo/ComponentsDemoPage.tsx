import * as React from 'react';
import { ButtonDemo } from './Button/ButtonDemo';
import { ButtonDemoDescription } from './Button/ButtonDemoDescription';
import { InputDemo } from './Input/InputDemo';
import { InputDemoDescription } from './Input/InputDemoDescription';
import { ContainerDemo } from './Container/ContainerDemo';
import { ContainerDemoDescription } from './Container/ContainerDemoDescription';
import { TabDemo } from './Tab/TabDemo';
import { TabDemoDescription } from './Tab/TabDemoDescription';
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
						<td className='cell_alignment_top'><TabDemo/></td>
						<td><TabDemoDescription/></td>
					</tr>
					<tr>
						<td><ContainerDemo/></td>
						<td><ContainerDemoDescription/></td>
					</tr>
					<tr>
						<td><InputDemo/></td>
						<td><InputDemoDescription/></td>
					</tr>
					<tr>
						<td><ButtonDemo/></td>
						<td><ButtonDemoDescription/></td>
					</tr>
				</tbody>
			</table>
		);
	}
}
