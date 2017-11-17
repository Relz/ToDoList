import * as React from 'react';

export class ContainerDemoDescription extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<div className='description_title'>
					<span>При использовании компонента разработчику потребуется</span>
					<span>указать эти свойства с помощью перечислимых типов данных:</span>
				</div>
				<div><strong>Flex Direction (DirectionType)</strong></div>
				<ul>
					<li>Row</li>
					<li>RowReverse</li>
					<li>Column</li>
					<li>ColumnReverse</li>
				</ul>
				<div><strong>Justify Content (JustifyType)</strong></div>
				<ul>
					<li>Start</li>
					<li>End</li>
					<li>Center</li>
					<li>SpaceBetween</li>
					<li>SpaceAround</li>
				</ul>
				<div><strong>Align Items (AlignType)</strong></div>
				<ul>
					<li>Auto</li>
					<li>Start</li>
					<li>End</li>
					<li>Center</li>
					<li>Stretch</li>
					<li>Baseline</li>
				</ul>
				<div><strong>Align Self (AlignType)</strong></div>
				<ul>
					<li>Auto</li>
					<li>Start</li>
					<li>End</li>
					<li>Center</li>
					<li>Stretch</li>
					<li>Baseline</li>
				</ul>
			</div>
		);
	}
}
