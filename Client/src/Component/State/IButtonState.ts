import { ButtonType } from '../Button/ButtonType';
import { IDisableable } from './IDisableable';

export interface IButtonState extends IDisableable {
	type: ButtonType;
	disabled: boolean;
}
