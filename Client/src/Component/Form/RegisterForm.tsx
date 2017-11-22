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

export class RegisterForm extends React.Component <IRegisterProperties, {}> {
	public render(): JSX.Element {
		return (
			<form
				className='form_block'
				onSubmit={(event: any): void => {
					event.preventDefault();
				}}
			>
				<Container
					directionType={DirectionType.Column}
					justifyType={JustifyType.Center}
					alignItemsType={AlignItemsType.Center}
					alignSelfType={AlignSelfType.Auto}
				>
					<Input type={InputType.Email}/>
					<Input type={InputType.Text}/>
					<Input type={InputType.Password}/>
					<Input type={InputType.Password}/>
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
}
