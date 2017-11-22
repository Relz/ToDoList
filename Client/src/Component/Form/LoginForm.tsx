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
import { ILoginFormProps } from '../Props/Form/ILoginFormProps';

export class LoginForm extends React.Component<ILoginFormProps, {}> {
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
					<Input type={InputType.Password}/>
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
}