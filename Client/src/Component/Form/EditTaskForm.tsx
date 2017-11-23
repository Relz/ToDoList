import * as React from 'react';
import { IEditTaskFormProps } from '../Props/Form/IEditTaskFormProps';
import { TaskDto } from '../../DTO/TaskDto';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { ButtonSize } from '../Button/ButtonSize';
import { ButtonType } from '../Button/ButtonType';
import { Button } from '../Button/Button';

export class EditTaskForm extends React.Component<IEditTaskFormProps, {}> {
	private _model: TaskDto;

	public constructor(props: IEditTaskFormProps) {
		super(props);
		this._model = props.task === undefined ? new TaskDto() : props.task;
	}

	public render(): JSX.Element {
		return (
			<form
				className='form_block'
				onSubmit={(event: any): void => {
					event.preventDefault();
					this.props.onSubmit(this._model);
				}}
			>
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
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Large}
				>
					Edit
				</Button>
			</form>
		);
	}
}
