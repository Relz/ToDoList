import * as React from 'react';
import * as classNames from 'classnames';
import { ILoadingSpinnerProps } from '../Props/ILoadingSpinnerProps';
import { ILoadingSpinnerState } from '../State/ILoadingSpinnerState';
import { Translation } from '../../translation/ru';

const logo: string = require('../../img/logo.svg');

export class LoadingSpinner extends React.Component<ILoadingSpinnerProps, ILoadingSpinnerState> {
	public constructor(props: ILoadingSpinnerProps) {
		super(props);
		this.state = { active: this.props.active !== undefined && this.props.active };
	}

	public render(): JSX.Element {
		const classes: any = classNames({
			loading_spinner: true,
			active: (this.state.active === undefined) ? false : this.state.active
		});

		return (
			<img src={logo} className={classes} alt={Translation.Alt.loadingSpinner}/>
		);
	}

	public getActive(): boolean {
		return this.state.active;
	}

	public setActive(value: boolean, callback: () => void): void {
		this.setState({ active: value }, callback);
	}
}
