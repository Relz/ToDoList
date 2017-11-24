import * as React from 'react';
import { IButtonProps } from '../Props/IButtonProps';
import { ButtonType } from './ButtonType';
import * as classNames from 'classnames';
import { IButtonState } from '../State/IButtonState';
import { Utils } from '../../Utils/Utils';

export class Button extends React.Component<IButtonProps, IButtonState> {
	private _onClick: (() => void) | undefined;

	public constructor(props: IButtonProps) {
		super(props);
		this._onClick = this.props.onClick ? this.props.onClick : () => undefined;
		this.state = { type: this.props.type, disabled: false };
	}

	public componentWillUnmount(): void {
		if (this.props.onRef) {
			this.props.onRef(undefined);
		}
	}

	public render(): JSX.Element {
		const classes: string = classNames({
			button: true,
			stretch: true,

			enabled: !this.state.disabled,
			disabled: this.state.disabled
		});

		return (
			<button
				className={classes + Utils.toClassNames(
					this.state.type,
					this.props.size
				)}
				disabled={this.state.disabled}
				onClick={this._onClick}
			>
				{this.props.children}
			</button>
		);
	}

	public get type(): ButtonType {
		return this.state.type;
	}

	public set type(value: ButtonType) {
		this.setState({ type: value });
	}

	public get disabled(): boolean {
		return this.state.disabled;
	}

	public set disabled(value: boolean) {
		this.setState({ disabled: value });
	}
}
