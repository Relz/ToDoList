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

export class Task extends React.Component<ITaskProp, ITaskState> {
	private _setDoneButton: Button;
	private _setImportantButton: Button;
	private _editButton: Button;

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
								type={this.getDoneButtonType()}
								size={ButtonSize.Medium}
								onClick={this.onDoneButtonClick.bind(this)}
								ref={(ref: Button) => this._setDoneButton = ref}
							>
								{
									this.state.isDone
										? Translation.Task.setNotDoneButtonText
										: Translation.Task.setDoneButtonText
								}
							</Button>
							<Button
								type={this.getImportantButtonType()}
								size={ButtonSize.Medium}
								onClick={this.onImportantButtonClick.bind(this)}
								ref={(ref: Button) => this._setImportantButton = ref}
							>
								{
									this.state.isImportant
										? Translation.Task.setNotImportantButtonText
										: Translation.Task.setImportantButtonText
								}
							</Button>
							<Button
								type={ButtonType.Primary}
								size={ButtonSize.Medium}
								onClick={this.onEditButtonClick.bind(this)}
								ref={(ref: Button) => this._editButton = ref}
							>
								{Translation.Task.editButtonText}
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

	private onDoneButtonClick(): void {
		this._setDoneButton.disabled = true;
		setTimeout(() => {
			this._setDoneButton.disabled = false;
			this.setDone(!this.isDone(), () => this._setDoneButton.type = this.getDoneButtonType());
		}, 1000);
	}

	private onImportantButtonClick(): void {
		this._setImportantButton.disabled = true;
		setTimeout(() => {
			this._setImportantButton.disabled = false;
			this.setImportant(!this.isImportant(), () => this._setImportantButton.type = this.getImportantButtonType());
		}, 1000);
	}

	private onEditButtonClick(): void {
		this._editButton.disabled = true;
		// Redirect to page with task editing form
	}
}
