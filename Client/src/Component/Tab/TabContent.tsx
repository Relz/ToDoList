import { ITabContentState } from '../State/ITabContentState';
import { ITabContentProps } from '../Props/ITabContentProps';
import * as React from 'react';
import * as classNames from 'classnames';

export class TabContent extends React.Component<ITabContentProps, ITabContentState> {
	public constructor() {
		super();
		this.state = { active: false, content: undefined };
	}

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
		const classes: any = classNames({
			tab_content: true,
			active: this.state.active
		});

		return (
			<div className={classes}>
				{this.state.content}
			</div>
		);
	}

	public getActive(): boolean {
		return this.state.active;
	}

	public setActive(value: boolean, callback: () => void) {
		this.setState({ active: value, content: this.state.content }, callback);
	}

	public loadContent(): void {
		this.setState({ active: this.state.active, content: this.props.loadContent() });
	}
}
