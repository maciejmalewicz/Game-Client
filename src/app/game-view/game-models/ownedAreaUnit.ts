import { AreaUnit } from './areaUnit';
import { SmallBuilding } from './buildings/smallBuilding';
import { Walls } from './buildings/walls';
import { Army } from './battles/army';
import { BuildingQueue } from './buildingQueue';
import { TrainingQueue } from './trainingQueue';

export interface OwnedAreaUnit extends AreaUnit{
    NORTH_BUILDING?: SmallBuilding,
    SOUTH_BUILDING?: SmallBuilding,
    WEST_BUILDING?: SmallBuilding,
    EAST_BUILDING?: SmallBuilding,
    WALLS: SmallBuilding,
    ARMY: Army,
    BUILDING_QUEUE?: BuildingQueue,
    TRAINING_QUEUE?: TrainingQueue
}