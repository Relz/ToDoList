import * as React from 'react';
import { Constant } from '../Constant';
import { SignInForm } from '../Component/Form/SignInForm';
import { SignInDto } from '../Dto/SignInDto';
import { Redirect } from 'react-router';
import { JsonResponse } from './JsonResponse/JsonResponse';
import { ResponseCode } from './JsonResponse/ResponseCode';
import { Translation } from '../translation/ru';
import { AlertType } from '../Component/Alert/AlertType';
import { Memory } from '../Memory';

export class SignIn extends React.Component {
	private _signInForm: SignInForm;

	public render(): JSX.Element {
		if (Memory.token !== undefined) {
			return <Redirect to={'/'}/>;
		}
		return (
			<SignInForm
				ref={(ref: SignInForm) => this._signInForm = ref}
				onSubmit={(model: SignInDto) => this.onSubmit(model)}
			/>
		);
	}

	private onSubmit(model: SignInDto): void {
		fetch(
			`${Constant.Server.url}${Constant.Server.Action.SignIn.path}`,
			{
				method: Constant.Server.Action.SignIn.method,
				headers: Constant.Server.headers,
				body: JSON.stringify(model)
			}
		).then((response: any) => response.json()
		).then((response: JsonResponse) => {
			if (response === undefined) {
				this._signInForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.internalServerError);
				return;
			}
			switch (response.code) {
				case (ResponseCode.OK):
					Memory.token = response.body.token;
					Memory.userName = response.body.name;
					window.location.reload();
					break;
				case (ResponseCode.BAD_BODY):
					this._signInForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badBody);
					break;
				case (ResponseCode.WRONG_LOGIN):
					this._signInForm.showAlert(AlertType.Danger, Translation.Page.SignIn.FormMessage.invalidLogin);
					break;
				case (ResponseCode.WRONG_PASSWORD):
					this._signInForm.showAlert(AlertType.Danger, Translation.Page.SignIn.FormMessage.invalidPassword);
					break;
			}
		}, () => {
			this._signInForm.showAlert(AlertType.Danger, Translation.Page.Shared.FormMessage.badConnection);
		});
	}
}
