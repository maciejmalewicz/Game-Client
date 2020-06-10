import { AreaUnit } from './areaUnit';
import { OwnedAreaUnit } from './ownedAreaUnit';
import { OwnedAreaUnitMessage } from './ownedAreaUnitMessage';

export interface BoardMessage{
    units: Array<Array<OwnedAreaUnitMessage>>;
}