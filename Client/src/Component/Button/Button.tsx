import * as React from 'react';
import { IButtonProps } from '../Props/IButtonProps';
import { ButtonType } from './ButtonType';
import * as classNames from 'classnames';
import { IButtonState } from '../State/IButtonState';
import { Utils } from '../../Utils/Utils';

export class Button extends React.Component<IButtonProps, IButtonState> {
	public constructor() {
		super();
		this.state = { type: ButtonType.Basic };
	}

	public componentDidMount(): void {
		if (this.props.onRef) {
			this.props.onRef(this);
		}
		this.setState({ type: this.props.type });
	}

	public componentWillUnmount(): void {
		if (this.props.onRef) {
			this.props.onRef(undefined);
		}
	}

	public render(): JSX.Element {
		const disabled: boolean = (this.props.disabled === undefined) ? false : this.props.disabled;
		const classes: string = classNames({
			button: true,
			stretch: true,

			enabled: !disabled,
			disabled: disabled
		});

		let onClick: (() => void) | undefined = this.props.onClick;
		if (!onClick) {
			onClick = () => undefined;
		}

		return (
			<button
				className={classes + Utils.toClassNames(
					this.state.type,
					this.props.size
				)}
				disabled={disabled}
				onClick={onClick}
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
}
