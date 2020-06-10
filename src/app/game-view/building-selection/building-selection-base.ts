import { UpgradeSetService } from 'src/app/services/game/lab/upgrade-set.service';
import { Upgrades } from '../game-models/players/upgrades';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { Time } from '../game-models/time';
import { GameTimeService } from 'src/app/services/game/topScreen/game-time.service';
import { ResourceSetService } from 'src/app/services/game/topScreen/resource-set.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';

export class BuildingSelectionBase{

    constructor(protected upgradeSet: UpgradeSetService,
                protected gameTime: GameTimeService, protected resources: ResourceSetService,
                protected selectedArea: SelectedFieldService, protected configInfo: ConfigInfoService,
                protected configMapper: BuildingConfigurationMapperService){

    }

    protected currentSelection: number = 0;

    areUpgradesDone(building: number){
        if (building == 6){
          return this.upgradeSet.upgraded(Upgrades.TANKS);
        }
        if (building == 7){
          return this.upgradeSet.upgraded(Upgrades.CANNONS);
        }
        return true;
      }

      selectBuilding(index: number){
        this.currentSelection = index;
      }

      protected getTimeOfBuilding(building: number): Time{
        let config = this.configMapper.getSmallBuildingConfig(building);
        return this.configInfo.getTimeByConfig(config, 1);
      }

      protected hasStillTime(building: number){
        let timeOfBuilding = this.getTimeOfBuilding(building);
        let secondsOfBuilding = timeOfBuilding.seconds + timeOfBuilding.minutes*60;
    
        let gameTimeSeconds = this.gameTime.getMinutes()*60 + this.gameTime.getSeconds();
        let totalSeconds = gameTimeSeconds + secondsOfBuilding;
        return totalSeconds < 3600; //MAYBE CHANGE IT LATER!
      }

      getBuildingName() {
        switch (this.currentSelection) {
          case 0:
            return "--";
          case 1:
            return "Metal Works";
          case 2:
            return "BM Factory";
          case 3:
            return "Power Station";
          case 4:
            return "Drone Tower";
          case 5:
            return "Droid Factory";
          case 6:
            return "Tank Factory";
          case 7:
            return "Cannon Factory";
        }
      }

      protected processTime(time: Time): string{
        if (time == null) {
          return "00:00";
        }
        let t = time as Time;
        let str = "";
        if (t.minutes < 10) {
          str += "0";
        }
        str += t.minutes;
        str += ":";
        if (t.seconds < 10) {
          str += "0";
        }
        str += t.seconds;
        return str;
      }

      protected getCostByBuilding(n: number){
        let configuration = this.configMapper.getSmallBuildingConfig(n);
        return this.configInfo.getCostByConfig(configuration, 1);
      }

      getCost() {
        return this.getCostByBuilding(this.currentSelection);
      }

      getMetalCost() {
        let cost = this.getCost();
        if (cost == null) {
          return 0;
        }
        return this.getCost().METAL;
      }
    
      getBuildingMaterialsCost() {
        let cost = this.getCost();
        if (cost == null) {
          return 0;
        }
        return this.getCost().BUILDING_MATERIALS;
      }
    
      getElectricityCost() {
        let cost = this.getCost();
        if (cost == null) {
          return 0;
        }
        return this.getCost().ELECTRICITY;
      }

      canAffordIt(building: number){
        let cost = this.getCostByBuilding(building);
        if (cost.METAL > this.resources.currentResourceSet.METAL){
          return false;
        }
        if (cost.BUILDING_MATERIALS > this.resources.currentResourceSet.BUILDING_MATERIALS){
          return false;
        }
        if (cost.ELECTRICITY > this.resources.currentResourceSet.ELECTRICITY){
          return false;
        }
        return true;
      }

      getDuration() {
        let time = this.getTimeOfBuilding(this.currentSelection);
        return this.processTime(time);
      }

      canBeBuilt(building: number){
        if (this.selectedArea.isHostile()){
          return false;
        }
        if (!this.canAffordIt(building)){
          return false;
        }
        if (!this.areUpgradesDone(building)){
          return false;
        }
        if (!this.hasStillTime(building)){
          return false;
        }
        return true;
      }

}