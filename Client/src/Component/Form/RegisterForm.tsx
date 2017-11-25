import * as React from 'react';
import { IRegisterProperties } from '../Props/Form/IRegisterProperties';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { RegisterDto } from '../../DTO/RegisterDto';
import { Form } from './Form';
import { Translation } from '../../translation/ru';

export class RegisterForm extends Form <IRegisterProperties, {}> {
	private _model: RegisterDto = new RegisterDto();

	public constructor(props: IRegisterProperties) {
		super(props);
		this.title = Translation.RegisterForm.title;
		this.buttonTitle = Translation.RegisterForm.button;
	}

	protected getInner(): JSX.Element[] {
		return ([
			<Input
				key='register_email'
				type={InputType.Email}
				placeholder={Translation.RegisterForm.emailPlaceholder}
				onChange={(value: string) => this._model.email = value}
			/>,
			<Input
				key='register_name'
				type={InputType.Text}
				placeholder={Translation.RegisterForm.namePlaceholder}
				onChange={(value: string) => this._model.name = value}
			/>,
			<Input
				key='register_password'
				type={InputType.Password}
				placeholder={Translation.RegisterForm.passwordPlaceholder}
				onChange={(value: string) => this._model.password = value}
			/>,
			<Input
				key='register_repeat_password'
				type={InputType.Password}
				placeholder={Translation.RegisterForm.passwordRepeatPlaceholder}
				onChange={(value: string) => this._model.repeatPassword = value}
			/>
		]);
	}

	protected onSubmit(event: any): void {
		this.props.onSubmit(this._model);
	}
}
