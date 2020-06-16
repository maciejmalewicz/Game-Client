import { Component, OnInit } from '@angular/core';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { UpgradingBaseService } from 'src/app/services/game/rightWindow/upgrading-base.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';

@Component({
  selector: 'app-upgrade-mech-factory-description',
  templateUrl: './upgrade-mech-factory-description.component.html',
  styleUrls: ['./upgrade-mech-factory-description.component.css']
})
export class UpgradeMechFactoryDescriptionComponent extends UpgradingBaseService implements OnInit {

  constructor(private buildingSelected: BuildingSelectionService, private areaSelected: SelectedFieldService,
    private configInfo: ConfigInfoService, private gameConfig: GameConfigurationService) { 
    super();
  }

  ngOnInit(): void {
  }

  private getBuilding(){
    return this.areaSelected.get(this.buildingSelected.currentSelection);
  }

  private getConfiguration(){
    let building = this.getBuilding();
    let config = this.gameConfig.configuration.smallBuildingsConfig;
    if (building == null){
      return null;
    }
    if (this.hasLabel(building, "DROIDS")){
      return config.droidFactoryConfig;
    }
    if (this.hasLabel(building, "TANKS")){
      return config.tankFactoryConfig;
    }
    if (this.hasLabel(building, "CANNONS")){
      return config.cannonFactoryConfig;
    }
    return null;
  }

  private getLevel(){
    let building = this.getBuilding();
    let event = this.areaSelected.getLatestEvent(this.buildingSelected.currentSelection) as BuildingUpgradeEvent;
    return this.getCurrentLevel(building, event);
  }

  getCurrentLevelAttributes(){
    let config = this.getConfiguration();
    let level = this.getLevel();
    return this.configInfo.getLevelAttributes(config, level);
  }

}
