import * as React from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import '../sass/app.sass';
import { Memory } from '../Memory';

export class App extends React.Component {
	public render(): JSX.Element {
		return (
			<div className='app'>
				<Header menu={Menu}/>
				<div className='content' id='content'>
					<div>{Memory.token}</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
