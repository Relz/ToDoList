import * as React from 'react';
import { IRegisterProps } from '../Props/Form/IRegisterProps';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { RegisterDto } from '../../Dto/RegisterDto';
import { Form } from './Form';
import { Translation } from '../../translation/ru';

export class RegisterForm extends Form<IRegisterProps, {}> {
	private _model: RegisterDto = new RegisterDto();

	public constructor(props: IRegisterProps) {
		super(props);
		this.title = Translation.RegisterForm.title;
		this.buttonTitle = Translation.RegisterForm.button;
		this.className = 'register_form';

		this._model.login = '';
		this._model.name = '';
		this._model.password = '';
	}

	protected getInner(): JSX.Element[] {
		return ([
			<Input
				key='email'
				type={InputType.Email}
				placeholder={Translation.RegisterForm.emailPlaceholder}
				onChange={(value: string) => this._model.login = value}
			/>,
			<Input
				key='name'
				type={InputType.Text}
				placeholder={Translation.RegisterForm.namePlaceholder}
				onChange={(value: string) => this._model.name = value}
			/>,
			<Input
				key='password'
				type={InputType.Password}
				placeholder={Translation.RegisterForm.passwordPlaceholder}
				onChange={(value: string) => this._model.password = value}
			/>,
			<Input
				key='repeat_password'
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
