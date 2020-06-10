import { BigBuilding } from './buildings/bigBuilding';
import { SmallBuilding } from './buildings/smallBuilding';
import { BuildingConstructionEvent } from './postponedEvents/buildingConstructionEvent';
import { BuildingQueue } from './buildingQueue';
import { ArmyMovementQueue } from './armyMovementQueue';

export interface AreaUnit{

    MAIN_BUILDING?: BigBuilding,
    OWNER?: string,
    ARMY_MOVEMENT_QUEUE?: ArmyMovementQueue
}