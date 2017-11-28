import * as React from 'react';
import { RegisterForm } from '../Component/Form/RegisterForm';
import { RegisterDto } from '../Dto/RegisterDto';
import { Constant } from '../Constant';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { ResponseCode } from './JsonResponse/ResponseCode';
import { AlertType } from '../Component/Alert/AlertType';
import { Translation } from '../translation/ru';
import { Redirect } from 'react-router';

export class Register extends React.Component {
	private _registerForm: RegisterForm;

	public render(): JSX.Element {
		if (Constant.token !== undefined) {
			return <Redirect to={'/'}/>;
		}
		return (
			<RegisterForm
				ref={(ref: RegisterForm) => this._registerForm = ref}
				onSubmit={(model: RegisterDto) => this.onSubmit(model)}
			/>
		);
	}

	private onSubmit(model: RegisterDto): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.Register.path}`,
			{
				method: Constant.Server.Action.Register.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(model)
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
			if (response === undefined) {
				this._registerForm.showAlert(AlertType.Danger, Translation.Page.Shared.internalServerError);
				return;
			}
			switch (response.code) {
				case ResponseCode.BAD_BODY:
					this._registerForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.badBody);
					break;
				case ResponseCode.WRONG_LOGIN:
					this._registerForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.userAlreadyExists);
					break;
				case ResponseCode.OK:
					this._registerForm.showAlert(AlertType.Success, Translation.Page.Register.FormMessage.success);
					localStorage.setItem(Constant.tokenKey, response.body.token);
					window.location.reload();
					break;
			}
		}, () => {
			this._registerForm.showAlert(AlertType.Danger, Translation.Page.Shared.badConnection);
		});
	}
}
