import { IIdentified } from '../Props/IIdentified';

export class TabItem implements IIdentified {
	public constructor(
		id: string,
		label: string,
		loadContent: (onLoadComplete: (content: JSX.Element) => void) => void
	) {
		this.id = id;
		this.label = label;
		this.loadContent = loadContent;
	}

	public readonly id: string;
	public readonly label: string;
	public readonly loadContent: (onLoadComplete: (content: JSX.Element) => void) => void;
}
