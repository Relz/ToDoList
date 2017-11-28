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
				<li className='item'>
					<NavLink to={Constant.Path.signIn}>{Translation.Menu.login}</NavLink>
				</li>,
				<li className='item'>
					<NavLink to={Constant.Path.register}>{Translation.Menu.register}</NavLink>
				</li>
			];
		} else {
			return [
				<li className='item'>
					<NavLink to={Constant.Path.signIn}>Привет, пользователь!</NavLink>
				</li>,
				<li className='item'>
					<Button
						type={ButtonType.Danger}
						size={ButtonSize.Medium}
						onClick={this.logout}
					>
						{Translation.Menu.logout}
					</Button>
				</li>
			];
		}
	}

	private static logout(): void {
		localStorage.removeItem(Constant.tokenKey);
		window.location.reload();
	}
}
