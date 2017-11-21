import * as React from 'react';
import { Tab } from '../../Component/Tab/Tab';
import { TabItem } from '../../Component/Tab/TabItem';

export class TabDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<Tab tabItems={[
					new TabItem('demoTab1', 'Tab1', () => TabDemo.createContent('First tab')),
					new TabItem('demoTab2', 'Tab2', () => TabDemo.createContent('Second tab')),
					new TabItem('demoTab3', 'Tab3', () => TabDemo.createContent('Third tab')),
					new TabItem('demoTab4', 'Tab4', () => TabDemo.createContent('Fours tab'))
				]}/>
			</div>
		);
	}

	private static createContent(text: string): JSX.Element {
		return <div>
			<span>{text}</span>
		</div>;
	}
}
