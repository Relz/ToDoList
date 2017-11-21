import { IReferable } from './IReferable';

export interface ITabContentProps extends IReferable {
	loadContent: () => JSX.Element;
}
