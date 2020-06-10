import { PostponedEvent } from './postponedEvent';

export class ArmyTrainingEvent extends PostponedEvent{
    unitType: number;
    quantity: number;
}