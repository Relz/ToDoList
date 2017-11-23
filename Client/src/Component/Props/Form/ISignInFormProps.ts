import { IFormProps } from './IFormProps';
import { SignInDto } from '../../../DTO/SignInDto';

export interface ISignInFormProps extends IFormProps {
	onSubmit: (model: SignInDto) => void;
}
