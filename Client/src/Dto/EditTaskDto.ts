import { Moment } from 'moment';

export class EditTaskDto {
	public id: string;
	public title: string;
	public description: string;
	public isDeadlineExist: boolean = false;
	public isDone: boolean;
	public isImportant: boolean;
	public deadline: Moment;
}
