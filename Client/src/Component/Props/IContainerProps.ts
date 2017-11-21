import { DirectionType } from '../Container/DirectionType';
import { JustifyType } from '../Container/JustifyType';
import { AlignItemsType } from '../Container/AlignItemsType';
import { AlignSelfType } from '../Container/AlignSelfType';

export interface IContainerProps {
	directionType: DirectionType;
	justifyType: JustifyType;
	alignItemsType: AlignItemsType;
	alignSelfType: AlignSelfType;
}
