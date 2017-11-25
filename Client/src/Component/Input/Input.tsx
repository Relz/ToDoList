import * as React from 'react';
import * as classNames from 'classnames';
import { IInputProps } from '../Props/IInputProps';
import { InputType } from './InputType';
import { InputTypeUtils } from './InputTypeUtils';
import { IInputState } from '../State/IInputState';

export class Input extends React.Component<IInputProps, IInputState> {
	public constructor(props: IInputProps) {
		super(props);
		this.state = {
			value: this.props.value !== undefined ? this.props.value : '',
			disabled: false
		};
	}

	public get disabled(): boolean {
		return this.state.disabled;
	}

	public set disabled(value: boolean) {
		this.setState({ disabled: value });
	}

	public render(): JSX.Element {
		const disabled: boolean = (this.state.disabled === undefined) ? false : this.state.disabled;
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
				value={this.state.value}
				disabled={disabled}
				pattern={InputTypeUtils.getPattern(inputType)}
				onChange={(e: React.FormEvent<HTMLInputElement>) => this.onChange(e.currentTarget.value)}
				placeholder={this.props.placeholder === undefined ? '' : this.props.placeholder}
			>
				{this.props.children}
			</input>
		);
	}

	private onChange(value: string): void {
		this.setState({ value: value });
		if (this.props.onChange) {
			this.props.onChange(value);
		}
	}
}
