import { AlertType } from '../Alert/AlertType';

export interface IAlertState {
	type: AlertType;
	message: string;
	visible: boolean;
}
