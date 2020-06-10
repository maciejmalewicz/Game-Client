import { ArmyMovementEvent } from './postponedEvents/armyMovementEvents/armyMovementEvent';

export interface ArmyMovementQueue{
    events: Array<ArmyMovementEvent>
}