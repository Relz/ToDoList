import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';

export interface IButtonProps {
	type: ButtonType;
	size: ButtonSize;
	disabled?: boolean;
}
