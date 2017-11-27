import * as React from 'react';
import { Alert } from '../../Component/Alert/Alert';
import { AlertType } from '../../Component/Alert/AlertType';

export class AlertDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<Alert
					type={AlertType.Success}
					message={'Великолепно!'}
				/>
				<Alert
					type={AlertType.Info}
					message={'Довожу до вашего сведения...'}
				/>
				<Alert
					type={AlertType.Warning}
					message={'Прошу обратить внимание!'}
				/>
				<Alert
					type={AlertType.Danger}
					message={'Произошёл некий казус...'}
				/>
			</div>
		);
	}
}
