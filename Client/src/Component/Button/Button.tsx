import * as React from 'react';
import { IButtonProps } from '../Props/IButtonProps';
import { ButtonType } from './ButtonType';
import { ButtonSize } from './ButtonSize';
import * as classNames from 'classnames';
import { IButtonState } from '../State/IButtonState';

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
			basic: this.state.type === ButtonType.Basic,
			default: this.state.type === ButtonType.Default,
			primary: this.state.type === ButtonType.Primary,
			success: this.state.type === ButtonType.Success,
			info: this.state.type === ButtonType.Info,
			warning: this.state.type === ButtonType.Warning,
			danger: this.state.type === ButtonType.Danger,
			link: this.state.type === ButtonType.Link,

			extra_small: this.props.size === ButtonSize.ExtraSmall,
			small: this.props.size === ButtonSize.Small,
			medium: this.props.size === ButtonSize.Medium,
			large: this.props.size === ButtonSize.Large,

			enabled: !disabled,
			disabled: disabled
		});

		let onClick: (() => void) | undefined = this.props.onClick;
		if (!onClick) {
			onClick = () => undefined;
		}

		return (
			<button
				className={classes}
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
