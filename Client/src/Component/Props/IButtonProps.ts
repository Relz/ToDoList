import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';
import { IClickable } from './IClickable';

export interface IButtonProps extends IClickable {
	type: ButtonType;
	size: ButtonSize;
}
