import './sass/index.sass';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from './App/App';
import { ComponentsDemoPage } from './ComponentsDemo/ComponentsDemoPage';
import { Page404 } from './Page404';
import { Register } from './App/Register';

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path='/components_demo' component={ComponentsDemoPage}/>
			<App>
				<Switch>
					<Route path='/register' component={Register}/>
					<Route component={Page404}/>
				</Switch>
			</App>
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
