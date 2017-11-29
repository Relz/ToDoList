import * as React from 'react';
import { ButtonSize } from '../Button/ButtonSize';
import { ButtonType } from '../Button/ButtonType';
import { Button } from '../Button/Button';
import { IFormProps } from '../Props/Form/IFormProps';
import { DirectionType } from '../Container/DirectionType';
import { Container } from '../Container/Container';
import { JustifyType } from '../Container/JustifyType';
import { AlertType } from '../Alert/AlertType';
import { Alert } from '../Alert/Alert';
import { AlignItemsType } from '../Container/AlignItemsType';

export abstract class Form<T extends IFormProps<any>, U> extends React.Component <T, U> {
	private readonly TITLE: string = 'Title';
	private readonly BUTTON_TITLE: string = 'Submit';

	private _title: string;
	private _buttonTitle: string;
	private _alert: Alert;
	private _className: string = '';

	public constructor(props: T) {
		super(props);
		this.title = props.title === undefined ? this.TITLE : props.title;
		this.buttonTitle = props.buttonTitle === undefined ? this.BUTTON_TITLE : props.buttonTitle;
	}

	public render(): JSX.Element {
		return (
			<form
				className={'form ' + this._className}
				onSubmit={(event: any) => {
					event.preventDefault();
					this.onSubmit(event);
				}}
			>
				<Container
					directionType={DirectionType.Column}
					justifyType={JustifyType.Center}
					alignItemsType={AlignItemsType.Baseline}
				>
					<div className='form_title'>{this._title}</div>
					<Alert
						visible={false}
						ref={(ref: Alert) => this._alert = ref}
					/>
					{this.getInner()}
					{this.getButton()}
				</Container>
			</form>
		);
	}

	public showAlert(type: AlertType, message: string): void {
		this._alert.type = type;
		this._alert.message = message;
		this._alert.visible = true;
	}

	protected set title(value: string) {
		this._title = value;
	}

	protected set buttonTitle(value: string) {
		this._buttonTitle = value;
	}

	protected set className(value: string) {
		this._className = value;
	}

	protected getButton(): JSX.Element {
		return (
			<Button
				type={ButtonType.Success}
				size={ButtonSize.Medium}
			>
				{this._buttonTitle}
			</Button>
		);
	}

	protected abstract getInner(): JSX.Element[];

	protected abstract onSubmit(event: any): void;
}
