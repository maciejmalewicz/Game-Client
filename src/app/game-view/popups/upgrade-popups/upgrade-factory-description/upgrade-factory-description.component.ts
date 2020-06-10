import { Component, OnInit } from '@angular/core';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { FactoryConfig } from 'src/app/models/configuration/buildings/factoryConfig';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

@Component({
  selector: 'app-upgrade-factory-description',
  templateUrl: './upgrade-factory-description.component.html',
  styleUrls: ['./upgrade-factory-description.component.css']
})
export class UpgradeFactoryDescriptionComponent implements OnInit {

  constructor(private buildingSelected: BuildingSelectionService, private areaSelected: SelectedFieldService,
              private configInfo: ConfigInfoService) { }

  ngOnInit(): void {
  }

  getSource(){
    let label = this.areaSelected.get(this.buildingSelected.currentSelection).LABEL;
    if (label == "BIG_METAL" || label == "SMALL_METAL"){
      return "assets/game-graphics/misc/upgrades/metal-production.png"
    } else if (label == "BIG_BUILDING_MATERIALS" || label == "SMALL_BUILDING_MATERIALS"){
      return "assets/game-graphics/misc/upgrades/materials-production.png"
    } else if (label == "BIG_ELECTRICITY" || label == "SMALL_ELECTRICITY"){
      return "assets/game-graphics/misc/upgrades/electricity-production.png"
    }
    return "Unknown";
  }

  getProduction(){
    let building = this.areaSelected.get(this.buildingSelected.currentSelection);
    let level = this.getLevel();
    return this.configInfo.getProduction(building, level);
  }

  getNextProduction(){
    let building = this.areaSelected.get(this.buildingSelected.currentSelection);
    let level = this.getLevel() + 1;
    return this.configInfo.getProduction(building, level);
  }

  private getLevel(){
    let building = this.areaSelected.get(this.buildingSelected.currentSelection);
    let level;
    let event = this.areaSelected.getLatestEvent(this.buildingSelected.currentSelection) as BuildingUpgradeEvent;
    if (event == null){
      level = building.LEVEL;
    } else {
      level = event.level;
    }
    return level;
  }



}
