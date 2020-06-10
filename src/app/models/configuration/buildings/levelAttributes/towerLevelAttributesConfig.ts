import { WallsLevelAttributesConfig } from './wallsLevelAttributesConfig';

export interface TowerLevelAttributesConfig extends WallsLevelAttributesConfig{
    //damage done by tower itself
    DAMAGE: number;
}