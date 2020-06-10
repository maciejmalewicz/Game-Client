import { BuildingConstructionEvent } from './postponedEvents/buildingConstructionEvent';

export interface BuildingQueue{
    events: Array <BuildingConstructionEvent>
}