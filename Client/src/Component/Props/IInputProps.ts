import { IDisableable } from './IDisableable';
import { InputType } from '../Input/InputType';

export interface IInputProps extends IDisableable {
	type: InputType;
}
