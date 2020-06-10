import { BuildingQueue } from './buildingQueue';
import { SmallBuilding } from './buildings/smallBuilding';
import { Walls } from './buildings/walls';
import { Army } from './battles/army';
import { EventQueue } from './eventQueue';
import { AreaUnit } from './areaUnit';

export interface OwnedAreaUnitMessage extends AreaUnit{
    NORTH_BUILDING?: SmallBuilding,
    SOUTH_BUILDING?: SmallBuilding,
    WEST_BUILDING?: SmallBuilding,
    EAST_BUILDING?: SmallBuilding,
    WALLS: Walls,
    ARMY: Army,
    AREA_EVENTS?: EventQueue
}