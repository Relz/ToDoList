import * as React from 'react';
import { IContainerProps } from '../Props/IContainerProps';
import { Utils } from '../../Utils/Utils';
import * as classNames from 'classnames';

export class Container extends React.Component<IContainerProps, {}> {
	public render(): JSX.Element {
		const classes: any = classNames({
			container: true
		});
		return (
			<div
				className={classes + Utils.toClassNames(
					this.props.directionType,
					this.props.justifyType,
					this.props.alignItemsType,
					this.props.alignSelfType
				)}
			>
				{this.props.children}
			</div>
		);
	}
}
