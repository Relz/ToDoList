import { ResponseCode } from './ResponseCode';
import * as HttpStatusCode from 'http-status-codes';

export class JsonResponse {
	private _code: ResponseCode;
	private _body: object;

	constructor(responseCode?: ResponseCode, response?: object) {
		this._code = responseCode;
		this._body = response;
	}

	public get httpStatus(): number {
		switch (this._code) {
			case ResponseCode.OK:
				return HttpStatusCode.OK;
			case ResponseCode.BAD_TOKEN:
			case ResponseCode.BAD_BODY:
			case ResponseCode.WRONG_ID:
			case ResponseCode.WRONG_LOGIN:
			case ResponseCode.WRONG_PASSWORD:
				return HttpStatusCode.BAD_REQUEST;
			default:
				return HttpStatusCode.INTERNAL_SERVER_ERROR;
		}
	}

	public get code(): ResponseCode {
		return this._code;
	}

	public set code(value: ResponseCode) {
		this._code = value;
	}

	public get body(): object {
		return this._body;
	}

	public set body(value: object) {
		this._body = value;
	}

	public jsonString(): string {
		return JSON.stringify({
			code: this._code,
			body: this._body
		});
	}
}
