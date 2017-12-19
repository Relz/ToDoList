import { Task } from '../Task/Task';

export interface ITaskProp {
	id: number;
	token: string;
	title: string;
	description: string;
	deadline: string | undefined;
	isImportant: boolean;
	isDone: boolean;
	onRemove: (task: Task) => void;
	onDoneChanged: (isDone: boolean) => void;
}
