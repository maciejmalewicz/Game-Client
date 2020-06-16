import { Component, OnInit } from '@angular/core';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { WallsLevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/wallsLevelAttributesConfig';
import { UpgradingBaseService } from 'src/app/services/game/rightWindow/upgrading-base.service';

@Component({
  selector: 'app-upgrade-walls-description',
  templateUrl: './upgrade-walls-description.component.html',
  styleUrls: ['./upgrade-walls-description.component.css']
})
export class UpgradeWallsDescriptionComponent extends UpgradingBaseService implements OnInit {

  constructor(private areaSelected: SelectedFieldService,
    private configInfo: ConfigInfoService, private gameConfig: GameConfigurationService) {
      super();
     }

  ngOnInit(): void {
  }

  private getConfig(){
    return this.gameConfig.configuration.smallBuildingsConfig.wallsConfig;
  }

  private getLevel(){
    let building = this.areaSelected.getWalls(); 
    let event = this.areaSelected.getLatestEvent(6) as BuildingUpgradeEvent;
    return this.getCurrentLevel(building, event);
  }

  private getCurrentLevelAttributes(){
    return this.getLevelAttributes(this.getLevel());
  }

  private getNextLevelAttributes(){
    return this.getLevelAttributes(this.getLevel() + 1);
  }

  private getLevelAttributes(level: number){
    let config = this.getConfig();
    let attributes = this.configInfo.getLevelAttributes(config, level);
    if (attributes == null){
      return this.getZeroLevelAttributes();
    }
    return attributes;
  }


  private getZeroLevelAttributes(){
    let attributes: WallsLevelAttributesConfig = {
      BUILDING_TIME: {
        minutes: 0,
        seconds: 0
      },
      BONUS: 0,
      PROTECTION: 0,
      COST: {
        METAL: 0,
        BUILDING_MATERIALS: 0,
        ELECTRICITY: 0
      }
    }
    return attributes;
  }

  getBaseDefence(){
    let attributes = this.getCurrentLevelAttributes() as WallsLevelAttributesConfig;
    return attributes?.PROTECTION;
  }

  getNextBaseDefence(){
    let attributes = this.getNextLevelAttributes() as WallsLevelAttributesConfig;
    return attributes?.PROTECTION;
  }

  private processUnitStrength(attribute: number){
    return (1+attribute)*(1+attribute) - 1;
  }

  getUnitStrength(){
    let attributes = this.getCurrentLevelAttributes() as WallsLevelAttributesConfig;
    let bonus = attributes.BONUS;
    return this.processUnitStrength(bonus);
  }

  getNextUnitStrength(){
    let attributes = this.getNextLevelAttributes() as WallsLevelAttributesConfig;
    let bonus = attributes.BONUS;
    return this.processUnitStrength(bonus);
  }

}
