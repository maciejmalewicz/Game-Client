import { Component, OnInit } from '@angular/core';
import { UpgradeSetService } from 'src/app/services/game/lab/upgrade-set.service';
import { Upgrades } from '../game-models/players/upgrades';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { Army } from '../game-models/battles/army';
import { OwnedAreaUnit } from '../game-models/ownedAreaUnit';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { FactoryConfig } from 'src/app/models/configuration/buildings/factoryConfig';
import { ArmyTrainingService } from 'src/app/services/game/requests/army-training.service';
import { ArmyTrainingBase } from './armyTrainingBase';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

@Component({
  selector: 'app-army-training',
  templateUrl: './army-training.component.html',
  styleUrls: ['./army-training.component.css']
})
export class ArmyTrainingComponent extends ArmyTrainingBase implements OnInit {

  constructor(private upgrades: UpgradeSetService, private selectedField: SelectedFieldService,
              private config: ConfigInfoService, private trainingService: ArmyTrainingService) { 
                super(selectedField, config)
              }

  ngOnInit(): void {
  }

  trainArmy(unitType: number, productionType: number){
    let location = this.selectedField.location;
    this.trainingService.train(location, unitType, productionType);
  }

  getProductionAmount(index: number){
    let unitType = this.getUnitType(index);
    let productionType = this.getProductionType(index);
    return "+" + this.getAmount(unitType, productionType);
  }

  private getProductionType(index: number){
    if (index < 4){
      return 1;
    } else if (index < 7){
      return 2;
    } else {
      return 3;
    }
  }

  private getUnitType(index: number){
    if ((index%3) == 1){
      return 1
    } else if (index%3 == 2){
      return 2
    } else {
      return 3
    }
  }

  getArmy(){
      if (this.selectedField.selectedField == null || this.selectedField.selectedField.OWNER == null || this.selectedField.isHostile()){
        let army: Army = {
          droids: -1,
          tanks: -1,
          cannons: -1
        };
        return army;
      }
      let unit = this.selectedField.selectedField as OwnedAreaUnit;
      return unit.ARMY;
  }

  getDroids(){
    if (this.selectedField.isHostile()){
      return "?";
    }
    return this.getArmy().droids;
  }

  getTanks(){
    if (this.selectedField.isHostile()){
      return "?";
    }
    return this.getArmy().tanks;
  }

  getCannons(){
    if (this.selectedField.isHostile()){
      return "?";
    }
    return this.getArmy().cannons;
  }

  canBeTrained(index: number){
    return this.hasUpgrades(index) && this.hasBuilding(index);
  }


  getSource(index: number){
    if (this.canBeTrained(index)){
      return "/assets/game-graphics/misc/green-button.png";
    }
    else {
      return "/assets/game-graphics/misc/disabled-button.png";
    } 
  }

  private hasBuilding(unitType: number){
    return this.getResponsibleBuilding(unitType) != null;
  }

  private hasUpgrades(index: number){
    if (index == 1){
      return true;
    }
    if (index == 2){
      return this.upgrades.upgraded(Upgrades.TANKS);
    }
    if (index == 3){
      return this.upgrades.upgraded(Upgrades.CANNONS);
    }
    if (index == 4){
      return this.upgrades.upgraded(Upgrades.ASSEMBLY_LINES);
    }
    if (index == 5){
      return this.upgrades.upgraded(Upgrades.TANKS) && this.upgrades.upgraded(Upgrades.ASSEMBLY_LINES);
    }
    if (index == 6){
      return this.upgrades.upgraded(Upgrades.CANNONS) && this.upgrades.upgraded(Upgrades.ASSEMBLY_LINES);
    }
    if (index == 7){
      return this.upgrades.upgraded(Upgrades.MASS_PRODUCTION);
    }
    if (index == 8){
      return this.upgrades.upgraded(Upgrades.TANKS) && this.upgrades.upgraded(Upgrades.MASS_PRODUCTION);
    }
    if (index == 9){
      return this.upgrades.upgraded(Upgrades.CANNONS) && this.upgrades.upgraded(Upgrades.MASS_PRODUCTION);
    }
  }

}
