import * as React from 'react';
import { Constant } from '../Constant';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { AlertType } from '../Component/Alert/AlertType';
import { Translation } from '../translation/ru';
import { Redirect } from 'react-router';
import { AccountDto } from '../Dto/AccountDto';
import { AccountForm } from '../Component/Form/AccountForm';
import { ResponseCode } from './JsonResponse/ResponseCode';
import { Memory } from '../Memory';

export class Account extends React.Component {
	private _accountForm: AccountForm;

	public constructor(props: {}) {
		super(props);
		if (Memory.token !== undefined) {
			this.loadAccountData();
		}
	}

	public render(): JSX.Element {
		if (Memory.token === undefined) {
			return <Redirect to={Constant.Path.signIn}/>;
		}
		return (
			<AccountForm
				ref={(ref: AccountForm) => this._accountForm = ref}
				onSubmit={(model: AccountDto) => this.onSubmit(model)}
			/>
		);
	}

	private onSubmit(model: AccountDto): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.EditUser.path}${Memory.token}`,
			{
				method: Constant.Server.Action.EditUser.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(model)
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
			if (response === undefined) {
				this._accountForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.internalServerError);
				return;
			}
			switch (response.code) {
				case ResponseCode.BAD_BODY:
					this._accountForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badBody);
					break;
				case ResponseCode.WRONG_LOGIN:
					this._accountForm.showAlert(AlertType.Danger, Translation.Page.Account.FormMessage.loginInUse);
					break;
				case ResponseCode.WRONG_PASSWORD:
					this._accountForm.showAlert(AlertType.Danger, Translation.Page.Account.FormMessage.wrongPassword);
					break;
				case ResponseCode.OK:
					this._accountForm.showAlert(AlertType.Success, Translation.Page.Account.FormMessage.success);
					model.password = '';
					model.newPassword = '';
					this._accountForm.model = model;
					break;
			}
		}, () => {
			this._accountForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badConnection);
		});

	}

	private loadAccountData(): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.GetUserInfo.path}${Memory.token}`,
			{
				method: Constant.Server.Action.GetUserInfo.method,
				headers: Constant.Server.headers
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
			if (response === undefined || response.body === undefined) {
				this._accountForm.showAlert(AlertType.Warning, Translation.Page.Account.FormMessage.noUserInfo);
			}
			const accountDto: AccountDto = new AccountDto();
			accountDto.login = response.body.login;
			accountDto.name = response.body.name;
			this._accountForm.model = accountDto;
		}, () => {
			this._accountForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badConnection);
		});
	}
}
