import * as React from 'react';
import { IButtonProps } from '../Props/IButtonProps';
import { ButtonType } from './ButtonType';
import { ButtonSize } from './ButtonSize';
import * as classNames from 'classnames';

export class Button extends React.Component<IButtonProps, {}> {
	public render(): JSX.Element {
		const classes: any = classNames({
			button: true,
			basic: this.props.type === ButtonType.Basic,
			default: this.props.type === ButtonType.Default,
			primary: this.props.type === ButtonType.Primary,
			success: this.props.type === ButtonType.Success,
			info: this.props.type === ButtonType.Info,
			warning: this.props.type === ButtonType.Warning,
			danger: this.props.type === ButtonType.Danger,
			link: this.props.type === ButtonType.Link,

			extra_small: this.props.size === ButtonSize.ExtraSmall,
			small: this.props.size === ButtonSize.Small,
			medium: this.props.size === ButtonSize.Medium,
			large: this.props.size === ButtonSize.Large,

			enabled: (this.props.disabled === undefined) ? true : !this.props.disabled,
			disabled: (this.props.disabled === undefined) ? false : this.props.disabled
		});

		return (
			<button
				className={classes}
			>
				{this.props.children}
			</button>
		);
	}
}
