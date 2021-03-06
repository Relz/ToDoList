import { ITabContentState } from '../State/ITabContentState';
import { ITabContentProps } from '../Props/ITabContentProps';
import * as React from 'react';
import * as classNames from 'classnames';

export class TabContent extends React.Component<ITabContentProps, ITabContentState> {
	public constructor(props: ITabContentProps) {
		super(props);
		this.state = { active: false, content: undefined };
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

	public getContent(): JSX.Element | undefined {
		return this.state.content;
	}

	public setContent(value: JSX.Element, callback: () => void): void {
		this.setState({ active: this.state.active, content: value }, callback);
	}

	public getActive(): boolean {
		return this.state.active;
	}

	public setActive(value: boolean, callback: () => void): void {
		this.setState({ active: value, content: this.state.content }, callback);
	}

	public loadContent(onLoadComplete: () => void): void {
		this.props.loadContent((content: JSX.Element) => {
			this.setState({ active: this.state.active, content: content });
			onLoadComplete();
		});
	}
}
