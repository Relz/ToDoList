import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Constant } from '../Constant';
import { Translation } from '../translation/ru';
import { Button } from '../Component/Button/Button';
import { ButtonType } from '../Component/Button/ButtonType';
import { ButtonSize } from '../Component/Button/ButtonSize';
import { Memory } from '../Memory';

export class Menu extends React.Component {
	public render(): JSX.Element {
		return (
			<ul className='menu'>
				{Menu.getMenu()}
			</ul>
		);
	}

	private static getMenu(): JSX.Element[] {
		if (Memory.token === undefined) {
			return [
				<li key='sign_in' className='item'>
					<NavLink to={Constant.Path.signIn}>{Translation.Menu.login}</NavLink>
				</li>,
				<li key='register' className='item'>
					<NavLink to={Constant.Path.register}>{Translation.Menu.register}</NavLink>
				</li>
			];
		}
		return [
			<li key='newTaskBtn' className='item'>
				<Button
					type={ButtonType.Success}
					size={ButtonSize.Medium}
					onClick={() => window.location.href = Constant.Path.createTask}
				>
					{Translation.Menu.createTask}
				</Button>
			</li>,
			<li key='tasks' className='item'>
				<NavLink to={Constant.Path.tasks} activeClassName="active">{Translation.Menu.tasks}</NavLink>
			</li>,
			<li key='account' className='item'>
				<NavLink to={Constant.Path.account} activeClassName="active">{Translation.Menu.account}</NavLink>
			</li>,
			<li key='sign_out' className='item'>
				<NavLink to={Constant.Path.signIn} onClick={Menu.signOut}>{Translation.Menu.logout}</NavLink>
			</li>
		];
	}

	private static signOut(): void {
		Memory.cleanup();
		window.location.reload();
	}
}
