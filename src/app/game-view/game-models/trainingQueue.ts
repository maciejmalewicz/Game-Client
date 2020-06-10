import { ArmyTrainingEvent } from './postponedEvents/armyTrainingEvent';

export interface TrainingQueue{
    events: Array<ArmyTrainingEvent>;
}