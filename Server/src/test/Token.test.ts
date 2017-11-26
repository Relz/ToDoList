import { expect } from 'chai';
import { Token } from '../ts/Token/Token';

describe('Token class', () => {
	const id: number = 1337;
	const invalidToken: string = 'invalid_token';
	let token: string;
	describe('createFromId(id: number)', () => {
		it('creates token from id', () => {
			expect(() => { Token.createFromId(id); }).not.to.throw();
			token = Token.createFromId(id);
			expect(token).not.to.be.undefined;
		});
	});
	describe('decodeId(token: string)', () => {
		it('returns id decoded from token', () => {
			expect(() => { Token.decodeId(token); }).not.to.throw();
			const decodedId: number = Token.decodeId(token);
			expect(decodedId).to.be.equal(id);
		});
		it('throws error on invalid token', () => {
			expect(() => { Token.decodeId(invalidToken); }).to.throw();
		});
	});
});
