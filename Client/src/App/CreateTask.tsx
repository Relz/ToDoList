import * as React from 'react';
import { Constant } from '../Constant';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { AlertType } from '../Component/Alert/AlertType';
import { Translation } from '../translation/ru';
import { Redirect } from 'react-router';
import { ResponseCode } from './JsonResponse/ResponseCode';
import { Memory } from '../Memory';
import { EditTaskForm } from '../Component/Form/EditTaskForm';
import { EditTaskDto } from '../Dto/EditTaskDto';
import moment = require('moment');

export class CreateTask extends React.Component {
	private _createTaskForm: EditTaskForm;

	public render(): JSX.Element {
		if (Memory.token === undefined) {
			return <Redirect to={'/'}/>;
		}
		return (
			<EditTaskForm
				title={Translation.CreateTaskForm.createTitle}
				buttonTitle={Translation.CreateTaskForm.createButton}
				ref={(ref: EditTaskForm) => this._createTaskForm = ref}
				onSubmit={(model: EditTaskDto) => this.createTask(model)}
			/>
		);
	}

	private createTask(task: EditTaskDto): void {
		const data: any = {
			id: task.id,
			title: task.title,
			description: task.description,
			isDeadlineExist: task.isDeadlineExist,
			deadline: task.deadline.valueOf() / 1000
		};
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.CreateTask.path}${Memory.token}`,
			{
				method: Constant.Server.Action.CreateTask.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(data)
			}
		).then((response: any) => response.json()
		).then((response: JsonResponse) => {
			if (response === undefined) {
				this._createTaskForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.internalServerError);
				return;
			}
			switch (response.code) {
				case ResponseCode.BAD_BODY:
					this._createTaskForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badBody);
					break;
				case ResponseCode.OK:
					this._createTaskForm.showAlert(AlertType.Success, Translation.Page.CreateTask.FormMessage.success);
					location.href = Constant.Path.tasks;
					break;
			}
		});
	}
}
