import * as React from 'react';
import { Container } from '../../Component/Container/Container';
import { DirectionType } from '../../Component/Container/DirectionType';
import '../../sass/components_demo.sass';
import { JustifyType } from '../../Component/Container/JustifyType';
import { AlignType } from '../../Component/Container/AlignType';
import * as classNames from 'classnames';

export class ContainerDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<div className='property_title'>Direction type</div>
				<ul>
					<li>{this.getDirectionExample(DirectionType.Row)}</li>
					<li>{this.getDirectionExample(DirectionType.RowReverse)}</li>
					<li>{this.getDirectionExample(DirectionType.Column)}</li>
					<li>{this.getDirectionExample(DirectionType.ColumnReverse)}</li>
				</ul>
				<div className='property_title'>Justify content type</div>
				<ul>
					<li>{this.getJustifyExample(JustifyType.Start)}</li>
					<li>{this.getJustifyExample(JustifyType.End)}</li>
					<li>{this.getJustifyExample(JustifyType.Center)}</li>
					<li>{this.getJustifyExample(JustifyType.SpaceAround)}</li>
					<li>{this.getJustifyExample(JustifyType.SpaceBetween)}</li>
				</ul>
				<div className='property_title'>Align items type</div>
				<ul>
					<li>{this.getAlignItemsExample(AlignType.Start)}</li>
					<li>{this.getAlignItemsExample(AlignType.End)}</li>
					<li>{this.getAlignItemsExample(AlignType.Center)}</li>
					<li>{this.getAlignItemsExample(AlignType.Stretch)}</li>
					<li>{this.getAlignItemsExample(AlignType.Baseline)}</li>
				</ul>
				<div className='property_title'>Align self type</div>
				<ul>
					<li>{this.getAlignSelfExample(AlignType.Start)}</li>
					<li>{this.getAlignSelfExample(AlignType.End)}</li>
					<li>{this.getAlignSelfExample(AlignType.Center)}</li>
					<li>{this.getAlignSelfExample(AlignType.Stretch)}</li>
					<li>{this.getAlignSelfExample(AlignType.Baseline)}</li>
					<li>{this.getAlignSelfExample(AlignType.Auto)}</li>
				</ul>
			</div>
		);
	}

	private getDirectionExample(directionType: DirectionType): JSX.Element {
		return this.toExample(
			this.getContainer(directionType, JustifyType.Start, AlignType.Baseline, AlignType.Auto),
			DirectionType[directionType]
		);
	}

	private getJustifyExample(justifyType: JustifyType): JSX.Element {
		return this.toExample(
			this.getContainer(DirectionType.Row, justifyType, AlignType.Baseline, AlignType.Auto),
			JustifyType[justifyType]
		);
	}

	private getAlignItemsExample(alignItemsType: AlignType): JSX.Element {
		return this.toExample(
			this.getContainer(DirectionType.Row, JustifyType.Start, alignItemsType, AlignType.Auto),
			AlignType[alignItemsType]
		);
	}

	private getAlignSelfExample(alignSelfType: AlignType): JSX.Element {
		const classes: any = classNames({
			container_content: true,
			green: true,
			container: true,
			align_self_start: alignSelfType === AlignType.Start,
			align_self_end: alignSelfType === AlignType.End,
			align_self_center: alignSelfType === AlignType.Center,
			align_self_stretch: alignSelfType === AlignType.Stretch,
			align_self_baseline: alignSelfType === AlignType.Baseline,
			align_self_auto: alignSelfType === AlignType.Auto
		});
		return this.toExample(
			<Container
				directionType={DirectionType.Row}
				justifyType={JustifyType.Center}
				alignItemsType={AlignType.Baseline}
				alignSelfType={AlignType.Auto}
			>
				<div className='container_content red container'></div>
				<div className='container_content yellow container'></div>
				<div className={classes}></div>
				<div className='container_content blue container'></div>
			</Container>,
			AlignType[alignSelfType]
		);
	}

	private toExample(container: JSX.Element, title: String): JSX.Element {
		return (
			<div className='property_example_block'>
				<div className='property_example_name'>{title}</div>
				{container}
			</div>
		);
	}

	private getContainer(
		dir: DirectionType,
		justify: JustifyType,
		alignItemsType: AlignType,
		alignSelfType: AlignType
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
