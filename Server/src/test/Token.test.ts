import { expect } from 'chai';
import { Token } from '../ts/Token/Token';

describe('Token class', () => {
	const id: number = 1337;
	const invalidToken: string = 'invalid_token';
	let token: string;
	describe('createFromId(id: number)', () => {
		it('creates token from id', () => {
			expect(() => { token = Token.createFromId(id); }).not.to.throw();
			expect(token).not.to.be.undefined;
		});
	});
	describe('decodeId(token: string)', () => {
		it('returns id decoded from token', () => {
			let decodedId: number = 0;
			expect(() => { decodedId = Token.decodeId(token); }).not.to.throw();
			expect(decodedId).to.be.equal(id);
		});
		it('returns undefined on invalid token', () => {
			let decodedId: number = 0;
			expect(() => { decodedId = Token.decodeId(invalidToken); }).not.to.throw();
			expect(decodedId).to.be.undefined;
		});
	});
});
