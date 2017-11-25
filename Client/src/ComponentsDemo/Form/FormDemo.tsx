import * as React from 'react';
import { SignInForm } from '../../Component/Form/SignInForm';
import { RegisterForm } from '../../Component/Form/RegisterForm';
import { SignInDto } from '../../DTO/SignInDto';
import { RegisterDto } from '../../DTO/RegisterDto';
import { TaskDto } from '../../DTO/TaskDto';
import { EditTaskForm } from '../../Component/Form/EditTaskForm';
import { Container } from '../../Component/Container/Container';
import { JustifyType } from '../../Component/Container/JustifyType';
import { AlignItemsType } from '../../Component/Container/AlignItemsType';
import { DirectionType } from '../../Component/Container/DirectionType';
import { Translation } from '../../translation/ru';

export class FormDemo extends React.Component<{}, {}> {
	private _task: TaskDto = new TaskDto();

	constructor(props: any) {
		super(props);

		this._task.title = 'Title';
		this._task.description = 'Hello, my friend! This is first task in our list...';
	}

	public render(): JSX.Element {
		return (
			<div className='form_demo'>
				<Container
					directionType={DirectionType.Column}
					alignItemsType={AlignItemsType.Center}
					justifyType={JustifyType.Center}
				>
					<SignInForm onSubmit={this.onLogin}/>
					<RegisterForm onSubmit={this.onRegister}/>
					<EditTaskForm
						onSubmit={this.onEditTask}
						title={Translation.EditTaskForm.createTitle}
						buttonTitle={Translation.EditTaskForm.createButton}
					/>
					<EditTaskForm
						onSubmit={this.onEditTask}
						task={this._task}
						title={Translation.EditTaskForm.editTitle}
						buttonTitle={Translation.EditTaskForm.editButton}
					/>
				</Container>
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
			'name: \"' + model.name + '\"' +
			'password: \"' + model.password + '\"\n' +
			'repeat password: \"' + model.repeatPassword + '\"'
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
