import { PostponedEvent } from './postponedEvent';
import { Building } from '../buildings/building';

export class BuildingConstructionEvent extends PostponedEvent{
    building: Building;
    place: number;

}