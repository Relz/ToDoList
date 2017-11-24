import * as React from 'react';
import { IEditTaskFormProps } from '../Props/Form/IEditTaskFormProps';
import { TaskDto } from '../../DTO/TaskDto';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { Form } from './Form';
import { Container } from '../Container/Container';
import { DirectionType } from '../Container/DirectionType';

export class EditTaskForm extends Form<IEditTaskFormProps, {}> {
	private _model: TaskDto;

	public constructor(props: IEditTaskFormProps) {
		super(props);
		this._model = props.task === undefined ? new TaskDto() : props.task;
	}

	protected getInner(): JSX.Element {
		return (
			<Container directionType={DirectionType.Column}>
				<Input
					type={InputType.Text}
					value={this._model.title}
					onChange={(value: string) => this._model.title = value}
				/>
				<Input
					type={InputType.Text}
					value={this._model.description}
					onChange={(value: string) => this._model.description = value}
				/>
			</Container>
		);
	}

	protected onSubmit(event: any): void {
		this.props.onSubmit(this._model);
	}
}
