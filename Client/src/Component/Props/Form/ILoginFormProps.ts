import { IFormProps } from './IFormProps';

export interface ILoginFormProps extends IFormProps {
	onSubmit: (login: string, password: string) => void;
}
