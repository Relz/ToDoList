import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';
import { IDisableable } from './IDisableable';
import { IClickable } from "./IClickable";
import { IReferable } from './IReferable';

export interface IButtonProps extends IDisableable, IClickable, IReferable {
	type: ButtonType;
	size: ButtonSize;
}
