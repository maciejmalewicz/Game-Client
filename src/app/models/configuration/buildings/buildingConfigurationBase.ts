import { LevelAttributesConfig } from './levelAttributes/levelAttributesConfig';

export interface BuildingConfigurationBase <Attributes extends LevelAttributesConfig> {
    MAX_LEVEL: number;
    LEVEL_ATTRIBUTES: Array<Attributes>;
}