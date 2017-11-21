import './sass/index.sass';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from './App/App';
import { ComponentsDemoPage } from './ComponentsDemo/ComponentsDemoPage';
import { Page404 } from './Page404';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={App}/>
			<Route exact path='/components_demo' component={ComponentsDemoPage}/>
			<Route component={Page404}/>
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
