import { IFormProps } from './IFormProps';
import { RegisterDto } from '../../../DTO/RegisterDto';

export interface IRegisterProps extends IFormProps {
	onSubmit: (model: RegisterDto) => void;
}
