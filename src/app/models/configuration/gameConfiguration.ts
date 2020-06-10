import { BigBuildingsConfig } from './buildings/bigBuildingsConfig/bigBuildingsConfig';
import { SmallBuildingsConfig } from './buildings/smallBuildingsConfig/smallBuildingsConfig';
import { ArmyConfiguration } from './army/armyConfiguration';
import { UpgradesConfig } from './upgradesConfig/upgradesConfig';


export interface GameConfiguration{
    bigBuildingsConfig: BigBuildingsConfig,
    smallBuildingsConfig: SmallBuildingsConfig,
    armyBalanceConfig: ArmyConfiguration,
    upgradesConfig: UpgradesConfig
}