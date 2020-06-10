import { ArmyUpgradesConfig } from './armyUpgradesConfig';
import { ControlUpgradesConfig } from './controlUpgradesConfig';
import { ImprovementUpgradesConfig } from './improvementUpgradesConfig';

export interface UpgradesConfig {
    armyUpgradesConfig: ArmyUpgradesConfig;
    
    controlUpgradesConfig: ControlUpgradesConfig;

    improvementUpgradesConfig: ImprovementUpgradesConfig;
}