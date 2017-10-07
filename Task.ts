export class Task {
	private _id: number;
	private _title: string;
	private _description: string;
	private _creationDate: Date;
	private _deadline: Date;
	private _isDone: boolean;
	private _userId: number;

	get id(): number {
		return this._id;
	}

	set id(value: number) {
		this._id = value;
	}

	get title(): string {
		return this._title;
	}

	set title(value: string) {
		this._title = value;
	}

	get description(): string {
		return this._description;
	}

	set description(value: string) {
		this._description = value;
	}

	get creationDate(): Date {
		return this._creationDate;
	}

	set creationDate(value: Date) {
		this._creationDate = value;
	}

	get deadline(): Date {
		return this._deadline;
	}

	set deadline(value: Date) {
		this._deadline = value;
	}

	get isDone(): boolean {
		return this._isDone;
	}

	set isDone(value: boolean) {
		this._isDone = value;
	}

	get userId(): number {
		return this._userId;
	}

	set userId(value: number) {
		this._userId = value;
	}
}
