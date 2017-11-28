import { Moment } from 'moment';

export interface IEditTaskFormState {
	title: string;
	description: string;
	isDeadlineExist: boolean;
	deadline: Moment;
	isDone: boolean;
	isImportant: boolean;
}
