import { Component, OnInit } from '@angular/core';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { WallsLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/wallsLevelAttributesConfig';
import { TowerLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/towerLevelAttributesConfig';
import { UpgradingBaseService } from 'src/app/services/game/rightWindow/upgrading-base.service';

@Component({
  selector: 'app-upgrade-tower-description',
  templateUrl: './upgrade-tower-description.component.html',
  styleUrls: ['./upgrade-tower-description.component.css']
})
export class UpgradeTowerDescriptionComponent extends UpgradingBaseService implements OnInit {

  constructor(private buildingSelected: BuildingSelectionService, private areaSelected: SelectedFieldService,
    private configInfo: ConfigInfoService, private gameConfig: GameConfigurationService) {
      super();
     }

  ngOnInit(): void {
  }

  private getConfiguration(){
    let building = this.areaSelected.get(this.buildingSelected.currentSelection);
    if (building == null){
      return null;
    }
    let config = this.gameConfig.configuration.bigBuildingsConfig;
    switch (building.LABEL){
      case "TOWER":
        return config.towerConfig;
      case "MAIN_TOWER":
        return config.mainTowerConfig;  
    }
    return null;
  }

  private getLevel(){
    let building = this.areaSelected.get(this.buildingSelected.currentSelection);
    let event = this.areaSelected.getLatestEvent(this.buildingSelected.currentSelection) as BuildingUpgradeEvent;
    return this.getCurrentLevel(building, event);
  }

  private getLevelAttributes(level: number){
    let config = this.getConfiguration();
    return this.configInfo.getLevelAttributes(config, level);
  }

  private getCurrentLevelAttributes(){
    let level = this.getLevel();
    return this.getLevelAttributes(level);
  }

  private getNextLevelAttributes(){
    let level = this.getLevel()+1;
    return this.getLevelAttributes(level);
  }

  getBaseDefence(){
    let attributes = this.getCurrentLevelAttributes() as TowerLevelAttributesConfig;
    return attributes.PROTECTION;
  }

  getNextBaseDefence(){
    let attributes = this.getNextLevelAttributes() as TowerLevelAttributesConfig;
    return attributes.PROTECTION;
  }

  private processUnitStrength(attribute: number){
    return (1+attribute)*(1+attribute) - 1;
  }

  getUnitStrength(){
    let attributes = this.getCurrentLevelAttributes() as TowerLevelAttributesConfig;
    let attribute = attributes.BONUS;
    return this.processUnitStrength(attribute);
  }

  getNextUnitStrength(){
    let attributes = this.getNextLevelAttributes() as TowerLevelAttributesConfig;
    let attribute = attributes.BONUS;
    return this.processUnitStrength(attribute);
  }

  getAttack(){
    let attributes = this.getCurrentLevelAttributes() as TowerLevelAttributesConfig;
    return attributes.DAMAGE;
  }

  getNextAttack(){
    let attributes = this.getNextLevelAttributes() as TowerLevelAttributesConfig;
    return attributes.DAMAGE;
  }
}
