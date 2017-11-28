import { IFormProps } from './IFormProps';
import { RegisterDto } from '../../../Dto/RegisterDto';

export interface IRegisterProps extends IFormProps {
	onSubmit: (model: RegisterDto) => void;
}
