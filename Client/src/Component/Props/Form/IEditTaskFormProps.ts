import { IFormProps } from './IFormProps';
import { EditTaskDto } from '../../../Dto/EditTaskDto';

export interface IEditTaskFormProps extends IFormProps<EditTaskDto> {
	task?: EditTaskDto;
}
