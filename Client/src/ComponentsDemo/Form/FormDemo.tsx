import * as React from 'react';
import { SignInForm } from '../../Component/Form/SignInForm';
import { RegisterForm } from '../../Component/Form/RegisterForm';
import { SignInDto } from '../../Dto/SignInDto';
import { RegisterDto } from '../../Dto/RegisterDto';
import { EditTaskForm } from '../../Component/Form/EditTaskForm';
import { Container } from '../../Component/Container/Container';
import { JustifyType } from '../../Component/Container/JustifyType';
import { AlignItemsType } from '../../Component/Container/AlignItemsType';
import { DirectionType } from '../../Component/Container/DirectionType';
import { Translation } from '../../translation/ru';
import { EditTaskDto } from '../../Dto/EditTaskDto';

export class FormDemo extends React.Component<{}, {}> {
	private _task: EditTaskDto = new EditTaskDto();

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
					<SignInForm onSubmit={FormDemo.onLogin}/>
					<RegisterForm onSubmit={FormDemo.onRegister}/>
					<EditTaskForm
						onSubmit={FormDemo.onEditTask}
						title={Translation.CreateTaskForm.createTitle}
						buttonTitle={Translation.CreateTaskForm.createButton}
					/>
					<EditTaskForm
						onSubmit={FormDemo.onEditTask}
						task={this._task}
						title={Translation.EditTaskForm.editTitle}
						buttonTitle={Translation.EditTaskForm.editButton}
					/>
				</Container>
			</div>
		);
	}

	/* tslint:disable:prefer-template */
	private static onLogin(model: SignInDto): void {
		alert(
			`LOGIN DATA:\n` +
			`email: "${model.login}"\n` +
			`password: "${model.password}"`
		);
	}

	private static onRegister(model: RegisterDto): void {
		alert(
			`REGISTER DATA\n` +
			`login: "${model.login}"\n` +
			`name: "${model.name}"\n` +
			`password: "${model.password}"`
		);
	}

	private static onEditTask(model: EditTaskDto): void {
		alert(
			`TASK DATA:\n` +
			`title: "${model.title}"\n` +
			`description: "'${model.description}"\n` +
			`isDeadlineExist: "${model.isDeadlineExist}"\n` +
			`deadline: "${model.deadline}"`
		);
	}
	/* tslint:enable:prefer-template */
}
