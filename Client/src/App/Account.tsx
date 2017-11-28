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
		if (localStorage.getItem(Constant.tokenKey) !== null) {
			this.loadAccountData();
		}
	}

	public render(): JSX.Element {
		if (localStorage.getItem(Constant.tokenKey) === null) {
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
			`${Constant.Server.url}${Constant.Server.Action.EditUser.path}${localStorage.getItem(Constant.tokenKey)}`,
			{
				method: Constant.Server.Action.EditUser.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(model)
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
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
			`${Constant.Server.url}${Constant.Server.Action.GetUserInfo.path}${localStorage.getItem(Constant.tokenKey)}`,
			{
				method: Constant.Server.Action.GetUserInfo.method,
				headers: Constant.Server.headers
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
			const accountDto: AccountDto = new AccountDto();
			accountDto.login = response.body.login;
			accountDto.name = response.body.name;
			this._accountForm.model = accountDto;
		}, () => {
			this._accountForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.badConnection);
		});
	}
}
