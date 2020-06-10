import { Injectable } from '@angular/core';
import { GameConfigurationService } from '../game-configuration.service';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';
import { BuildingConfigurationBase } from 'src/app/models/configuration/buildings/buildingConfigurationBase';
import { LevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/levelAttributesConfig';

@Injectable({
  providedIn: 'root'
})
export class BuildingConfigurationMapperService {

  constructor(private configuration: GameConfigurationService) { }

  getConfiguration(building: Building): BuildingConfigurationBase<LevelAttributesConfig>{
    let config = this.configuration.configuration;
    if (building == null){
      return config.smallBuildingsConfig.wallsConfig;
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      building = (building as UnderConstructionBuilding).buildingUnderConstruction;
    }
    switch(building.LABEL){
      case "BIG_METAL":
        return config.bigBuildingsConfig.bigMetalFactoryConfig;
      case "BIG_BUILDING_MATERIALS":
        return config.bigBuildingsConfig.bigBuildingMaterialsFactoryConfig;
      case "BIG_ELECTRICITY":
        return config.bigBuildingsConfig.bigElectricityFactoryConfig;
      case "MAIN_TOWER":
        return config.bigBuildingsConfig.mainTowerConfig;
      case "TOWER":
        return config.bigBuildingsConfig.towerConfig;
      case "ROCKET":
        return config.bigBuildingsConfig.rocketConfig;
      case "SMALL_METAL":
        return config.smallBuildingsConfig.smallMetalFactoryConfig;
      case "SMALL_BUILDING_MATERIALS":
        return config.smallBuildingsConfig.smallBuildingMaterialsFactoryConfig;
      case "SMALL_ELECTRICITY":
        return config.smallBuildingsConfig.smallElectricityFactoryConfig;
      case "OBSERVATORY":
        return config.smallBuildingsConfig.observatoryConfig;
      case "DROIDS":
        return config.smallBuildingsConfig.droidFactoryConfig;
      case "TANKS":
        return config.smallBuildingsConfig.tankFactoryConfig;     
      case "CANNONS":
        return config.smallBuildingsConfig.cannonFactoryConfig;
      case "WALLS":
        return config.smallBuildingsConfig.wallsConfig;  
      default:
        return null;                     
    }
  }

  getSmallBuildingConfig(index: number){
    let configuration = this.configuration?.configuration?.smallBuildingsConfig;
    if (configuration == null){
      return null;
    }
    switch (index) {
      case 1:
        return configuration.smallMetalFactoryConfig;
      case 2:
        return configuration.smallBuildingMaterialsFactoryConfig;
      case 3:
        return configuration.smallElectricityFactoryConfig;
      case 4:
        return configuration.observatoryConfig;
      case 5:
        return configuration.droidFactoryConfig;
      case 6:
        return configuration.tankFactoryConfig;
      case 7:
        return configuration.cannonFactoryConfig;
      case 8:
        return configuration.wallsConfig;  
      default:
        return null;
    }
  }

  
}
