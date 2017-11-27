import { AlertType } from '../Alert/AlertType';

export interface IAlertProps {
	type?: AlertType;
	message?: string;
	visible?: boolean;
}
