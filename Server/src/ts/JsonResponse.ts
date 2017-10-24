import { ResponseCode } from './ResponseCode';

export class JsonResponse {
	private _responseCode: ResponseCode;
	private _response: Object;

	constructor(responseCode?: ResponseCode, response?: Object) {
		this._responseCode = responseCode;
		this._response = response;
	}

	public get responseCode(): ResponseCode {
		return this._responseCode;
	}

	public set responseCode(value: ResponseCode) {
		this._responseCode = value;
	}

	public get response(): Object {
		return this._response;
	}

	public set response(value: Object) {
		this._response = value;
	}
}
