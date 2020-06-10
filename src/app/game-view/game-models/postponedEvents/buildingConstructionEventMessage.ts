import { PostponedEventMessage } from './postponedEventMessage';
import { Building } from '../buildings/building';
import { BuildingConstructionEvent } from './buildingConstructionEvent';

export class BuildingConstructionEventMessage extends PostponedEventMessage{
    building: Building;
    place: number;

    
}