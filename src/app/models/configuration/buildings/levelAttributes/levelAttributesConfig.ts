import { ResourceSet } from 'src/app/game-view/game-models/players/resourceSet';
import { Time } from 'src/app/game-view/game-models/time';

export interface LevelAttributesConfig {
    COST: ResourceSet;
    BUILDING_TIME: Time;
}