import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Translation } from '../translation/ru';
import { IHeaderProps } from './Props/IHeaderProps';
import { Constant } from '../Constant';

const logo: string = require('../img/logo.png');

export class Header extends React.Component<IHeaderProps, {}> {
	public render(): JSX.Element {
		const Menu: React.ComponentType = this.props.menu;
		return (
			<div className='header'>
				<NavLink to={Constant.Path.tasks} className='logo'>
					<img src={logo} className='image' alt={Translation.Alt.logo}/>
					<h1 className='text'>{Translation.pageHeader}</h1>
				</NavLink>
				<Menu/>
			</div>
		);
	}
}
