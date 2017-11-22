import * as React from 'react';
import { LoginForm } from '../../Component/Form/LoginForm'

export class FormDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<LoginForm
				onSubmit={(login: string, password: string): void => {
					alert('Login: ' + login +'\n' + 'Password: ' + password);
				}}
			></LoginForm>
		);
	}
}
