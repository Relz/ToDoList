import * as React from 'react';
import { Header } from './Header';
import { Menu } from './Menu';
import '../sass/app.sass';

export class App extends React.Component {
	public render(): JSX.Element {
		return (
			<div className='app'>
				<Header menu={Menu}/>
				<div className='content' id='content'>
					<div>{localStorage.getItem('token')}</div>
					{this.props.children}
				</div>
			</div>
		);
	}
}
