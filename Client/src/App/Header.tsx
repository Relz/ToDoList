import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Translation } from '../translation/ru';

const logo: string = require('../img/logo.svg');

export class Header extends React.Component<{ menu: any }, any> {
	public render(): JSX.Element {
		const Menu: any = this.props.menu;
		return (
			<div className='header'>
				<NavLink to='/' className='logo'>
					<img src={logo} className='image' alt={Translation.Alt.logo}/>
					<h1 className='text'>{Translation.pageHeader}</h1>
				</NavLink>
				<Menu/>
			</div>
		);
	}
}
