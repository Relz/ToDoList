import * as React from 'react';
import { IButtonProps } from '../Props/IButtonProps';
import { Utils } from '../../Utils/Utils';
import * as classNames from 'classnames';

export class Button extends React.Component<IButtonProps, {}> {
	public render(): JSX.Element {
		const disabled: boolean = (this.props.disabled === undefined) ? false : this.props.disabled;
		const classes: any = classNames({
			button: true,
			enabled: !disabled,
			disabled: disabled
		});

		return (
			<button
				className={classes + Utils.toClassNames(
					this.props.type,
					this.props.size
				)}
				disabled={disabled}
			>
				{this.props.children}
			</button>
		);
	}
}
