import * as React from 'react';
import { Utils } from '../../Utils/Utils';
import { IAlertState } from '../State/IAlertState';
import { IAlertProps } from '../Props/IAlertProps';
import { AlertType } from './AlertType';
import * as classNames from 'classnames';

export class Alert extends React.Component<IAlertProps, IAlertState> {
	public constructor(props: IAlertProps) {
		super(props);
		this.state = {
			type: this.props.type !== undefined ? this.props.type : AlertType.Info,
			message: this.props.message !== undefined ? this.props.message : '',
			visible: this.props.visible !== undefined ? this.props.visible : true
		};
	}

	public render(): JSX.Element {
		const classes: string = classNames({
			alert: true,
			hidden: !this.state.visible
		});
		return (
			<div
				className={classes + Utils.toClassNames(
					this.state.type
				)}
			>
				{this.state.message}
			</div>
		);
	}

	public get type(): AlertType {
		return this.state.type;
	}

	public set type(value: AlertType) {
		this.setState({ type: value });
	}

	public get message(): string {
		return this.state.message;
	}

	public set message(value: string) {
		this.setState({ message: value });
	}

	public get visible(): boolean {
		return this.state.visible;
	}

	public set visible(value: boolean) {
		this.setState({ visible: value });
	}
}
