import * as React from 'react';
import '../../sass/_form.sass';
import { InputType } from '../Input/InputType';
import { Input } from '../Input/Input';
import { Form } from './Form';
import { Translation } from '../../translation/ru';
import { AccountDto } from '../../Dto/AccountDto';
import { IAccountFormProps } from '../Props/Form/IAccountFormProps';
import { IAccountFormState } from '../State/Form/IAccountFormState';

export class AccountForm extends Form<IAccountFormProps, IAccountFormState> {
	constructor(props: IAccountFormProps) {
		super(props);
		this.title = Translation.AccountForm.title;
		this.buttonTitle = Translation.AccountForm.button;
		this.state = {
			login: '',
			name: '',
			password: '',
			newPassword: ''
		};
	}

	protected getInner(): JSX.Element[] {
		return ([
			<Input
				key='email'
				type={InputType.Email}
				value={this.state.login}
				placeholder={Translation.AccountForm.emailPlaceholder}
				onChange={(value: string) => this.setState({ login: value })}
			/>,
			<Input
				key='name'
				type={InputType.Text}
				value={this.state.name}
				placeholder={Translation.AccountForm.namePlaceholder}
				onChange={(value: string) => this.setState({ name: value })}
			/>,
			<Input
				key='password'
				type={InputType.Password}
				value={this.state.password}
				placeholder={Translation.AccountForm.oldPasswordPlaceholder}
				onChange={(value: string) => this.setState({ password: value })}
			/>,
			<Input
				key='new_password'
				type={InputType.Password}
				value={this.state.newPassword}
				placeholder={Translation.AccountForm.newPasswordPlaceholder}
				onChange={(value: string) => this.setState({ newPassword: value })}
			/>
		]);
	}

	protected onSubmit(): void {
		const accountDto: AccountDto = new AccountDto();
		accountDto.login = this.state.login;
		accountDto.name = this.state.name;
		accountDto.password = this.state.password;
		accountDto.newPassword = this.state.newPassword;
		this.props.onSubmit(accountDto);
	}

	public set model(value: AccountDto) {
		this.setState({
			login: value.login,
			name: value.name,
			password: value.password,
			newPassword: value.newPassword
		});
	}
}
