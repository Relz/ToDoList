export class Task {
	private _id: number;
	private _title: string;
	private _description: string;
	private _creationDate: number;
	private _deadline: number;
	private _isDone: boolean;
	private _userId: number;

	constructor()
	constructor(
		id: number,
		title: string,
		description: string,
		creationDate: number,
		deadline: number,
		isDone: boolean,
		userId: number
	)
	constructor(
		id?: number,
		title?: string,
		description?: string,
		creationDate?: number,
		deadline?: number,
		isDone?: boolean,
		userId?: number
	) {
		this._id = id;
		this._title = title;
		this._description = description;
		this._creationDate = creationDate;
		this._deadline = deadline;
		this._isDone = isDone;
		this._userId = userId;
	}

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

	public get creationDate(): number {
		return this._creationDate;
	}

	public set creationDate(value: number) {
		this._creationDate = value;
	}

	public get deadline(): number {
		return this._deadline;
	}

	public set deadline(value: number) {
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
