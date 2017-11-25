import { IFormProps } from './IFormProps';
import { TaskDto } from '../../../DTO/TaskDto';

export interface IEditTaskFormProps extends IFormProps {
	onSubmit: (task: TaskDto) => void;
	task?: TaskDto;
	title: string;
	buttonTitle: string;
}
