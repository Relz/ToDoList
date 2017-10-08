export class JsonResponce {
	private _responceCode: number;
	private _responce: Object;

	public get responceCode(): number {
		return this._responceCode;
	}

	public set responceCode(value: number){
		this._responceCode = value;
	}

	public get responce(): Object {
		return this._responce;
	}

	public set responce(value: Object){
		this._responce = value;
	}
}
