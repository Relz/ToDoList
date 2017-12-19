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
import * as queryString from 'query-string';
import moment = require('moment');

export class EditTask extends React.Component {
	private _editTaskForm: EditTaskForm;
	private _data: EditTaskDto = new EditTaskDto();

	public constructor(props: any) {
		super(props);
		const queryData: any = queryString.parse(props.location.search);
		this._data.id = queryData.id;
		this._data.title = queryData.title;
		this._data.description = queryData.description;
		this._data.isDeadlineExist = queryData.deadline !== 'null';
		this._data.isDone = queryData.isDone;
		this._data.isImportant = queryData.isImportant;
		this._data.deadline = moment.unix(queryData.deadline);
	}

	public render(): JSX.Element {
		if (Memory.token === undefined) {
			return <Redirect to={Constant.Path.signIn}/>;
		}
		return (
			<EditTaskForm
				title={Translation.EditTaskForm.editTitle}
				buttonTitle={Translation.EditTaskForm.editButton}
				task={this._data}
				ref={(ref: EditTaskForm) => this._editTaskForm = ref}
				onSubmit={(model: EditTaskDto) => this.onSubmit(model)}
			/>
		);
	}

	private onSubmit(model: EditTaskDto): void {
		const data: any = {
			title: model.title,
			description: model.description,
			isDeadlineExist: model.isDeadlineExist,
			deadline: model.deadline.valueOf() / 1000,
			isDone: model.isDone,
			isImportant: model.isImportant
		};
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.EditTask.path}${this._data.id}/${Memory.token}`,
			{
				method: Constant.Server.Action.EditTask.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(data)
			}
		).then((response: any) => response.json()
		).then((response: JsonResponse) => {
			if (response === undefined) {
				this._editTaskForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.internalServerError);
				return;
			}
			switch (response.code) {
				case ResponseCode.BAD_BODY:
					this._editTaskForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badBody);
					break;
				case ResponseCode.WRONG_ID:
					this._editTaskForm.showAlert(AlertType.Danger, Translation.Page.EditTask.FormMessage.wrongId);
					break;
				case ResponseCode.OK:
					this._editTaskForm.showAlert(AlertType.Success, Translation.Page.EditTask.FormMessage.success);
					location.href = Constant.Path.tasks;
					break;
			}
		}, () => {
			this._editTaskForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badConnection);
		});
	}
}
