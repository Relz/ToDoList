import * as React from 'react';
import { Tab } from '../../Component/Tab/Tab';
import { TabItem } from '../../Component/Tab/TabItem';

export class TabDemo extends React.Component<{}, {}> {
	public render(): JSX.Element {
		return (
			<div>
				<Tab tabItems={[
					new TabItem(
						'demoTab1',
						'Tab1',
						(onLoadComplete: (content: JSX.Element) => void) => TabDemo.createContent('First tab', onLoadComplete)
					),
					new TabItem(
						'demoTab2',
						'Tab2',
						(onLoadComplete: (content: JSX.Element) => void) => TabDemo.createContent('Second tab', onLoadComplete)
					),
					new TabItem(
						'demoTab3',
						'Tab3',
						(onLoadComplete: (content: JSX.Element) => void) => TabDemo.createContent('Third tab', onLoadComplete)
					),
					new TabItem(
						'demoTab4',
						'Tab4',
						(onLoadComplete: (content: JSX.Element) => void) => TabDemo.createContent('Fours tab', onLoadComplete)
					)
				]}/>
			</div>
		);
	}

	private static createContent(text: string, onLoadComplete: (content: JSX.Element) => void): void {
		setTimeout(() => {
			onLoadComplete(
				<div>
					<span>{text}</span>
				</div>
			);
		}, 2000);
	}
}
