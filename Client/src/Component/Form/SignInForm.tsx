import * as React from 'react';
import { ButtonSize } from '../Button/ButtonSize';
import { ButtonType } from '../Button/ButtonType';
import { Button } from '../Button/Button';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { AlignSelfType } from '../Container/AlignSelfType';
import { AlignItemsType } from '../Container/AlignItemsType';
import { JustifyType } from '../Container/JustifyType';
import { Container } from '../Container/Container';
import { DirectionType } from '../Container/DirectionType';
import { ISignInFormProps } from '../Props/Form/ISignInFormProps';
import { SignInDto } from '../../DTO/SignInDto';

export class SignInForm extends React.Component<ISignInFormProps, {}> {
	public render(): JSX.Element {
		return (
			<form
				className='form_block'
				onSubmit={(event: any): void => {
					event.preventDefault();
					this.props.onSubmit(this.model);
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
						onChange={(value: string) => this.model.email = value}
					/>
					<Input
						type={InputType.Password}
						onChange={(value: string) => this.model.password = value}
					/>
					<Button
						type={ButtonType.Success}
						size={ButtonSize.Large}
					>
						Login
					</Button>
				</Container>
			</form>
		);
	}

	private model: SignInDto = new SignInDto();
}
