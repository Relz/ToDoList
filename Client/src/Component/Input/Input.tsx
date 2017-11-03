import * as React from 'react';
import * as classNames from 'classnames';
import { IInputProps } from '../Props/IInputProps';
import { InputType } from './InputType';
import { InputTypeUtils } from './InputTypeUtils';

export class Input extends React.Component<IInputProps, {}> {
	public render(): JSX.Element {
		const disabled: boolean = (this.props.disabled === undefined) ? false : this.props.disabled;
		const classes: any = classNames({
			'form-control': true,
			enabled: !disabled,
			disabled: disabled
		});
		const inputType: InputType = this.props.type;

		return (
			<input
				className={classes}
				type={inputType.toString()}
				disabled={disabled}
				pattern={InputTypeUtils.getPattern(inputType)}
			>
				{this.props.children}
			</input>
		);
	}
}
