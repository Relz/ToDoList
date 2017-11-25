import { InputType } from '../Input/InputType';
import { IChangeable } from './IChangeable';

export interface IInputProps extends IChangeable {
	type: InputType;
	value?: string;
	placeholder?: string;
}
