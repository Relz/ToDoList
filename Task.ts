export class Task {
	private _id: number;
	private _title: string;
	private _description: string;
	private _creationDate: Date;
	private _deadline: Date;
	private _isDone: boolean;
	private _userId: number;

	public get id(): number {
		return this._id;
	}

	public set id(value: number) {
		this._id = value;
	}

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

	public get creationDate(): Date {
		return this._creationDate;
	}

	public set creationDate(value: Date) {
		this._creationDate = value;
	}

	public get deadline(): Date {
		return this._deadline;
	}

	public set deadline(value: Date) {
		this._deadline = value;
	}

	public get isDone(): boolean {
		return this._isDone;
	}

	public set isDone(value: boolean) {
		this._isDone = value;
	}

	public get userId(): number {
		return this._userId;
	}

	public set userId(value: number) {
		this._userId = value;
	}
}
