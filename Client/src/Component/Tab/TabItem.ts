export class TabItem {
	public constructor(id: string, label: string, loadContent: () => JSX.Element) {
		this.id = id;
		this.label = label;
		this.loadContent = loadContent;
	}

	public readonly id: string;
	public readonly label: string;
	public readonly loadContent: () => JSX.Element;
}
