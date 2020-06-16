import { Component, OnInit } from '@angular/core';
import { UpgradingBaseService } from 'src/app/services/game/rightWindow/upgrading-base.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { ObservatoryLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/observatoryLevelAttributesConfig';

@Component({
  selector: 'app-upgrade-observatory-description',
  templateUrl: './upgrade-observatory-description.component.html',
  styleUrls: ['./upgrade-observatory-description.component.css']
})
export class UpgradeObservatoryDescriptionComponent extends UpgradingBaseService implements OnInit {

  constructor(private buildingSelected: BuildingSelectionService, private areaSelected: SelectedFieldService,
    private configInfo: ConfigInfoService, private gameConfig: GameConfigurationService) { 
    super();
  }

  ngOnInit(): void {
  }

  private getConfiguration(){
    return this.gameConfig.configuration.smallBuildingsConfig.observatoryConfig;
  }

  private getLevel(){
    let building = this.areaSelected.get(this.buildingSelected.currentSelection);
    let event = this.areaSelected.getLatestEvent(this.buildingSelected.currentSelection) as BuildingUpgradeEvent;
    return this.getCurrentLevel(building, event);
  }

  private getCurrentLevelAttributes(){
    let config = this.getConfiguration();
    let level = this.getLevel();
    return this.configInfo.getLevelAttributes(config, level);
  }

  private getNextLevelAttributes(){
    let config = this.getConfiguration();
    let level = this.getLevel()+1;
    return this.configInfo.getLevelAttributes(config, level);
  }

  getBasicChance(){
    let attriutes = this.getCurrentLevelAttributes() as ObservatoryLevelAttributesConfig;
    return attriutes?.BASIC_CHANCE;
  }

  getNextBasicChance(){
    let attriutes = this.getNextLevelAttributes() as ObservatoryLevelAttributesConfig;
    return attriutes?.BASIC_CHANCE;
  }

  private processDistanceChance(attribute: number){
    return 1 - attribute;
  }

  getDistanceChance(){
    let attriutes = this.getCurrentLevelAttributes() as ObservatoryLevelAttributesConfig;
    let attribute =  attriutes?.DISTANCE_CHANCE_REDUCTION_MULTIPLIER;
    return this.processDistanceChance(attribute);
  }

  getNextDistanceChance(){
    let attriutes = this.getNextLevelAttributes() as ObservatoryLevelAttributesConfig;
    let attribute = attriutes?.DISTANCE_CHANCE_REDUCTION_MULTIPLIER;
    return this.processDistanceChance(attribute);
  }

  getChanceProtection(){
    let attriutes = this.getCurrentLevelAttributes() as ObservatoryLevelAttributesConfig;
    return attriutes?.ENEMYS_CHANCE_REDUCTION;
  }

  getNextChanceProtection(){
    let attriutes = this.getNextLevelAttributes() as ObservatoryLevelAttributesConfig;
    return attriutes?.ENEMYS_CHANCE_REDUCTION;
  }

}
