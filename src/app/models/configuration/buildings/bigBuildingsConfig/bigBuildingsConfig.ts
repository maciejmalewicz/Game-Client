import { TowerConfig } from './towerConfig';
import { RocketConfig } from './rocketConfig';
import { FactoryConfig } from '../factoryConfig';


export interface BigBuildingsConfig{
    towerConfig: TowerConfig,
    mainTowerConfig: TowerConfig,
    rocketConfig: RocketConfig,
    bigMetalFactoryConfig: FactoryConfig,
    bigBuildingMaterialsFactoryConfig: FactoryConfig,
    bigElectricityFactoryConfig: FactoryConfig
}