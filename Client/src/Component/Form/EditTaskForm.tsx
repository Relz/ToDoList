import * as React from 'react';
import * as moment from 'moment';
import { Moment } from 'moment';
import { IEditTaskFormProps } from '../Props/Form/IEditTaskFormProps';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { Form } from './Form';
import { Translation } from '../../translation/ru';
import { IEditTaskFormState } from '../State/Form/IEditTaskFormState';
import { EditTaskDto } from '../../Dto/EditTaskDto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export class EditTaskForm extends Form<IEditTaskFormProps, IEditTaskFormState> {
	public constructor(props: IEditTaskFormProps) {
		super(props);
		const editTaskDto: EditTaskDto = props.task ? props.task : new EditTaskDto();
		if (editTaskDto.deadline === undefined) {
			editTaskDto.deadline = moment();
		}

		this.state = {
			title: editTaskDto.title,
			description: editTaskDto.description,
			isDeadlineExist: editTaskDto.isDeadlineExist == true,
			deadline: editTaskDto.deadline,
			isDone: editTaskDto.isDone == true,
			isImportant: editTaskDto.isImportant == true
		};
	}

	protected getInner(): JSX.Element[] {
		return ([
			<Input
				key='title'
				type={InputType.Text}
				value={this.state.title}
				placeholder={Translation.TaskForm.namePlaceholder}
				onChange={(value: string) => this.setState({ title: value }) }
			/>,
			<Input
				key='description'
				type={InputType.Text}
				value={this.state.description}
				placeholder={Translation.TaskForm.descriptionPlaceholder}
				onChange={(value: string) => this.setState({ description: value })}
			/>,
			<label key='deadline_checkbox'>
				<input
					type='checkbox'
					checked={this.state.isDeadlineExist}
					onChange={(event: any) => this.setState({ isDeadlineExist: event.target.checked })}
				/>
				{Translation.TaskForm.deadlineCheckBoxTitle}
			</label>,
			<DatePicker
				key='deadline'
				selected={this.state.deadline}
				dateFormat='DD MMMM YYYY'
				onChange={(value: Moment) => this.setState({ deadline: value })}
			/>,
			<label key='done_checkbox'>
				<input
					type='checkbox'
					checked={this.state.isDone}
					onChange={(event: any) => this.setState({ isDone: event.target.checked })}
				/>
				{Translation.TaskForm.doneCheckBoxTitle}
			</label>,
			<label key='important_checkbox'>
				<input
					type='checkbox'
					checked={this.state.isImportant}
					onChange={(event: any) => this.setState({ isImportant: event.target.checked })}
				/>
				{Translation.TaskForm.importantCheckBoxTitle}
			</label>
		]);
	}

	protected onSubmit(event: any): void {
		const model: EditTaskDto = new EditTaskDto();
		model.title = this.state.title;
		model.description = this.state.description;
		model.isDeadlineExist = this.state.isDeadlineExist;
		model.deadline = this.state.deadline;
		model.isDone = this.state.isDone;
		model.isImportant = this.state.isImportant;
		this.props.onSubmit(model);
	}

	public set model(value: EditTaskDto) {
		this.setState({
			title: value.title,
			description: value.description,
			isDeadlineExist: value.isDeadlineExist == true,
			deadline: value.deadline,
			isDone: value.isDone == true,
			isImportant: value.isImportant == true
		});
	}
}
