import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Translation } from './translation/ru';
import './sass/page_404.sass';

export class Page404 extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div className='page_not_found'>
				<span className='error_code'>{Translation.Page404.errorCode}</span>
				<h1 className='error_text'>{Translation.Page404.header}</h1>
				<NavLink to='/' className='back_to_main_page'>
					<span>{Translation.Page404.backToMainPage}</span>
				</NavLink>
			</div>
		);
	}
}
