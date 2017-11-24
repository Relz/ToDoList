import * as React from 'react';
import { IEditTaskFormProps } from '../Props/Form/IEditTaskFormProps';
import { TaskDto } from '../../DTO/TaskDto';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { Form } from './Form';
import ChangeEvent = require('react');
import ChangeEventHandler = require('react');

export class EditTaskForm extends Form<IEditTaskFormProps, {}> {
	private readonly DEADLINE_CHECKBOX_TITLE: string = 'Is deadline exist';

	private _model: TaskDto;
	private _calendar: Input;

	public constructor(props: IEditTaskFormProps) {
		super(props);
		this._model = props.task === undefined ? new TaskDto() : props.task;
	}

	protected getInner(): JSX.Element[] {
		return ([
			<Input
				key='edit_task_title'
				type={InputType.Text}
				value={this._model.title}
				onChange={(value: string) => this._model.title = value}
			/>,
			<Input
				key='edit_task_description'
				type={InputType.Text}
				value={this._model.description}
				onChange={(value: string) => this._model.description = value}
			/>,
			<label key='edit_task_deadline_checkbox'>
				<input
					type='checkbox'
					onChange={(event: any) => this.updateCalendar(event)}
				/>
				{this.DEADLINE_CHECKBOX_TITLE}
			</label>,
			<Input
				key='edit_task_deadline'
				type={InputType.DateTimeLocal}
				value={''}
				onChange={(value: string) => this._model.deadLine = value}
				ref={(ref: Input) => {
					this._calendar = ref;
					this._calendar.disabled = true;
				}}
			/>
		]);
	}

	protected onSubmit(event: any): void {
		this.props.onSubmit(this._model);
	}

	private updateCalendar(event: any): void {
		const isDeadlineExist = event.target.checked;
		this._calendar.disabled = !isDeadlineExist;
		this._model.isDeadlineExist = isDeadlineExist;
		console.log('update')
	}
}
