import { Injectable } from '@angular/core';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';

@Injectable({
  providedIn: 'root'
})
export class BuildingImageMapperService {

  constructor() { }

  getImage(building: Building){
    if (building == null){
      return "assets\\game-graphics\\unknownbuilding.png";
    }
    switch (building.LABEL){
      //doing stuff for building inside wrapper
      case "UNDER_CONSTRUCTION_BUILDING":
        let ucb = building as UnderConstructionBuilding;
        return this.getImage(ucb.buildingUnderConstruction);
      case "ROCKET":
        return "assets\\game-graphics\\rocket1.png";
      case "TOWER":
        return this.getTowerImage(building.LEVEL);
      case "BIG_METAL":
        return this.getMetalImage(building.LEVEL);  
      case "BIG_ELECTRICITY":
        return this.getElectricityImage(building.LEVEL);

      case "SMALL_METAL":
        return this.getSmallMetalFactoryImage(building.LEVEL);
      case "SMALL_BUILDING_MATERIALS":
        return this.getSmallMaterialsFactoryImage(building.LEVEL);
      case "SMALL_ELECTRICITY":
        return this.getSmallElectricityFactoryImage(building.LEVEL);
      case "OBSERVATORY":
        return this.getDroneTowerImage(building.LEVEL);
      case "DROIDS":
        return this.getDroidFactoryImage(building.LEVEL);
      case "TANKS":
        return this.getTankFactoryImage(building.LEVEL);
      case "CANNONS":
        return this.getCannonFactoryImage(building.LEVEL);              
      default:
        return "assets\\game-graphics\\unknownbuilding.png"; 
    }
  }

  private getTowerImage(level: number){
    return "assets\\game-graphics\\tower1.png";
  }

  private getMetalImage(level: number){
    return "assets\\game-graphics\\metalFactory1.png";
  }

  private getElectricityImage(level: number){
    return "assets\\game-graphics\\electricityFactory1.png";
  }

  private getSmallMetalFactoryImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\metal.png";
  }

  private getSmallMaterialsFactoryImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\buildingMaterials.png";
  }

  private getSmallElectricityFactoryImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\electricity.png";
  }

  private getDroneTowerImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\droneTower.png";
  }

  private getDroidFactoryImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\droidFactory.png";
  }

  private getTankFactoryImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\tankFactory.png";
  }

  private getCannonFactoryImage(level: number){
    return "assets\\game-graphics\\smallBuildings\\cannonFactory.png";
  }
}
