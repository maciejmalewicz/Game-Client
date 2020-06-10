import { BuildingConstructionEventMessage } from './buildingConstructionEventMessage';
import { BuildingUpgradeEvent } from './buildingUpgradeEvent';

export class BuildingUpgradeEventMessage extends BuildingConstructionEventMessage{
    level: number;

    
}