import { IFormProps } from './IFormProps';
import { TaskDto } from '../../../Dto/TaskDto';

export interface IEditTaskFormProps extends IFormProps {
	onSubmit: (task: TaskDto) => void;
	task?: TaskDto;
	title: string;
	buttonTitle: string;
}
