import { PostponedEventMessage } from './postponedEventMessage';

export class ArmyTrainingEventMessage extends PostponedEventMessage {
    unitType: number;
    quantity: number;

}