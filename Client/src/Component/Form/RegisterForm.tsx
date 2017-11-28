import * as React from 'react';
import { IRegisterProps } from '../Props/Form/IRegisterProps';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { RegisterDto } from '../../Dto/RegisterDto';
import { Form } from './Form';
import { Translation } from '../../translation/ru';
import { AccountDto } from '../../DTO/AccountDto';

export class RegisterForm extends Form<IRegisterProps, {}> {
	private _model: AccountDto = new AccountDto();

	public constructor(props: IRegisterProps) {
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
				onChange={(value: string) => this._model.login = value}
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
				onChange={(value: string) => {
					// Check for equality
				}}
			/>
		]);
	}

	protected onSubmit(event: any): void {
		this.props.onSubmit(this._model);
	}
}
