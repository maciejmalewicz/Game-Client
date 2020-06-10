import { ProductionManagers1 } from './improventUpgrades/productionManagers1';
import { ProductionManagers2 } from './improventUpgrades/productionManagers2';
import { MiningDrill } from './improventUpgrades/miningDrill';
import { Excavator } from './improventUpgrades/excavator';
import { AdvancedPhysics } from './improventUpgrades/advancedPhysics';
import { EngineeringPatterns } from './improventUpgrades/engineeringPatterns';
import { SpaceManagement } from './improventUpgrades/spaceManagement';
import { TransportTrains } from './improventUpgrades/transportTrains';
import { Geology } from './improventUpgrades/geology';
import { Architecture } from './improventUpgrades/architecture';
import { ManagersAI } from './improventUpgrades/managersAI';

export interface ImprovementUpgradesConfig {
    
    productionManagers1: ProductionManagers1;

    productionManagers2: ProductionManagers2;

    miningDrill: MiningDrill;

    excavator: Excavator;

    advancedPhysics: AdvancedPhysics;

    engineeringPatterns: EngineeringPatterns;

    spaceManagement: SpaceManagement;

    transportTrains: TransportTrains;

    geology: Geology;

    architecture: Architecture;

    managersAI: ManagersAI;
}