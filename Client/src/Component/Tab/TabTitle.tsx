import * as React from 'react';
import { ITabTitleProps } from '../Props/ITabTitleProps';
import { ButtonType } from '../Button/ButtonType';
import { ButtonSize } from '../Button/ButtonSize';
import { Button } from '../Button/Button';
import { ITabTitleState } from '../State/ITabTitleState';

export class TabTitle extends React.Component<ITabTitleProps, ITabTitleState> {
	private _button: Button;

	componentDidMount(): void {
		if (this.props.onRef) {
			this.props.onRef(this);
		}
	}

	componentWillUnmount(): void {
		if (this.props.onRef) {
			this.props.onRef(undefined);
		}
	}

	public render(): JSX.Element {
		return (
			<Button
				type={ButtonType.Basic}
				size={ButtonSize.Medium}
				onClick={this.props.onClick}
				onRef={(ref: Button) => { this._button = ref; }}
			>
				{this.props.children}
			</Button>
		);
	}

	public get active(): boolean {
		return this._button.state.type === ButtonType.Primary;
	}

	public set active(value: boolean) {
		this._button.type = value ? ButtonType.Primary : ButtonType.Default;
	}
}
