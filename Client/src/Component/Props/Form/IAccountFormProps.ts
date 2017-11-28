import { IFormProps } from './IFormProps';
import { AccountDto } from '../../../DTO/AccountDto';

export interface IAccountFormProps extends IFormProps<AccountDto> {
	login?: string;
	name?: string;
	password?: string;
	newPassword?: string;
}
