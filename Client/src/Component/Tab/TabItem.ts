export class TabItem {
	public constructor(id: string, label: string, content: JSX.Element) {
		this._id = id;
		this._label = label;
		this._content = content;
	}

	private _id: string;
	public get id(): string {
		return this._id;
	}

	public set id(value: string) {
		this._id = value;
	}

	private _label: string;
	public get label(): string {
		return this._label;
	}

	public set label(value: string) {
		this._label = value;
	}

	private _content: JSX.Element;
	public get content(): JSX.Element {
		return this._content;
	}

	public set content(value: JSX.Element) {
		this._content = value;
	}
}
