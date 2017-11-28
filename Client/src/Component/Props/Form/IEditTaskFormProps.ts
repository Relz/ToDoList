import { IFormProps } from './IFormProps';
import { TaskDto } from '../../../Dto/TaskDto';

export interface IEditTaskFormProps extends IFormProps<TaskDto> {
	task?: TaskDto;
}
