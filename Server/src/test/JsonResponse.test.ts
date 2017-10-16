
import { expect } from 'chai';
import { JsonResponse } from '../ts/JsonResponse';

describe('JsonResponse class', () => {
	const jsonResponse: JsonResponse = new JsonResponse();

	describe('has responseCode property', () => {
		it('undefined by default', () => {
			expect(jsonResponse.responseCode).to.be.undefined;
		});
		it('with simple setter', () => {
			jsonResponse.responseCode = 1;
			expect(jsonResponse.responseCode).to.be.equal(1);
		});
	});

	describe('has response property', () => {
		it('undefined by default', () => {
			expect(jsonResponse.response).to.be.undefined;
		});
		it('with simple setter', () => {
			const response: any = {
				a: 123,
				b: 'word'
			};
			jsonResponse.response = response;
			expect(jsonResponse.response).to.be.equal(response);
		});
	});
});
