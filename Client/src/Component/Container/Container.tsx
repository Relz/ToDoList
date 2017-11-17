import * as React from 'react';
import { IContainerProps } from '../Props/IContainerProps';
import { DirectionType } from './DirectionType';
import * as classNames from 'classnames';
import { JustifyType } from './JustifyType';
import { AlignType } from './AlignType';

export class Container extends React.Component<IContainerProps, {}> {
	public render(): JSX.Element {
		const classes: any = classNames({
			container: true,

			direction_row: this.props.directionType === DirectionType.Row,
			direction_row_reverse: this.props.directionType === DirectionType.RowReverse,
			direction_column: this.props.directionType === DirectionType.Column,
			direction_column_reverse: this.props.directionType === DirectionType.ColumnReverse,

			justify_start: this.props.justifyType === JustifyType.Start,
			justify_end: this.props.justifyType === JustifyType.End,
			justify_center: this.props.justifyType === JustifyType.Center,
			justify_space_between: this.props.justifyType === JustifyType.SpaceAround,
			justify_space_around: this.props.justifyType === JustifyType.SpaceBetween,

			align_items_start: this.props.alignItemsType === AlignType.Start,
			align_items_end: this.props.alignItemsType === AlignType.End,
			align_items_center: this.props.alignItemsType === AlignType.Center,
			align_items_stretch: this.props.alignItemsType === AlignType.Stretch,
			align_items_baseline: this.props.alignItemsType === AlignType.Baseline,

			align_self_start: this.props.alignSelfType === AlignType.Start,
			align_self_end: this.props.alignSelfType === AlignType.End,
			align_self_center: this.props.alignSelfType === AlignType.Center,
			align_self_stretch: this.props.alignSelfType === AlignType.Stretch,
			align_self_baseline: this.props.alignSelfType === AlignType.Baseline,
			align_self_auto: this.props.alignSelfType === AlignType.Auto
		});

		return (
			<div className={classes}>
				{this.props.children}
			</div>
		);
	}
}
