import { IReferable } from './IReferable';

export interface ITabContentProps extends IReferable {
	loadContent: (onLoadComplete: (content: JSX.Element) => void) => void;
}
