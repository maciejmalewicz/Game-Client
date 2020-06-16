import { Component, OnInit } from '@angular/core';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { BuildingChoiceService } from 'src/app/services/game/rightWindow/building-choice.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingUpgradeEvent } from '../../game-models/postponedEvents/buildingUpgradeEvent';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';
import { Time } from '../../game-models/time';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { PlaceSelectionService } from 'src/app/services/game/rightWindow/place-selection.service';
import { UpgradingBaseService } from 'src/app/services/game/rightWindow/upgrading-base.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

@Component({
  selector: 'app-upgrade-popups',
  templateUrl: './upgrade-popups.component.html',
  styleUrls: ['./upgrade-popups.component.css']
})
export class UpgradePopupsComponent extends UpgradingBaseService implements OnInit {

  constructor(private popupLauncher: PopupsLauncherService, private selectedBuilding: BuildingSelectionService,
    public buildingChoice: BuildingChoiceService, private selectedArea: SelectedFieldService,
    private buildingConfig: BuildingConfigurationMapperService, private configMapper: BuildingConfigurationMapperService,
    private placeSelection: PlaceSelectionService, private configInfo: ConfigInfoService) {
      super();
     }

sendSignal(signal: number){
this.popupLauncher.sendSignal(signal);
}

isResourceFactory(){
  let building = this.selectedArea.get(this.selectedBuilding.currentSelection);
  return this.isBuildingResourceFactory(building);
}

isTower(){
  let building = this.selectedArea.get(this.selectedBuilding.currentSelection);
  return this.isBuildingTower(building);
}

isWalls(){
  return this.selectedBuilding.currentSelection == 6;
}

getCost(){
  let selection = this.selectedBuilding.currentSelection;
  let event = this.selectedArea.getLatestEvent(selection) as BuildingUpgradeEvent;
  let building = this.selectedArea.get(selection);
  if (selection == 6 && building == null){
    return this.getBuildingWallsCost();
  }
  let level = this.getLevelToUpgrade(building, event);
  return this.configInfo.getCost(building, level);
}

private getWallsConfig(){
  return this.configMapper.getSmallBuildingConfig(8);
}

private getBuildingWallsCost(){
  return this.getWallsConfig().LEVEL_ATTRIBUTES[0].COST;
}

private getBuildingWallsTime(){
  return this.getWallsConfig().LEVEL_ATTRIBUTES[0].BUILDING_TIME;
}

getMetalCost(){
  let cost = this.getCost();
  if (cost == null){
    return 0;
  }
  return cost.METAL;
}


getMaterialsCost(){
  let cost = this.getCost();
  if (cost == null){
    return 0;
  }
  return cost.BUILDING_MATERIALS;
}

getElectricityCost(){
  let cost = this.getCost();
  if (cost == null){
    return 0;
  }
  return cost.ELECTRICITY;
}

getTimeString(){
  let time = this.getDuration() as unknown as Time;
  if (time == null){
    return "00:00";
  }
  else {
    return this.buildTimeString(time);
  }
}

private buildTimeString(time: Time){
  let string = "";
  if (time.minutes < 10 || time.minutes == 0){
    string += "0";
  }
  string += time.minutes;
  string += ":";
  if (time.seconds < 10 || time.seconds == 0){
    string += "0";
  }
  string += time.seconds;
  return string;
}

getDuration(){
  let selection = this.selectedBuilding.currentSelection;
  let event = this.selectedArea.getLatestEvent(selection) as BuildingUpgradeEvent;
  let building = this.selectedArea.get(selection);
  if (selection == 6 && building == null){
    return this.getBuildingWallsTime();
  }
  let level = this.getLevelToUpgrade(building, event);
  return this.configInfo.getTime(building, level);
}


getSrc(){
  switch (this.selectedBuilding.currentSelection){
    case 2:
      return "assets/game-graphics/misc/topMarker.png";
    case 3:
      return "assets/game-graphics/misc/bottomMarker.png";
    case 4:
      return "assets/game-graphics/misc/leftMarker.png"; 
    case 5:
      return "assets/game-graphics/misc/rightMarker.png";   
  }
}

ngOnInit(): void {
}

}
