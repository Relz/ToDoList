import * as React from 'react';
import { Redirect } from 'react-router';
import { Constant } from '../Constant';
import { Tab } from '../Component/Tab/Tab';
import { TabItem } from '../Component/Tab/TabItem';
import { Task } from '../Component/Task/Task';
import { Translation } from '../translation/ru';
import { Memory } from '../Memory';
import { Alert } from '../Component/Alert/Alert';
import { AlertType } from '../Component/Alert/AlertType';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { ResponseCode } from './JsonResponse/ResponseCode';
import { EditTaskForm } from '../Component/Form/EditTaskForm';
import { EditTaskDto } from '../Dto/EditTaskDto';
import { TaskDto } from '../Dto/TaskDto';
import { Moment } from 'moment';

export class Tasks extends React.Component {
	private _createTaskForm: EditTaskForm;
	private _openTasksInserter: (content: JSX.Element) => void;
	private _closeTasksInserter: (content: JSX.Element) => void;

	public render(): JSX.Element {
		if (Memory.token === undefined) {
			return <Redirect to={'/'}/>;
		}

		return (
			<div>
				<EditTaskForm
					title={Translation.CreateTaskForm.createTitle}
					buttonTitle={Translation.CreateTaskForm.createButton}
					ref={(ref: EditTaskForm) => this._createTaskForm = ref}
					onSubmit={(model: EditTaskDto) => this.createTask(model)}
				/>
				<br/>
				<Tab tabItems={[
					new TabItem(
						'open_tasks',
						Translation.Page.Tasks.openTasks,
						(inserter: (content: JSX.Element) => void) => {
							this.insertOpenTasks(inserter);
							this._openTasksInserter = inserter;
						}
					),
					new TabItem(
						'close_tasks',
						Translation.Page.Tasks.closeTasks,
						(inserter: (content: JSX.Element) => void) => {
							this.insertCloseTasks(inserter);
							this._closeTasksInserter = inserter;
						}
					)
				]}/>
			</div>
		);
	}

	private insertOpenTasks(insertIntoOpenTasksTab: (content: JSX.Element) => void): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.GetNotDoneTasks.path}${Memory.token}`,
			{
				method: Constant.Server.Action.GetNotDoneTasks.method,
				headers: Constant.Server.headers
			}
		).then((response: any) => response.json()
		).then((response: JsonResponse) => {
			if (response === undefined) {
				insertIntoOpenTasksTab(
					<Alert
						visible={true}
						message={Translation.Page.Shared.FormMessage.internalServerError}
						type={AlertType.Danger}
					/>
				);
			} else if (response.code !== ResponseCode.OK) {
				insertIntoOpenTasksTab(
					<Alert
						visible={true}
						message={Translation.Page.Shared.FormMessage.internalServerError}
						type={AlertType.Danger}
					/>
				);
			} else {
				insertIntoOpenTasksTab(this.parseTasks(response.body));
			}
		}, () => {
			insertIntoOpenTasksTab(
				<Alert
					visible={true}
					message={Translation.Page.Shared.FormMessage.badConnection}
					type={AlertType.Danger}
				/>
			);
		});
	}

	private insertCloseTasks(insetIntoCloseTasksTab: (content: JSX.Element) => void): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.GetDoneTasks.path}${Memory.token}`,
			{
				method: Constant.Server.Action.GetDoneTasks.method,
				headers: Constant.Server.headers
			}
		).then((response: any) => response.json()
		).then((response: JsonResponse) => {
			if (response === undefined) {
				insetIntoCloseTasksTab(
					<Alert
						visible={true}
						message={Translation.Page.Shared.FormMessage.internalServerError}
						type={AlertType.Info}
					/>
				);
			} else if (response.code !== ResponseCode.OK) {
				insetIntoCloseTasksTab(
					<Alert
						visible={true}
						message={Translation.Page.Shared.FormMessage.internalServerError}
						type={AlertType.Info}
					/>
				);
			} else {
				insetIntoCloseTasksTab(this.parseTasks(response.body));
			}
		}, () => {
			insetIntoCloseTasksTab(
				<Alert
					visible={true}
					message={Translation.Page.Shared.FormMessage.badConnection}
					type={AlertType.Danger}
				/>
			);
		});
	}

	private parseTasks(tasksArray: any[]): JSX.Element {
		const result: JSX.Element[] = [];
		if (tasksArray.length === 0) {
			result.push(<Alert message={Translation.Page.Tasks.emptyList}/>);
		}
		tasksArray.forEach((task: TaskDto, index: number) => {
			result.push(
				<Task
					key={index}
					id={task.id}
					token={Memory.token || ''}
					title={task.title}
					description={task.description}
					deadline={task.deadline}
					isDone={task.isDone}
					isImportant={task.isImportant}
					onRemove={(removedTask: Task) => {
						if (removedTask.isDone()) {
							this.insertCloseTasks(this._closeTasksInserter);
						} else {
							this.insertOpenTasks(this._openTasksInserter);
						}
					}}
				/>
			);
		});
		return (
			<div className={'tasks'}>{result}</div>
		);
	}

	private createTask(task: EditTaskDto): void {
		const data: any = {
			id: task.id,
			title: task.title,
			description: task.description,
			isDeadlineExist: task.isDeadlineExist,
			deadline: task.deadline.valueOf() / 1000,
			isDone: task.isDone,
			isImportant: task.isImportant
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
					this._createTaskForm.showAlert(AlertType.Success, Translation.Page.Tasks.FormMessage.success);
					if (!task.isDone && this._openTasksInserter) {
						this.insertOpenTasks(this._openTasksInserter);
					} else if (task.isDone && this._closeTasksInserter) {
						this.insertCloseTasks(this._closeTasksInserter);
					}
					this._createTaskForm.model = new EditTaskDto();
					break;
			}
		});
	}
}
