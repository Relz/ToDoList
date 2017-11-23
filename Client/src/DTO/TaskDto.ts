export class TaskDto {
	private _title: string;
	private _description: string;
	private _isDeadlineExist: boolean;
	private _deadLine: string;

	public get title(): string {
		return this._title;
	}

	public set title(value: string) {
		this._title = value;
	}

	public get description(): string {
		return this._description;
	}

	public set description(value: string) {
		this._description = value;
	}

	public get isDeadlineExist(): boolean {
		return this._isDeadlineExist;
	}

	public set isDeadlineExist(value: boolean) {
		this._isDeadlineExist = value;
	}

	public get deadLine(): string {
		return this._deadLine;
	}

	public set deadLine(value: string) {
		this._deadLine = value;
	}
}
