import { expect } from 'chai';
import { User } from '../ts/User';

describe('User class', () => {
	describe('has constructor', () => {
		it('empty, does nothing', () => {
			const user: User = new User();
			expect(user.id).to.be.undefined;
			expect(user.login).to.be.undefined;
			expect(user.password).to.be.undefined;
			expect(user.name).to.be.undefined;
		});
		it('with parameters, sets all properties', () => {
			const user: User = new User(1, 'signIn', 'password', 'name');
			expect(user.id).to.be.equal(1);
			expect(user.login).to.be.equal('signIn');
			expect(user.password).to.be.equal('password');
			expect(user.name).to.be.equal('name');
		});
	});

	const user: User = new User();

	describe('has id property', () => {
		it('undefined by default', () => {
			expect(user.id).to.be.undefined;
		});
		it('with simple setter', () => {
			user.id = 1;
			expect(user.id).to.be.equal(1);
		});
	});

	describe('has signIn property', () => {
		it('undefined by default', () => {
			expect(user.login).to.be.undefined;
		});
		it('with simple setter', () => {
			user.login = 'UserLogin';
			expect(user.login).to.be.equal('UserLogin');
		});
	});

	describe('has password property', () => {
		it('undefined by default', () => {
			expect(user.password).to.be.undefined;
		});
		it('with simple setter', () => {
			user.password = 'UserPassword';
			expect(user.password).to.be.equal('UserPassword');
		});
	});

	describe('has name property', () => {
		it('undefined by default', () => {
			expect(user.name).to.be.undefined;
		});
		it('with simple setter', () => {
			user.name = 'UserName';
			expect(user.name).to.be.equal('UserName');
		});
	});
});
