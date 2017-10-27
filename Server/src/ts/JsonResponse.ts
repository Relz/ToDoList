import { ResponseCode } from './ResponseCode';
import * as HttpStatusCode from 'http-status-codes';

export class JsonResponse {
	private _code: ResponseCode;
	private _body: Object;

	constructor(responseCode?: ResponseCode, response?: Object) {
		this._code = responseCode;
		this._body = response;
	}

	public get httpStatus(): number {
		if (this._code == ResponseCode.OK) {
			return HttpStatusCode.OK;
		}
		if (this._code == ResponseCode.BAD_BODY ||
			this._code == ResponseCode.BAD_TOKEN ||
			this._code == ResponseCode.WRONG_LOGIN ||
			this._code == ResponseCode.WRONG_PASSWORD ||
			this._code == ResponseCode.WRONG_ID) {
			return HttpStatusCode.BAD_REQUEST;
		}
		return HttpStatusCode.INTERNAL_SERVER_ERROR;
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
