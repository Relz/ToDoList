import * as React from 'react';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { Container } from '../Container/Container';
import { DirectionType } from '../Container/DirectionType';
import { ISignInFormProps } from '../Props/Form/ISignInFormProps';
import { SignInDto } from '../../DTO/SignInDto';
import { Form } from './Form';

export class SignInForm extends Form<ISignInFormProps, {}> {
	private _model: SignInDto = new SignInDto();

	constructor(props: ISignInFormProps) {
		super(props);
		this.title = 'Sign in';
		this.buttonTitle = 'Sign in';
	}

	protected getInner(): JSX.Element {
		return (
			<div>
				<Container directionType={DirectionType.Column}>
					<Input
						type={InputType.Email}
						onChange={(value: string) => this._model.email = value}
					/>
					<Input
						type={InputType.Password}
						onChange={(value: string) => this._model.password = value}
					/>
				</Container>
			</div>
		);
	}

	protected onSubmit(): void {
		this.props.onSubmit(this._model);
	}
}
