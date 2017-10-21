export class JsonResponse {
	private _responseCode: number;
	private _response: Object;

	constructor()
	constructor(responseCode: number, response: Object)
	constructor(responseCode: number, response?: Object)
	constructor(responseCode?: number, response?: Object) {
		this._responseCode = responseCode;
		this._response = response;
	}

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
