import { LevelAttributesConfig } from './levelAttributesConfig';

export interface ObservatoryLevelAttributesConfig extends LevelAttributesConfig {
    //how the chance decreases based on distance of spying
    DISTANCE_CHANCE_REDUCTION_MULTIPLIER: number;

    //base chance (unreduced) of spying an enemy field
    BASIC_CHANCE: number;

    //protection against enemy spying
    ENEMYS_CHANCE_REDUCTION: number;
}