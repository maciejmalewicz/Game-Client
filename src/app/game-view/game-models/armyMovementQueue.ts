import { ArmyMovementEvent } from './postponedEvents/armyMovementEvents/armyMovementEvent';
import { PostponedEvent } from './postponedEvents/postponedEvent';

export interface ArmyMovementQueue{
    events: Array<PostponedEvent>
}