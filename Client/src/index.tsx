import './sass/index.sass';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { App } from './App/App';
import { ComponentsDemoPage } from './ComponentsDemo/ComponentsDemoPage';
import { Page404 } from './Page404';
import { Register } from './App/Register';
import { SignIn } from './App/SignIn';
import { Account } from './App/Account';
import { Constant } from './Constant';
import { Tasks } from './App/Tasks';
import { EditTask } from './App/EditTask';
import ComponentType = React.ComponentType;
import { Memory } from './Memory';

const getComponent:() => ComponentType = () => {
	return (Memory.token === undefined) ? SignIn : Tasks;
}

ReactDOM.render(
	<BrowserRouter>
		<Switch>
			<Route path='/components_demo' component={ComponentsDemoPage}/>
			<App>
				<Switch>
					<Route path={Constant.Path.signIn} component={SignIn}/>
					<Route path={Constant.Path.register} component={Register}/>
					<Route path={Constant.Path.account} component={Account}/>
					<Route path={Constant.Path.tasks} component={Tasks}/>
					<Route path={Constant.Path.editTask} component={EditTask}/>
					<Route path={Constant.Path.demo} component={ComponentsDemoPage}/>
					<Route path={Constant.Path.index} component={getComponent()}/>
					<Route component={Page404}/>
				</Switch>
			</App>
		</Switch>
	</BrowserRouter>,
	document.getElementById('root')
);
