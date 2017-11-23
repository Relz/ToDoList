import { IFormProps } from './IFormProps';
import { RegisterDto } from '../../../DTO/RegisterDto';

export interface IRegisterProperties extends IFormProps {
	onSubmit: (model: RegisterDto) => void;
}
