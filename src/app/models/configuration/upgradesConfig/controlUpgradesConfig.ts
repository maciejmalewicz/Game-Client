import { Minesweepers } from './controlUpgrades/minesweepers';
import { ConquerorsLand } from './controlUpgrades/conquerorsLand';
import { TreasureHaunters } from './controlUpgrades/treasureHaunters';
import { BuildingEngineers } from './controlUpgrades/buildingEngineers';
import { ScrapDrones } from './controlUpgrades/scrapDrones';
import { Fortress } from './controlUpgrades/fortress';
import { Pyrotechnics } from './controlUpgrades/pyrotechnics';
import { Accuracy } from './controlUpgrades/accuracy';
import { Infrastructure } from './controlUpgrades/infrastructure';
import { ConquerAndProtect1 } from './controlUpgrades/conquerAndProtect1';
import { ConquerAndProtect2 } from './controlUpgrades/conquerAndProtect2';

export interface ControlUpgradesConfig{
    
    minesweepers: Minesweepers;

    conquerorsLand: ConquerorsLand;

    treasureHaunters: TreasureHaunters;

    buildingEngineers: BuildingEngineers;

    scrapDrones: ScrapDrones;

    fortress: Fortress;

    pyrotechnics: Pyrotechnics;

    accuracy: Accuracy;

    infrastructure: Infrastructure;
    
    conquerAndProtect1: ConquerAndProtect1;

    conquerAndProtect2: ConquerAndProtect2;
}