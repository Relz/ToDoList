import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';
import { IDisableable } from './IDisableable';

export interface IButtonProps extends IDisableable {
	type: ButtonType;
	size: ButtonSize;
}
