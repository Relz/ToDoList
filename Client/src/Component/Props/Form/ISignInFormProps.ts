import { IFormProps } from './IFormProps';
import { SignInDto } from '../../../Dto/SignInDto';

export interface ISignInFormProps extends IFormProps {
	onSubmit: (model: SignInDto) => void;
}
