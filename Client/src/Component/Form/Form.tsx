import * as React from 'react';
import { ButtonSize } from '../Button/ButtonSize';
import { ButtonType } from '../Button/ButtonType';
import { Button } from '../Button/Button';
import { IFormProps } from '../Props/Form/IFormProps';

export abstract class Form<T extends IFormProps, U> extends React.Component <T, U> {
	private readonly TITLE: string = 'Title';
	private readonly BUTTON_TITLE: string = 'Submit';

	private _title: string;
	private _buttonTitle: string;

	public constructor(props: T) {
		super(props);
		this.title = props.title === undefined ? this.TITLE : props.title;
		this.buttonTitle = props.buttonTitle === undefined ? this.BUTTON_TITLE : props.buttonTitle;
	}

	public render(): JSX.Element {
		return (
			<form
				className='form_block'
				onSubmit={(event: any) => {
					event.preventDefault();
					this.onSubmit(event);
			}}
			>
				<div className='form_title'>{this._title}</div>
				{this.getInner()}
				{this.getButton()}
			</form>
		)
	}

	protected set title(value: string) {
		this._title = value;
	}

	protected set buttonTitle(value: string) {
		this._buttonTitle = value;
	}

	protected getButton(): JSX.Element {
		return (
			<Button
				type={ButtonType.Success}
				size={ButtonSize.Large}
			>
				{this._buttonTitle}
			</Button>
		)
	}

	protected abstract getInner(): JSX.Element;

	protected abstract onSubmit(event: any): void;
}
