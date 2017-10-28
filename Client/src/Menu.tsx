import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Constant } from './Constant';
import { Translation } from './translation/ru';

export class Menu extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<ul className='menu'>
				<li className='item'>
					<NavLink to={Constant.Path.login}>{Translation.Menu.login}</NavLink>
				</li>
				<li className='item'>
					<NavLink to={Constant.Path.register}>{Translation.Menu.register}</NavLink>
				</li>
			</ul>
		);
	}
}
