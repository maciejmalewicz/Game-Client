import { Component, OnInit } from '@angular/core';
import { OwnedAreaUnit } from '../game-models/ownedAreaUnit';
import { Building } from '../game-models/buildings/building';
import { FactoryConfig } from 'src/app/models/configuration/buildings/factoryConfig';
import { TowerConfig } from 'src/app/models/configuration/buildings/bigBuildingsConfig/towerConfig';
import { WallsConfig } from 'src/app/models/configuration/buildings/smallBuildingsConfig/wallsConfig';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { UnderConstructionBuilding } from '../game-models/buildings/underConstructionBuilding';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

@Component({
  selector: 'app-area-description',
  templateUrl: './area-description.component.html',
  styleUrls: ['./area-description.component.css']
})
export class AreaDescriptionComponent implements OnInit {

  constructor(public fieldSelected: SelectedFieldService,
              private buildingSelected: BuildingSelectionService,
              private mapper: BuildingConfigurationMapperService,
              private configInfo: ConfigInfoService) { }

  ngOnInit(): void {
    
  }

  getBuildingSelected(){
    if (this.fieldSelected.isHostile() && !this.buildingSelected.isMain()){
      return "You know nothing about it... yet."
    }
    let selection: number = this.buildingSelected?.currentSelection;

    let building = this.getBuildingByIndex(selection);
    let info = this.getBuildingSpaceDescription(selection);

    if (info == "No building selected."){
      return info;
    }

    if (building != null){
      return info + " " + this.getBuildingsBasicInfo(building);
    }
    return info + " Empty building place"
  }

  getBuildingsBasicInfo(building: Building){
    return "Lvl. " + building.LEVEL + " " + this.transformLabel(building);
  }

  getBuildingsExtendedInfo(){
    let building = this.getBuildingByIndex(this.buildingSelected.currentSelection);
    if (building == null){
      return "----";
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let b = building as UnderConstructionBuilding;
      building = b.buildingUnderConstruction;
    }
    let config = this.mapper.getConfiguration(building);
    if (config == null){
      return "ERROR TO DELETE LATER";
    }
    switch (building.LABEL){
      case "BIG_METAL":
        return this.getMetalFactoryInfo(building, building.LEVEL);
      case "BIG_BUILDING_MATERIALS":
        return this.getBuildingMaterialsFactoryInfo(building, building.LEVEL);
      case "BIG_ELECTRICITY":
        return this.getElectricityFactoryInfo(building, building.LEVEL); 
      case "SMALL_METAL":
        return this.getMetalFactoryInfo(building, building.LEVEL);
      case "SMALL_BUILDING_MATERIALS":
        return this.getBuildingMaterialsFactoryInfo(building, building.LEVEL);  
      case "SMALL_ELECTRICITY":
        return this.getElectricityFactoryInfo(building, building.LEVEL);
      case "TOWER":
        return this.getTowerInfo(building, building.LEVEL);
      case "MAIN_TOWER":
        return this.getTowerInfo(building, building.LEVEL);
      case "ROCKET":
        return "Can be used to destroy towers.";  
      case "WALLS":
        return this.getWallsInfo(building, building.LEVEL);  
      case "DROIDS":
        return "Allows for producing droids.";
      case "TANKS":
        return "Allows for producing tanks.";
      case "CANNONS":
        return "Allows for producting cannons.";
      case "OBSERVATORY":
        return this.getObservatoryInfo();
      }
    return ":D";
  }


  getObservatoryInfo(){
    return "Allows for spying enemy areas and protects this area from being spied.";
  }

  getWallsInfo(building: Building, level: number){
    let message = "Increases defending units strength by ";
    let bonus = this.getWallsUnitsStrength(building, level);
    bonus = Math.floor(bonus*10000)/100;
    message = message + bonus;
    message = message + "% and adds ";
    let def = this.configInfo.getProtection(building, level);
    message = message + def;
    message = message + " points to defence."
    return message;
  }

