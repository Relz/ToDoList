import * as React from 'react';
import '../../sass/_form.sass';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { ISignInFormProps } from '../Props/Form/ISignInFormProps';
import { Form } from './Form';
import { Translation } from '../../translation/ru';
import { SignInDto } from '../../Dto/SignInDto';

export class SignInForm extends Form<ISignInFormProps, {}> {
	private _model: SignInDto = new SignInDto();

	constructor(props: ISignInFormProps) {
		super(props);
		this.title = Translation.SignInForm.title;
		this.buttonTitle = Translation.SignInForm.button;
	}

	protected getInner(): JSX.Element[] {
		return ([
			<Input
				key='email'
				type={InputType.Email}
				placeholder={Translation.SignInForm.emailPlaceholder}
				onChange={(value: string) => this._model.login = value}
			/>,
			<Input
				key='password'
				type={InputType.Password}
				placeholder={Translation.SignInForm.passwordPlaceholder}
				onChange={(value: string) => this._model.password = value}
			/>
		]);
	}

	protected onSubmit(): void {
		this.props.onSubmit(this._model);
	}
}
