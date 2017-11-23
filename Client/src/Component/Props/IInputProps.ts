import { IDisableable } from './IDisableable';
import { InputType } from '../Input/InputType';
import { IChangeable } from './IChangeable';
import { IReferable } from './IReferable';

export interface IInputProps extends IDisableable, IChangeable, IReferable {
	type: InputType;
	value?: string | undefined;
}
