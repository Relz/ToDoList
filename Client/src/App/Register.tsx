import * as React from 'react';
import { RegisterForm } from '../Component/Form/RegisterForm';
import { RegisterDto } from '../DTO/RegisterDto';
import { Constant } from '../Constant';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { ResponseCode } from './JsonResponse/ResponseCode';
import { AlertType } from '../Component/Alert/AlertType';
import { Translation } from '../translation/ru';
import { Redirect } from 'react-router';

export class Register extends React.Component {
	private _registerForm: RegisterForm;

	public render(): JSX.Element {
		if (localStorage.getItem(Constant.tokenKey) !== null) {
			return <Redirect to={'/'}/>
		}
		return (
			<RegisterForm
				ref={(ref: RegisterForm) => this._registerForm = ref}
				onSubmit={Register.onSubmit.bind(this)}
			/>
		);
	}

	private static onSubmit(model: RegisterDto): void {
		const that: any = this;
		fetch(
			`${Constant.Server.url}:${Constant.Server.port}${Constant.Server.Action.Register.path}`,
			{
				method: Constant.Server.Action.Register.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(model)
			}
		).then((response: any) => {
			return response.json();
		}).then((response: JsonResponse) => {
			switch(response.code) {
				case ResponseCode.INTERNAL_ERROR:
					that._registerForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.internalServerError);
					break;
				case ResponseCode.BAD_BODY:
					that._registerForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.badBody);
					break;
				case ResponseCode.WRONG_LOGIN:
					that._registerForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.userAlreadyExists);
					break;
				case ResponseCode.OK:
					that._registerForm.showAlert(AlertType.Success, Translation.Page.Register.FormMessage.success);
					localStorage.setItem(Constant.tokenKey, response.body.token);
					window.location.reload();
					break;
			}
		}, () => {
			that._registerForm.showAlert(AlertType.Danger, Translation.Page.Register.FormMessage.badConnection);
		});

	}
}
