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

class IconPath {
	public static readonly important: string = require('../../img/icon/icon_important.png');
	public static readonly notImportant: string = require('../../img/icon/icon_not_important.png');
	public static readonly done: string = require('../../img/icon/icon_done.png');
	public static readonly notDone: string = require('../../img/icon/icon_not_done.png');
	public static readonly edit: string = require('../../img/icon/icon_edit.png');
	public static readonly delete: string = require('../../img/icon/icon_delete.png');
}

export class Task extends React.Component<ITaskProp, ITaskState> {
	private _importantButton: Button;
	private _doneButton: Button;
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
			task: true,
			important: this.state.isImportant
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
								type={ButtonType.Default}
								size={ButtonSize.Medium}
								onClick={this.onImportantButtonClick.bind(this)}
								ref={(ref: Button) => this._importantButton = ref}
							>
								<img src={this.getImportantIcon()} className='icon' alt={this.getImportantButtonText()}/>
							</Button>
							<Button
								type={ButtonType.Default}
								size={ButtonSize.Medium}
								onClick={this.onDoneButtonClick.bind(this)}
								ref={(ref: Button) => this._doneButton = ref}
							>
								<img src={this.getDoneIcon()} className='icon' alt={this.getDoneButtonText()}/>
							</Button>
							<Button
								type={ButtonType.Default}
								size={ButtonSize.Medium}
								onClick={this.onEditButtonClick.bind(this)}
								ref={(ref: Button) => this._editButton = ref}
							>
								<img src={IconPath.edit} className='icon' alt={Translation.Alt.Icon.edit}/>
							</Button>
							<Button
								type={ButtonType.Default}
								size={ButtonSize.Medium}
								onClick={this.onDeleteButtonClick.bind(this)}
								ref={(ref: Button) => this._deleteButton = ref}
							>
								<img src={IconPath.delete} className='icon' alt={Translation.Alt.Icon.delete}/>
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

	private getImportantButtonText(): string {
		return this.state.isImportant ? Translation.Alt.Icon.notImportant : Translation.Alt.Icon.important;
	}

	private getImportantIcon(): string {
		return this.state.isImportant ? IconPath.important : IconPath.notImportant;
	}

	private getDoneButtonText(): string {
		return this.state.isDone ? Translation.Alt.Icon.done : Translation.Alt.Icon.notDone;
	}

	private getDoneIcon(): string {
		return this.state.isDone ? IconPath.done : IconPath.notDone;
	}

	private onImportantButtonClick(): void {
		this._importantButton.disabled = true;
		const data: any = {
			value: !this.state.isImportant
		};
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.SetTaskImportant.path}${this.props.id}/${Memory.token}`,
			{
				method: Constant.Server.Action.SetTaskImportant.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(data)
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
					this._importantButton.disabled = false;
					this.setState({ isImportant: !this.state.isImportant });
					break;
			}
		});
	}

	private onDoneButtonClick(): void {
		this._doneButton.disabled = true;
		const data: any = {
			value: !this.state.isDone
		};
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.SetTaskDone.path}${this.props.id}/${Memory.token}`,
			{
				method: Constant.Server.Action.SetTaskDone.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(data)
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
					this._doneButton.disabled = false;
					this.props.onDoneChanged(!this.state.isDone);
					this.setState({ isDone: !this.state.isDone });
					break;
			}
		});
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
			`${Constant.Server.url}${Constant.Server.Action.DeleteTask.path}${this.props.id}/${Memory.token}`,
			{
				method: Constant.Server.Action.DeleteTask.method,
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
