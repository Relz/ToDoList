import { expect } from 'chai';
import { Token } from '../ts/Token/Token';

describe('Token class', () => {
	const id: number = 1337;
	let token: string;
	it('can create token', () => {
		expect(token = Token.createFromId(id)).not.to.throw;
		expect(token).not.to.be.undefined.and.not.to.be.empty;
	});
	it('can decode id', () => {
		let decodedId: number;
		expect(decodedId = Token.decodeId(token)).not.to.throw;
		expect(decodedId).to.be.equal(id);
	});
});
