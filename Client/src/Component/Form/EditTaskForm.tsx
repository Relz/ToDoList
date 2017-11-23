import * as React from 'react';
import { IEditTaskFormProps } from '../Props/Form/IEditTaskFormProps';
import { TaskDto } from '../../DTO/TaskDto';
import { IEditTaskFormState } from '../State/IEditTaskFormState';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { ButtonSize } from '../Button/ButtonSize';
import { ButtonType } from '../Button/ButtonType';
import { Button } from '../Button/Button';

export class EditTaskForm extends React.Component<IEditTaskFormProps, IEditTaskFormState> {
	private _model: TaskDto = new TaskDto();

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

	public get task(): TaskDto {
		return this._model;
	}

	public set task(value: TaskDto) {
		this._model = value;
		this.forceUpdate();
	}
}
