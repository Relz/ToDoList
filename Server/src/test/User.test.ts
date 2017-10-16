
import { expect } from 'chai';
import { User } from '../ts/User';

describe('User class', () => {
	const user: User = new User();

	it('has id property, undefined by default', () => {
		expect(user.id).to.be.equal(undefined);
	});

	it('has login property, undefined by default', () => {
		expect(user.login).to.be.equal(undefined);
	});

	it('has password property, undefined by default', () => {
		expect(user.password).to.be.equal(undefined);
	});

	it('has name property, undefined by default', () => {
		expect(user.name).to.be.equal(undefined);
	});
});
