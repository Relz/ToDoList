import { ResponseCode } from './ResponseCode';

export class JsonResponse {
	private _code: ResponseCode;
	private _body: Object;

	constructor(responseCode?: ResponseCode, response?: Object) {
		this._code = responseCode;
		this._body = response;
	}

	public get code(): ResponseCode {
		return this._code;
	}

	public set code(value: ResponseCode) {
		this._code = value;
	}

	public get body(): Object {
		return this._body;
	}

	public set body(value: Object) {
		this._body = value;
	}
}
