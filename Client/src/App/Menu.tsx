import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Constant } from '../Constant';
import { Translation } from '../translation/ru';
import { Button } from '../Component/Button/Button';
import { ButtonType } from '../Component/Button/ButtonType';
import { ButtonSize } from '../Component/Button/ButtonSize';

export class Menu extends React.Component {
	public render(): JSX.Element {
		return (
			<ul className='menu'>
				{Menu.getMenu()}
			</ul>
		);
	}

	private static getMenu(): JSX.Element[] {
		if (localStorage.getItem('token') === null) {
			return [
				<li key='signIn' className='item'>
					<NavLink to={Constant.Path.signIn}>{Translation.Menu.login}</NavLink>
				</li>,
				<li key='register' className='item'>
					<NavLink to={Constant.Path.register}>{Translation.Menu.register}</NavLink>
				</li>
			];
		} else {
			return [
				<li key='account' className='item'>
					<NavLink to={Constant.Path.account}>Привет, пользователь!</NavLink>
				</li>,
				<li key='signOut' className='item'>
					<Button
						type={ButtonType.Danger}
						size={ButtonSize.Medium}
						onClick={this.signOut}
					>
						{Translation.Menu.logout}
					</Button>
				</li>
			];
		}
	}

	private static signOut(): void {
		localStorage.removeItem(Constant.tokenKey);
		window.location.reload();
	}
}
