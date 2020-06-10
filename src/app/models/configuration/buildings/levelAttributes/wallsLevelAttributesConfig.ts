import { LevelAttributesConfig } from './levelAttributesConfig';

export interface WallsLevelAttributesConfig extends LevelAttributesConfig {
     //base defence
     PROTECTION: number;

     //bonus to units defence
     BONUS: number;
}