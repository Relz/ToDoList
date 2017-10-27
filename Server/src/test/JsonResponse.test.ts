import { expect } from 'chai';
import { JsonResponse } from '../ts/JsonResponse';

describe('JsonResponse class', () => {
	describe('has constructor', () => {
		it('empty, does nothing', () => {
			const jsonResponse: JsonResponse = new JsonResponse();
			expect(jsonResponse.code).to.be.undefined;
			expect(jsonResponse.body).to.be.undefined;
		});
		it('with parameters, sets all properties', () => {
			const jsonResponse: JsonResponse = new JsonResponse(0, {});
			expect(jsonResponse.code).to.be.equal(0);
			expect(jsonResponse.body.toString()).to.be.equals({}.toString());
		});
	});

	const jsonResponse: JsonResponse = new JsonResponse();

	describe('has code property', () => {
		it('undefined by default', () => {
			expect(jsonResponse.code).to.be.undefined;
		});
		it('with simple setter', () => {
			jsonResponse.code = 1;
			expect(jsonResponse.code).to.be.equal(1);
		});
	});

	describe('has body property', () => {
		it('undefined by default', () => {
			expect(jsonResponse.body).to.be.undefined;
		});
		it('with simple setter', () => {
			const response: any = {
				a: 123,
				b: 'word'
			};
			jsonResponse.body = response;
			expect(jsonResponse.body).to.be.equal(response);
		});
	});
});