  getFactoryFirstPart(building: Building, level: number){
    let message: string = "Produces ";
    message += this.configInfo.getProduction(building, level);
    return message;
  }

  getMetalFactoryInfo(building: Building, level: number){
    let message: string = this.getFactoryFirstPart(building, level);
    message = message + " metal per second.";
    return message;
  }

  getBuildingMaterialsFactoryInfo(building: Building, level: number){
    let message: string = this.getFactoryFirstPart(building, level);
    message = message + " materials per second.";
    return message;
  }

  getElectricityFactoryInfo(building: Building, level: number){
    let message: string = this.getFactoryFirstPart(building, level);
    message = message + " electricity per second.";
    return message;
  }

  getTowerInfo(tower: Building, level: number){
    let message: string = "Increases defending units strength by ";
    let bonus: number = this.getWallsUnitsStrength(tower, level);
    bonus = Math.round(bonus*10000);
    bonus = bonus/100;
    message = message + bonus;
    message = message + "%, gives bonus ";
    message = message + this.configInfo.getProduction(tower, level);
    message = message + " points to defence and ";
    message = message + this.configInfo.getAttack(tower, level);
    message = message + " to attack.";
    return message;
  }

  getWallsUnitsStrength(building: Building, level: number){
    let bonus = this.configInfo.getDefenceBonus(building, level);
    return (1 + bonus)*(1 + bonus) - 1;
  }

  getBuildingByIndex(selection: number){
    let mineArea = this.fieldSelected.selectedField as OwnedAreaUnit;
    if (mineArea == null){
      return null;
    }
    switch(selection){
      case 1:
        return this.fieldSelected.selectedField.MAIN_BUILDING;
      case 2:
        return mineArea.NORTH_BUILDING;
      case 3:
        return mineArea.SOUTH_BUILDING;
      case 4:
        return mineArea.WEST_BUILDING;
      case 5:
        return mineArea.EAST_BUILDING;
      case 6:
        return mineArea.WALLS;  
      default:
        return null;            
    }
  }

  getBuildingSpaceDescription(selection: number){
    switch (selection){
      case 0:
        return "No building selected."
      case 1:
        return "Main Building: ";
      case 2:
        return "North Building: ";
      case 3:
        return "South Building: ";
      case 4:
        return "West Building: ";
      case 5:
        return "East Building: ";
      case 6:
        return "Walls: ";
      default:
        return "Unknown";          
    }
  }

  

  getOwnerName(){
    let owner = this.fieldSelected?.selectedField?.OWNER;
    
    if (owner == null){
      return "Uncharted";
    }
    if (!this.fieldSelected.isHostile()){
      return "Your ";
    }
    return owner + "s";
  }

  getAreaDescription(){
    let building = this.fieldSelected?.selectedField?.MAIN_BUILDING;
    if (building == null){
      return "empty area";
    }
    return "Lvl. " + building.LEVEL + " " + this.transformLabel(building);
  }

  transformLabel(building: Building){
    let label;
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      label = ucb.buildingUnderConstruction.LABEL;
    } else {
      label = building.LABEL;
    }

    switch (label){
      case "BIG_ELECTRICITY":
        return "Power Station";
      case "BIG_BUILDING_MATERIALS":
        return "Materials Factory";
      case "BIG_METAL":
        return "Metal Works";
      case "TOWER":
        return "Tower";
      case "MAIN_TOWER":
        return "Main Tower";
      case "ROCKET":
        return "Rocket Launcher";
      case "OBSERVATORY":  
        return "Drone Station";
      case "WALLS":
        return "Walls";
      case "SMALL_BUILDING_MATERIALS":
        return "Small Materials Factory";
      case "SMALL_ELECTRICITY":
        return "Small Power Station";
      case "SMALL_METAL":
        return "Small Metal Works";
      case "DROIDS":
        return "Droid Factory";
      case "TANKS":
        return "Tank Factory";
      case "CANNONS":
        return "Cannon Factory";              
      default:
        return "Unknown building";            
    }
  }

}
