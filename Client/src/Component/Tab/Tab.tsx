import * as React from 'react';
import { ITabProps } from '../Props/ITabProps';
import * as classNames from 'classnames';
import { TabItem } from './TabItem';
import { TabContent } from './TabContent';
import { TabTitle } from './TabTitle';
import { Container } from '../Container/Container';
import { AlignItemsType } from '../Container/AlignItemsType';
import { DirectionType } from '../Container/DirectionType';
import { JustifyType } from '../Container/JustifyType';
import { AlignSelfType } from '../Container/AlignSelfType';
import { LoadingSpinner } from '../LoadingSpinner/LoadingSpinner';

export class Tab extends React.Component<ITabProps, {}> {
	private _idsToTabTitles: Map<string, TabTitle> = new Map();
	private _idsToTabContents: Map<string, TabContent> = new Map();
	private _loadingSpinner: LoadingSpinner;

	public render(): JSX.Element {
		const classes: any = classNames({
			tab_header: true
		});

		const tabItems: TabItem[] = this.props.tabItems;

		return (
			<div className={'tab'}>
				<div className={classes}>
					<Container
						alignItemsType={AlignItemsType.Stretch}
						alignSelfType={AlignSelfType.Stretch}
						directionType={DirectionType.Row}
						justifyType={JustifyType.SpaceBetween}
					>
						{
							tabItems.map((tabItem: TabItem, index: number) =>
								<TabTitle
									key={tabItem.id}
									onClick={this.onTabItemLabelClick.bind(this, tabItem.id)}
									ref={(ref: TabTitle) => { this.onTabTitleRef(ref, tabItem.id); }}
								>
									{tabItem.label}
								</TabTitle>
							)
						}
					</Container>
				</div>
				{
					tabItems.map((tabItem: TabItem, index: number) =>
						<TabContent
							key={tabItem.id}
							ref={(ref: TabContent) => { this.onTabContentRef(ref, tabItem.id); }}
							loadContent={tabItem.loadContent}
						/>
					)
				}
				<Container
					directionType={DirectionType.Row}
					justifyType={JustifyType.Center}
					alignItemsType={AlignItemsType.Center}
					alignSelfType={AlignSelfType.Center}
				>
					<LoadingSpinner
						active={false}
						ref={(ref: LoadingSpinner) => this._loadingSpinner = ref}
					/>
				</Container>
			</div>
		);
	}

	private onTabTitleRef(ref: TabTitle, tabItemId: string): void {
		this._idsToTabTitles.set(tabItemId, ref);
	}

	private onTabContentRef(ref: TabContent, tabItemId: string): void {
		this._idsToTabContents.set(tabItemId, ref);
	}

	private onTabItemLabelClick(tabItemId: string): void {
		this._loadingSpinner.setActive(true, () => undefined);
		this._idsToTabTitles.forEach((tabTitle: TabTitle) => {
			tabTitle.active = false;
		});
		this._idsToTabContents.forEach((tabContent: TabContent) => {
			tabContent.setActive(false, () => undefined);
		});
		const tabTitleToSetActive: TabTitle | undefined = this._idsToTabTitles.get(tabItemId);
		if (tabTitleToSetActive) {
			tabTitleToSetActive.active = true;
		}
		const tabContentToShow: TabContent | undefined = this._idsToTabContents.get(tabItemId);
		if (tabContentToShow) {
			tabContentToShow.setActive(true, () => {
				if (!tabContentToShow.getContent()) {
					tabContentToShow.loadContent(() => {
						this._loadingSpinner.setActive(false, () => undefined);
					});
				} else {
					this._loadingSpinner.setActive(false, () => undefined);
				}
			});
		}
	}
}
