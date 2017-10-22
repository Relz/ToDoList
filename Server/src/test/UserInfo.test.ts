
import { expect } from 'chai';
import { UserInfo } from '../ts/UserInfo';

describe('UserInfo class', () => {

	describe('has constructor', () => {
		it('empty, does nothing', () => {
			const userInfo: UserInfo = new UserInfo();
			expect(userInfo.login).to.be.undefined;
			expect(userInfo.name).to.be.undefined;
		});
		it('with parameters, sets all properties', () => {
			const userInfo: UserInfo = new UserInfo('UserLogin', 'UserName');
			expect(userInfo.login).to.be.equal('UserLogin');
			expect(userInfo.name).to.be.equal('UserName');
		});
	});

	const userInfo: UserInfo = new UserInfo();

	describe('has login property', () => {
		it('undefined by default', () => {
			expect(userInfo.login).to.be.undefined;
		});
		it('with simple setter', () => {
			userInfo.login = 'UserLogin';
			expect(userInfo.login).to.be.equal('UserLogin');
		});
	});

	describe('has name property', () => {
		it('undefined by default', () => {
			expect(userInfo.name).to.be.undefined;
		});
		it('with simple setter', () => {
			userInfo.name = 'UserName';
			expect(userInfo.name).to.be.equal('UserName');
		});
	});
});
