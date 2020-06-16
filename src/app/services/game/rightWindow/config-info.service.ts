import { Injectable } from '@angular/core';
import { BuildingConfigurationMapperService } from './building-configuration-mapper.service';
import { BuildingConfigurationBase } from 'src/app/models/configuration/buildings/buildingConfigurationBase';
import { LevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/levelAttributesConfig';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { ResourceSet } from 'src/app/game-view/game-models/players/resourceSet';
import { Time } from 'src/app/game-view/game-models/time';
import { ResourceFactoryLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/resourceFactoryLevelAttributesConfig';
import { WallsLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/wallsLevelAttributesConfig';
import { TowerLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/towerLevelAttributesConfig';
import { MechFactoryLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/mechFactoryLevelAttributesConfig';

@Injectable({
  providedIn: 'root'
})
export class ConfigInfoService {

  constructor(private configMapper: BuildingConfigurationMapperService) { }

  getTime(building: Building, level: number){
    let levelAttributes = this.getLevelAttributesByBuilding(building, level);
    if (levelAttributes == null){
      return this.getEmptyTime();
    }
    return levelAttributes.BUILDING_TIME;
  }

  getCost(building: Building, level: number){
    let levelAttributes = this.getLevelAttributesByBuilding(building, level);
    if (levelAttributes == null){
      return this.getEmptyResourceSet();
    }
    return levelAttributes.COST;
  }
 
  getCostByConfig(config: BuildingConfigurationBase<LevelAttributesConfig>, level: number){
    let levelAttributes = this.getLevelAttributes(config, level);
    if (levelAttributes == null){
      return this.getEmptyResourceSet();
    }
    return levelAttributes.COST;
  }

  getTimeByConfig(config: BuildingConfigurationBase<LevelAttributesConfig>, level: number){
    let levelAttributes = this.getLevelAttributes(config, level);
    if (levelAttributes == null){
      return this.getEmptyTime();
    }
    return levelAttributes.BUILDING_TIME;
  }

  getLevelAttributes(config: BuildingConfigurationBase<LevelAttributesConfig>, level: number): LevelAttributesConfig{
    if (config == null || level > config.MAX_LEVEL || level < 1){
      return null;
    }
    return config.LEVEL_ATTRIBUTES[level-1];
  }

  getProduction(factory: Building, level: number){
    if (!this.isFactory(factory)){
      return 0;
    }
    let levelAttributes = this.getLevelAttributesByBuilding(factory, level) as ResourceFactoryLevelAttributesConfig;
    return levelAttributes.PRODUCTION;
  }

  getProtection(building: Building, level: number){
    if (!this.isDefensive(building)){
      return 0;
    }
    let levelAttributes = this.getLevelAttributesByBuilding(building, level) as WallsLevelAttributesConfig;
    return levelAttributes.PROTECTION;
  }

  getDefenceBonus(building: Building, level: number){
    if (!this.isDefensive(building)){
      return 0;
    }
    let levelAttributes = this.getLevelAttributesByBuilding(building, level) as WallsLevelAttributesConfig;
    return levelAttributes.BONUS;
  }

  getAttack(building: Building, level: number){
    if (!this.isTower(building)){
      return 0;
    }
    let levelAttributes = this.getLevelAttributesByBuilding(building, level) as TowerLevelAttributesConfig;
    return levelAttributes.DAMAGE;
  }

  getRegularProduction(building: Building, level: number){
    return this.getMechProduction(building, level, 1);
  }

  getBigProduction(building: Building, level: number){
    return this.getMechProduction(building, level, 2);
  }

  getMassProduction(building: Building, level: number){
    return this.getMechProduction(building, level, 3);
  }

  getMechProduction(building: Building, level: number, productionType: number){
    if (!this.isMechFactory(building)){
      return 0;
    }
    let levelAttributes = this.getLevelAttributesByBuilding(building, level) as MechFactoryLevelAttributesConfig;
    switch(productionType){
      case 1:
        return levelAttributes.REGULAR_PRODUCTION;
      case 2:
        return levelAttributes.BIG_PRODUCTION;
      case 3:
        return levelAttributes.MASS_PRODUCTION;     
    }
  }

  private isMechFactory(building: Building){
    return building != null || building.LABEL == "DROIDS" || building.LABEL == "TANKS" || building.LABEL == "CANNONS";
  }

  private isTower(building: Building){
    return building != null || building.LABEL == "TOWER" || building.LABEL == "MAIN_TOWER";
  }

  private isDefensive(building: Building){
    return building != null || building.LABEL == "WALLS" || building.LABEL == "TOWER" || building.LABEL == "MAIN_TOWER";
  }

  private isFactory(building: Building){
    return building != null || building.LABEL == "BIG_METAL" || building.LABEL == "SMALL_METAL" ||
    building.LABEL == "BIG_BUILDING_MATERIALS" || building.LABEL == "SMALL_BUILDING_MATERIALS"
    || building.LABEL == "BIG_ELECTRICITY" || building.LABEL == "SMALL_ELECTRICITY";
  }

  

  private getLevelAttributesByBuilding(building: Building, level: number){
    if (building == null){
      return null;
    }
    let config = this.configMapper.getConfiguration(building);
    if (config == null){
      return null;
    } 
    return this.getLevelAttributes(config, level);
  }

  private getEmptyTime(){
    let time: Time = {
      minutes: 0,
      seconds: 0
    };
    return time;
  }

  private getEmptyResourceSet(){
    let set: ResourceSet = {
      METAL: 0,
      BUILDING_MATERIALS: 0,
      ELECTRICITY: 0
    };
    return set;
  }

}
