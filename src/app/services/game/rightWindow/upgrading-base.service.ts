import { Injectable } from '@angular/core';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { SelectedFieldService } from '../board/selected-field.service';
import { BuildingSelectionService } from './building-selection.service';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';

@Injectable({
  providedIn: 'root'
})
export class UpgradingBaseService {

  constructor() { }

  //todo - use this function
  isBuildingResourceFactory(building: Building){
    if (building == null){
      return false;
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      building = ucb.buildingUnderConstruction;
    }
    let label = building.LABEL;
    if (label == "BIG_METAL" || label == "BIG_BUILDING_MATERIALS" || label == "BIG_ELECTRICITY"
    || label == "SMALL_METAL" || label == "SMALL_BUILDING_MATERIALS" || label == "SMALL_ELECTRICITY"){
      return true;
    }
    return false;
  }

  isBuildingSmallResourceFactory(building: Building){
    if (building == null){
      return false;
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      building = ucb.buildingUnderConstruction;
    }
    let label = building.LABEL;
    if (label == "SMALL_METAL" || label == "SMALL_BUILDING_MATERIALS" || label == "SMALL_ELECTRICITY"){
      return true;
    }
    return false;
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
