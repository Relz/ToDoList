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
import { TaskDto } from '../Dto/TaskDto';

export class Tasks extends React.Component {
	private _openTasksInserter: (content: JSX.Element) => void;
	private _closeTasksInserter: (content: JSX.Element) => void;

	public render(): JSX.Element {
		if (Memory.token === undefined) {
			return <Redirect to={'/'}/>;
		}

		return (
			<div>
				<Tab
					tabItems={[
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
					]}
					activeItemIndex={'open_tasks'}
				/>
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
						type={AlertType.Danger}
					/>
				);
			} else if (response.code !== ResponseCode.OK) {
				insetIntoCloseTasksTab(
					<Alert
						visible={true}
						message={Translation.Page.Shared.FormMessage.internalServerError}
						type={AlertType.Danger}
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
			result.push(<Alert key={'alert_empty_list'} message={Translation.Page.Tasks.emptyList}/>);
		}
		tasksArray.forEach((task: TaskDto, index: number) => {
			result.push(
				<Task
					key={task.id}
					id={task.id}
					token={Memory.token || ''}
					title={task.title}
					description={task.description}
					deadline={task.deadline}
					isDone={task.isDone}
					isImportant={task.isImportant}
					onRemove={(removedTask: Task) => this.onTaskChanged()}
					onDoneChanged={(isDone: boolean) => this.onTaskChanged()}
				/>
			);
		});
		return (
			<div className={'tasks'}>{result}</div>
		);
	}

	private onTaskChanged(): void {
		if (this._closeTasksInserter) {
			this.insertCloseTasks(this._closeTasksInserter);
		}
		if (this._openTasksInserter) {
			this.insertOpenTasks(this._openTasksInserter);
		}
	}
}
