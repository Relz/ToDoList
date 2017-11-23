import * as React from 'react';
import { IRegisterProperties } from '../Props/Form/IRegisterProperties';
import { DirectionType } from '../Container/DirectionType';
import { JustifyType } from '../Container/JustifyType';
import { AlignItemsType } from '../Container/AlignItemsType';
import { AlignSelfType } from '../Container/AlignSelfType';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';
import { Container } from '../Container/Container';
import { Button } from '../Button/Button';
import { RegisterDto } from '../../DTO/RegisterDto';

export class RegisterForm extends React.Component <IRegisterProperties, {}> {
	public render(): JSX.Element {
		return (
			<form
				className='form_block'
				onSubmit={(event: any): void => {
					event.preventDefault();
					this.props.onSubmit(this._model);
				}}
			>
				<Container
					directionType={DirectionType.Column}
					justifyType={JustifyType.Center}
					alignItemsType={AlignItemsType.Center}
					alignSelfType={AlignSelfType.Auto}
				>
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
					<Button
						type={ButtonType.Success}
						size={ButtonSize.Large}
					>
						Register
					</Button>
				</Container>
			</form>
		);
	}

	private _model: RegisterDto = new RegisterDto();
}
