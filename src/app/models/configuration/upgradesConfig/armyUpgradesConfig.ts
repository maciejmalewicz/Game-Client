import { PowerInSimplicity } from './armyUpgrades/powerInSimplicity';
import { AdvancedDroids } from './armyUpgrades/advancedDroids';
import { AssemblyLines } from './armyUpgrades/assemblyLines';
import { MassProduction } from './armyUpgrades/massProduction';
import { Tanks } from './armyUpgrades/tanks';
import { Mobility } from './armyUpgrades/mobility';
import { ShootingWindow } from './armyUpgrades/shootingWindow';
import { Cannons } from './armyUpgrades/cannons';
import { CannonPlatform } from './armyUpgrades/cannonPlatform';
import { BattleFormation } from './armyUpgrades/battleFormation';
import { SolarPanels } from './armyUpgrades/solarPanels';

export interface ArmyUpgradesConfig {

    powerInSimplicity: PowerInSimplicity;

    advancedDroids: AdvancedDroids;

    assemblyLines: AssemblyLines;

    massProduction: MassProduction;

    tanks: Tanks;

    mobility: Mobility;

    shootingWindow: ShootingWindow;

    cannons: Cannons;

    cannonPlatform: CannonPlatform;

    battleFormation: BattleFormation;

    solarPanels: SolarPanels;
}