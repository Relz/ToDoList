import * as React from 'react';
import { Container } from '../../Component/Container/Container';
import { DirectionType } from '../../Component/Container/DirectionType';
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
					<li>{ContainerDemo.getDirectionExample(DirectionType.Row, 'Row')}</li>
					<li>{ContainerDemo.getDirectionExample(DirectionType.RowReverse, 'RowReverse')}</li>
					<li>{ContainerDemo.getDirectionExample(DirectionType.Column, 'Column')}</li>
					<li>{ContainerDemo.getDirectionExample(DirectionType.ColumnReverse, 'ColumnReverse')}</li>
				</ul>
				<div className='property_title'>Justify content type</div>
				<ul>
					<li>{ContainerDemo.getJustifyExample(JustifyType.Start, 'Start')}</li>
					<li>{ContainerDemo.getJustifyExample(JustifyType.End, 'End')}</li>
					<li>{ContainerDemo.getJustifyExample(JustifyType.Center, 'Center')}</li>
					<li>{ContainerDemo.getJustifyExample(JustifyType.SpaceAround, 'SpaceAround')}</li>
					<li>{ContainerDemo.getJustifyExample(JustifyType.SpaceBetween, 'SpaceBetween')}</li>
				</ul>
				<div className='property_title'>Align items type</div>
				<ul>
					<li>{ContainerDemo.getAlignItemsExample(AlignItemsType.Start, 'Start')}</li>
					<li>{ContainerDemo.getAlignItemsExample(AlignItemsType.End, 'End')}</li>
					<li>{ContainerDemo.getAlignItemsExample(AlignItemsType.Center, 'Center')}</li>
					<li>{ContainerDemo.getAlignItemsExample(AlignItemsType.Stretch, 'Stretch')}</li>
					<li>{ContainerDemo.getAlignItemsExample(AlignItemsType.Baseline, 'Baseline')}</li>
				</ul>
				<div className='property_title'>Align self type</div>
				<ul>
					<li>{ContainerDemo.getAlignSelfExample(AlignSelfType.Start, 'Start')}</li>
					<li>{ContainerDemo.getAlignSelfExample(AlignSelfType.End, 'End')}</li>
					<li>{ContainerDemo.getAlignSelfExample(AlignSelfType.Center, 'Center')}</li>
					<li>{ContainerDemo.getAlignSelfExample(AlignSelfType.Stretch, 'Stretch')}</li>
					<li>{ContainerDemo.getAlignSelfExample(AlignSelfType.Baseline, 'Baseline')}</li>
					<li>{ContainerDemo.getAlignSelfExample(AlignSelfType.Auto, 'Auto')}</li>
				</ul>
			</div>
		);
	}

	private static getDirectionExample(directionType: DirectionType, title: string): JSX.Element {
		return ContainerDemo.toExample(
			ContainerDemo.getContainer(directionType, JustifyType.Start, AlignItemsType.Baseline, AlignSelfType.Auto),
			title
		);
	}

	private static getJustifyExample(justifyType: JustifyType, title: string): JSX.Element {
		return ContainerDemo.toExample(
			ContainerDemo.getContainer(DirectionType.Row, justifyType, AlignItemsType.Baseline, AlignSelfType.Auto),
			title
		);
	}

	private static getAlignItemsExample(alignItemsType: AlignItemsType, title: string): JSX.Element {
		return ContainerDemo.toExample(
			ContainerDemo.getContainer(DirectionType.Row, JustifyType.Start, alignItemsType, AlignSelfType.Auto),
			title
		);
	}

	private static getAlignSelfExample(alignSelfType: AlignSelfType, title: string): JSX.Element {
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
		return ContainerDemo.toExample(
			<Container
				directionType={DirectionType.Row}
				justifyType={JustifyType.Center}
				alignItemsType={AlignItemsType.Baseline}
				alignSelfType={AlignSelfType.Auto}
			>
				<div className='container_content red container'/>
				<div className='container_content yellow container'/>
				<div className={classes}/>
				<div className='container_content blue container'/>
			</Container>,
			title
		);
	}

	private static toExample(container: JSX.Element, title: any): JSX.Element {
		return (
			<div className='property_example_block'>
				<div className='property_example_name'>{title.toString()}</div>
				{container}
			</div>
		);
	}

	private static getContainer(
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
				<div className='container_content red'/>
				<div className='container_content yellow'/>
				<div className='container_content green'/>
				<div className='container_content blue'/>
			</Container>
		);
	}
}
