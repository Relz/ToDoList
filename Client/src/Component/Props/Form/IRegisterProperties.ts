import { IFormProps } from './IFormProps';

export interface IRegisterProperties extends IFormProps {
	onSubmit: (login: string, password: string, name: string) => void;
}
