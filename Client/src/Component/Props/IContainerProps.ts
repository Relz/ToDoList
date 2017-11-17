import { DirectionType } from '../Container/DirectionType';
import { JustifyType } from '../Container/JustifyType';
import { AlignType } from '../Container/AlignType';

export interface IContainerProps {
	directionType: DirectionType;
	justifyType: JustifyType;
	alignItemsType: AlignType;
	alignSelfType: AlignType;
}
