// tslint:disable:jsx-no-bind
import * as React from 'react';
import * as classNames from 'classnames';
import { ITaskProp } from '../Props/ITaskProps';
import { ITaskState } from '../State/ITaskState';
import { Container } from '../Container/Container';
import { DirectionType } from '../Container/DirectionType';
import { JustifyType } from '../Container/JustifyType';
import { AlignItemsType } from '../Container/AlignItemsType';
import { AlignSelfType } from '../Container/AlignSelfType';
import { Button } from '../Button/Button';
import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';
import { Translation } from '../../translation/ru';
import { Constant } from '../../Constant';
import { Memory } from '../../Memory';
import { JsonResponse } from '../../App/JsonResponse/JsonResponse';
import { ResponseCode } from '../../App/JsonResponse/ResponseCode';

export class Task extends React.Component<ITaskProp, ITaskState> {
	private _editButton: Button;
	private _deleteButton: Button;

	public constructor(props: ITaskProp) {
		super(props);
		this.state = {
			isDone: props.isDone,
			isImportant: props.isImportant
		};
	}

	public render(): JSX.Element {
		const classes: string = classNames({
			task: true
		});

		return (
			<div className={classes}>
				<Container
					directionType={DirectionType.Column}
					justifyType={JustifyType.SpaceBetween}
					alignItemsType={AlignItemsType.Stretch}
					alignSelfType={AlignSelfType.Stretch}
				>
					<span className={'task_title'}>{this.props.title}</span>
					<span className={'task_description'}>{this.props.description}</span>
					<div className={'task_footer'}>
						<Container
							directionType={DirectionType.Row}
							justifyType={JustifyType.SpaceAround}
							alignItemsType={AlignItemsType.Center}
							alignSelfType={AlignSelfType.Stretch}
						>
							<Button
								type={ButtonType.Primary}
								size={ButtonSize.Medium}
								onClick={this.onEditButtonClick.bind(this)}
								ref={(ref: Button) => this._editButton = ref}
							>
								{Translation.Task.editButtonText}
							</Button>
							<Button
								type={ButtonType.Danger}
								size={ButtonSize.Medium}
								onClick={this.onDeleteButtonClick.bind(this)}
								ref={(ref: Button) => this._deleteButton = ref}
							>
								{Translation.Task.deleteButtonText}
							</Button>
						</Container>
					</div>
				</Container>
			</div>
		);
	}

	public isDone(): boolean {
		return this.state.isDone;
	}

	public setDone(value: boolean, callback: () => void): void {
		this.setState({ isDone: value }, callback);
	}

	public isImportant(): boolean {
		return this.state.isImportant;
	}

	public setImportant(value: boolean, callback: () => void): void {
		this.setState({ isImportant: value }, callback);
	}

	private getDoneButtonType(): ButtonType {
		return this.state.isDone ? ButtonType.Danger : ButtonType.Success;
	}

	private getImportantButtonType(): ButtonType {
		return this.state.isImportant ? ButtonType.Warning : ButtonType.Info;
	}

	private onEditButtonClick(): void {
		window.location.href = Constant.Path.editTask +
			`?id=${this.props.id}` +
			`&title=${this.props.title}` +
			`&description=${this.props.description}` +
			`&deadline=${this.props.deadline}` +
			`&isDone=${this.state.isDone}` +
			`&isImportant=${this.state.isImportant}`;
	}

	private onDeleteButtonClick(): void {
		this._deleteButton.disabled = true;
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.deleteTask.path}${this.props.id}/${Memory.token}`,
			{
				method: Constant.Server.Action.deleteTask.method,
				headers: Constant.Server.headers
			}
		).then((response: any) => response.json()
		).then((response: JsonResponse) => {
			if (response === undefined) {
				return;
			}
			switch (response.code) {
				case ResponseCode.BAD_BODY:
					break;
				case ResponseCode.OK:
					this._deleteButton.disabled = false;
					this.props.onRemove(this);
					break;
			}
		});
	}
}
