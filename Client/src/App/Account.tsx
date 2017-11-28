import * as React from 'react';
import { Constant } from '../Constant';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { AlertType } from '../Component/Alert/AlertType';
import { Translation } from '../translation/ru';
import { Redirect } from 'react-router';
import { AccountDto } from '../Dto/AccountDto';
import { AccountForm } from '../Component/Form/AccountForm';
import { ResponseCode } from './JsonResponse/ResponseCode';

export class Account extends React.Component {
	private _accountForm: AccountForm;

	public constructor(props: {}) {
		super(props);
		if (Constant.token !== undefined) {
			this.loadAccountData();
		}
	}

	public render(): JSX.Element {
		if (Constant.token === undefined) {
			return <Redirect to={'/'}/>;
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
			`${Constant.Server.url}${Constant.Server.Action.EditUser.path}${Constant.token}`,
			{
				method: Constant.Server.Action.EditUser.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(model)
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
			if (response === undefined) {
				this._accountForm.showAlert(AlertType.Danger, Translation.Page.Shared.internalServerError);
				return;
			}
			switch (response.code) {
				case ResponseCode.INTERNAL_ERROR:
					this._accountForm.showAlert(AlertType.Danger, Translation.Page.Account.FormMessage.internalServerError);
					break;
				case ResponseCode.BAD_BODY:
					this._accountForm.showAlert(AlertType.Danger, Translation.Page.Account.FormMessage.badBody);
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
			this._accountForm.showAlert(AlertType.Danger, Translation.Page.Account.FormMessage.badConnection);
		});

	}

	private loadAccountData(): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.GetUserInfo.path}${Constant.token}`,
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
			this._accountForm.showAlert(AlertType.Danger, Translation.Page.Account.FormMessage.badConnection);
		});
	}
}
