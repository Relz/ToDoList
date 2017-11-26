import * as React from 'react';
import '../sass/components_demo.sass';
import { ButtonDemo } from './Button/ButtonDemo';
import { ButtonDemoDescription } from './Button/ButtonDemoDescription';
import { InputDemo } from './Input/InputDemo';
import { InputDemoDescription } from './Input/InputDemoDescription';
import { ContainerDemo } from './Container/ContainerDemo';
import { ContainerDemoDescription } from './Container/ContainerDemoDescription';
import { TabDemo } from './Tab/TabDemo';
import { TabDemoDescription } from './Tab/TabDemoDescription';
import { FormDemo } from './Form/FormDemo';
import { FormDemoDescription } from './Form/FormDemoDescription';
import { TaskDemo } from './Task/TaskDemo';
import { TaskDemoDescription } from './Task/TaskDemoDescription';
import { AlertDemo } from './Alert/AlertDemo';
import { AlertDemoDescription } from './Alert/AlertDemoDescription';

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
						<td><AlertDemo/></td>
						<td><AlertDemoDescription/></td>
					</tr>
					<tr>
						<td className={'demo_specified_task'}><TaskDemo/></td>
						<td><TaskDemoDescription/></td>
					</tr>
					<tr>
						<td className={'demo_specified_form'}><FormDemo/></td>
						<td><FormDemoDescription/></td>
					</tr>
					<tr>
						<td className='cell_alignment_top'><TabDemo/></td>
						<td><TabDemoDescription/></td>
					</tr>
					<tr>
						<td className={'demo_specified_container'}><ContainerDemo/></td>
						<td><ContainerDemoDescription/></td>
					</tr>
					<tr>
						<td><InputDemo/></td>
						<td><InputDemoDescription/></td>
					</tr>
					<tr>
						<td className={'demo_specified_button'}><ButtonDemo/></td>
						<td><ButtonDemoDescription/></td>
					</tr>
				</tbody>
			</table>
		);
	}
}
