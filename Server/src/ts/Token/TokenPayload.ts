export class TokenPayload {
	constructor(id: number) {
		this._id = id;
	}

	private _id: number;
	public get id(): number {
		return this._id;
	}

	public toObject(): object {
		return { id: this._id };
	}
}
