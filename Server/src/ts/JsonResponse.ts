export class JsonResponse {
	private _responseCode: number;
	private _response: Object;

	public get responseCode(): number {
		return this._responseCode;
	}

	public set responseCode(value: number) {
		this._responseCode = value;
	}

	public get response(): Object {
		return this._response;
	}

	public set response(value: Object) {
		this._response = value;
	}
}
