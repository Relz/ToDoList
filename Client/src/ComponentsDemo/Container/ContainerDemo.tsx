import * as React from 'react';
import { Container } from '../../Component/Container/Container';
import { DirectionType } from '../../Component/Container/DirectionType';
import '../../sass/components_demo.sass';
import { JustifyType } from '../../Component/Container/JustifyType';
import { AlignItemsType } from '../../Component/Container/AlignItemsType';
import { AlignSelfType } from '../../Component/Container/AlignSelfType';
import * as classNames from 'classnames';

export class ContainerDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<div className='property_title'>Direction type</div>
				<ul>
					<li>{this.getDirectionExample(DirectionType.Row, 'Row')}</li>
					<li>{this.getDirectionExample(DirectionType.RowReverse, 'RowReverse')}</li>
					<li>{this.getDirectionExample(DirectionType.Column, 'Column')}</li>
					<li>{this.getDirectionExample(DirectionType.ColumnReverse, 'ColumnReverse')}</li>
				</ul>
				<div className='property_title'>Justify content type</div>
				<ul>
					<li>{this.getJustifyExample(JustifyType.Start, 'Start')}</li>
					<li>{this.getJustifyExample(JustifyType.End, 'End')}</li>
					<li>{this.getJustifyExample(JustifyType.Center, 'Center')}</li>
					<li>{this.getJustifyExample(JustifyType.SpaceAround, 'SpaceAround')}</li>
					<li>{this.getJustifyExample(JustifyType.SpaceBetween, 'SpaceBetween')}</li>
				</ul>
				<div className='property_title'>Align items type</div>
				<ul>
					<li>{this.getAlignItemsExample(AlignItemsType.Start, 'Start')}</li>
					<li>{this.getAlignItemsExample(AlignItemsType.End, 'End')}</li>
					<li>{this.getAlignItemsExample(AlignItemsType.Center, 'Center')}</li>
					<li>{this.getAlignItemsExample(AlignItemsType.Stretch, 'Stretch')}</li>
					<li>{this.getAlignItemsExample(AlignItemsType.Baseline, 'Baseline')}</li>
				</ul>
				<div className='property_title'>Align self type</div>
				<ul>
					<li>{this.getAlignSelfExample(AlignSelfType.Start, 'Start')}</li>
					<li>{this.getAlignSelfExample(AlignSelfType.End, 'End')}</li>
					<li>{this.getAlignSelfExample(AlignSelfType.Center, 'Center')}</li>
					<li>{this.getAlignSelfExample(AlignSelfType.Stretch, 'Stretch')}</li>
					<li>{this.getAlignSelfExample(AlignSelfType.Baseline, 'Baseline')}</li>
					<li>{this.getAlignSelfExample(AlignSelfType.Auto, 'Auto')}</li>
				</ul>
			</div>
		);
	}

	private getDirectionExample(directionType: DirectionType, title: string): JSX.Element {
		return this.toExample(
			this.getContainer(directionType, JustifyType.Start, AlignItemsType.Baseline, AlignSelfType.Auto),
			title
		);
	}

	private getJustifyExample(justifyType: JustifyType, title: string): JSX.Element {
		return this.toExample(
			this.getContainer(DirectionType.Row, justifyType, AlignItemsType.Baseline, AlignSelfType.Auto),
			title
		);
	}

	private getAlignItemsExample(alignItemsType: AlignItemsType, title: string): JSX.Element {
		return this.toExample(
			this.getContainer(DirectionType.Row, JustifyType.Start, alignItemsType, AlignSelfType.Auto),
			title
		);
	}

	private getAlignSelfExample(alignSelfType: AlignSelfType, title: string): JSX.Element {
		const classes: any = classNames({
			container_content: true,
			green: true,
			container: true,
			align_self_start: alignSelfType === AlignSelfType.Start,
			align_self_end: alignSelfType === AlignSelfType.End,
			align_self_center: alignSelfType === AlignSelfType.Center,
			align_self_stretch: alignSelfType === AlignSelfType.Stretch,
			align_self_baseline: alignSelfType === AlignSelfType.Baseline,
			align_self_auto: alignSelfType === AlignSelfType.Auto
		});
		return this.toExample(
			<Container
				directionType={DirectionType.Row}
				justifyType={JustifyType.Center}
				alignItemsType={AlignItemsType.Baseline}
				alignSelfType={AlignSelfType.Auto}
			>
				<div className='container_content red container'></div>
				<div className='container_content yellow container'></div>
				<div className={classes}></div>
				<div className='container_content blue container'></div>
			</Container>,
			title
		);
	}

	private toExample(container: JSX.Element, title: any): JSX.Element {
		return (
			<div className='property_example_block'>
				<div className='property_example_name'>{title.toString()}</div>
				{container}
			</div>
		);
	}

	private getContainer(
		dir: DirectionType,
		justify: JustifyType,
		alignItemsType: AlignItemsType,
		alignSelfType: AlignSelfType
	): JSX.Element {
		return (
			<Container
				directionType={dir}
				justifyType={justify}
				alignItemsType={alignItemsType}
				alignSelfType={alignSelfType}
			>
				<div className='container_content red'></div>
				<div className='container_content yellow'></div>
				<div className='container_content green'></div>
				<div className='container_content blue'></div>
			</Container>
		);
	}
}
