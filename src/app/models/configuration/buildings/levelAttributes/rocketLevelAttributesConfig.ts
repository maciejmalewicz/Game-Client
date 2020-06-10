import { LevelAttributesConfig } from './levelAttributesConfig';
import { Time } from 'src/app/game-view/game-models/time';

export interface RocketLevelAttributesConfig extends LevelAttributesConfig {
    LEVEL1_TOWER_RELOADING_TIME: Time;
    LEVEL2_TOWER_RELOADING_TIME: Time;
    LEVEL3_TOWER_RELOADING_TIME: Time;
    LEVEL4_TOWER_RELOADING_TIME: Time;
}