import * as React from 'react';
import { SignInForm } from '../../Component/Form/SignInForm';
import { RegisterForm } from '../../Component/Form/RegisterForm';
import { SignInDto } from '../../DTO/SignInDto';
import { RegisterDto } from '../../DTO/RegisterDto';
import { TaskDto } from '../../DTO/TaskDto';
import { EditTaskForm } from '../../Component/Form/EditTaskForm';

export class FormDemo extends React.Component<{}, {}> {
	private _task: TaskDto = new TaskDto();

	constructor(props: any) {
		super(props);

		this._task.title = 'Title';
		this._task.description = 'Hello, my friend! This is first task in our list...';
	}

	public render(): JSX.Element {
		return (
			<div>
				<SignInForm onSubmit={this.onLogin}/>
				<RegisterForm onSubmit={this.onRegister}/>
				<EditTaskForm
					onSubmit={this.onEditTask}
				/>
				<EditTaskForm
					onSubmit={this.onEditTask}
					task={this._task}
				/>
			</div>
		);
	}

	private onLogin(model: SignInDto): void {
		alert(
			'LOGIN DATA:\n' +
			'email: \"' + model.email + '\"\n' +
			'password: \"' + model.password + '\"'
		);
	}

	private onRegister(model: RegisterDto): void {
		alert(
			'REGISTER DATA\n' +
			'email: \"' + model.email + '\"\n' +
			'password: \"' + model.password + '\"\n' +
			'repeat password: \"' + model.repeatPassword + '\"\n' +
			'name: \"' + model.name + '\"'
		);
	}

	private onEditTask(model: TaskDto): void {
		alert(
			'TASK DATA:\n' +
			'title: \"' + model.title + '\"\n' +
			'description: \"' + model.description + '\"\n' +
			'isDeadlineExist: \"' + model.isDeadlineExist + '\"\n' +
			'deadline: \"' + model.deadLine + '\"'
		);
	}
}
