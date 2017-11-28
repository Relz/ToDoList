export class TaskDto {
	public id: number;
	public title: string;
	public description: string;
	public creationDate: number;
	public deadline: string | undefined;
	public isDone: boolean;
	public isImportant: boolean;
	public userId: number;
}
