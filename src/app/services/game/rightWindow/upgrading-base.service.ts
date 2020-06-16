import { Injectable } from '@angular/core';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';

@Injectable({
  providedIn: 'root'
})
export class UpgradingBaseService {

  constructor() { }

  isBuildingWalls(building: Building){
    return this.hasLabel(building, "WALLS");
  }

  private hasLabel(building: Building, label: string){
    if (building == null){
      return false;
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      building = ucb.buildingUnderConstruction;
    }
    return building.LABEL == label;
  }

  private hasOneOfLabels(building: Building, labels: Array<string>){
    if (building == null){
      return false;
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      building = ucb.buildingUnderConstruction;
    }
    for (let label of labels){
      if (building.LABEL == label){
        return true;
      }
    }
    return false;
  }

  //drone tower / observatory
  isBuildingObservatory(building: Building){
    return this.hasLabel(building, "OBSERVATORY");
  }

  //tower or main tower
  isBuildingTower(building: Building){
    return this.hasOneOfLabels(building, ["TOWER", "MAIN_TOWER"]);
  }

  //todo - use this function
  isBuildingResourceFactory(building: Building){
    return this.hasOneOfLabels(building, ["BIG_METAL", "BIG_BUILDING_MATERIALS", "BIG_ELECTRICITY",
    "SMALL_METAL", "SMALL_BUILDING_MATERIALS", "SMALL_ELECTRICITY"]);
  }

  isBuildingSmallResourceFactory(building: Building){
    return this.hasOneOfLabels(building, ["SMALL_METAL", "SMALL_BUILDING_MATERIALS", "SMALL_ELECTRICITY"]);
  }

  protected getCurrentLevel(building: Building, event: BuildingUpgradeEvent): number{
    return this.getLevelToUpgrade(building, event) - 1;
  }

  protected getLevelToUpgrade(building: Building, event: BuildingUpgradeEvent): number{
    if (building == null){
      return 1;
    }
    else if (event == null){
      return building.LEVEL + 1;
    } 
    else if (event.level == undefined){
      return 2;
    }
    else {
      return event.level + 1;
    }
  }
}
