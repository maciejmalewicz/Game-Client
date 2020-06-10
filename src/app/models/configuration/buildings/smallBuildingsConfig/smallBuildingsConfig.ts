
import { ObservatoryConfig } from './observatoryConfig';
import { WallsConfig } from './wallsConfig';
import { FactoryConfig } from '../factoryConfig';
import { MechFactoryConfig } from './mechFactoryConfig';

export interface SmallBuildingsConfig{
    smallMetalFactoryConfig: FactoryConfig,
    smallBuildingMaterialsFactoryConfig: FactoryConfig,
    smallElectricityFactoryConfig: FactoryConfig,
    observatoryConfig: ObservatoryConfig,
    droidFactoryConfig: MechFactoryConfig,
    tankFactoryConfig: MechFactoryConfig,
    cannonFactoryConfig: MechFactoryConfig,
    wallsConfig: WallsConfig
}