import * as React from 'react';
import { IRegisterProperties } from '../Props/Form/IRegisterProperties';
import { DirectionType } from '../Container/DirectionType';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { Container } from '../Container/Container';
import { RegisterDto } from '../../DTO/RegisterDto';
import { Form } from './Form';

export class RegisterForm extends Form <IRegisterProperties, {}> {
	private _model: RegisterDto = new RegisterDto();

	public constructor(props: IRegisterProperties) {
		super(props);
		this.title = 'Register';
		this.buttonTitle = 'Register';
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
						type={InputType.Text}
						onChange={(value: string) => this._model.name = value}
					/>
					<Input
						type={InputType.Password}
						onChange={(value: string) => this._model.password = value}
					/>
					<Input
						type={InputType.Password}
						onChange={(value: string) => this._model.repeatPassword = value}
					/>
				</Container>
			</div>
		);
	}

	protected onSubmit(event: any): void {
		this.props.onSubmit(this._model);
	}
}
