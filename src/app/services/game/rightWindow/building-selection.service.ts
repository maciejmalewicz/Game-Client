import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { SelectedFieldService } from '../board/selected-field.service';
import { BuildingConfigurationMapperService } from './building-configuration-mapper.service';
import { BigBuildingsConfig } from 'src/app/models/configuration/buildings/bigBuildingsConfig/bigBuildingsConfig';
import { BuildingConfigurationBase } from 'src/app/models/configuration/buildings/buildingConfigurationBase';
import { UpgradingBaseService } from './upgrading-base.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { UpgradeSetService } from '../lab/upgrade-set.service';
import { Upgrades } from 'src/app/game-view/game-models/players/upgrades';
import { LevelAttributesConfig } from 'src/app/models/configuration/buildings/levelAttributes/levelAttributesConfig';


@Injectable({
  providedIn: 'root'
})
export class BuildingSelectionService extends UpgradingBaseService {

  constructor(private areaSelection: SelectedFieldService, private mapper: BuildingConfigurationMapperService,
    private upgrades: UpgradeSetService){ 
    super();
    areaSelection.getFieldUpdates().subscribe(update => {
      this.pushSelection(0);
    })
   }

  selection = new Subject<number>();
  currentSelection: number = 0;

  getSelections(): Observable<number>{
    return this.selection.asObservable();
  }

  canBeUpgraded(n: number){
    if (n != this.currentSelection){
      return false;
    }
    if (this.areaSelection.isHostile()){
      return false;
    }
    if (this.getSelectedBuilding() == null){
      return false;
    }
    let building = this.areaSelection.get(this.currentSelection);
    let event = this.areaSelection.getLatestEvent(this.currentSelection) as BuildingUpgradeEvent;
    let level = this.getLevelToUpgrade(building, event);
    let config = this.mapper.getConfiguration(building) as BuildingConfigurationBase<LevelAttributesConfig>;
    if (level > config.MAX_LEVEL){
      return false;
    }
    if (!this.hasNecessaryUpgrades(level)){
      return false;
    }
    return true;
  }

  hasNecessaryUpgrades(level: number){
    let isFactory: boolean = this.isBuildingSmallResourceFactory(this.areaSelection.get(this.currentSelection));
    let hasSpaceManagement: boolean = this.upgrades.upgraded(Upgrades.SPACE_MANAGEMENT);
    if (isFactory && level > 3 && !hasSpaceManagement){
      return false;
    }
    return true;
  }

  canBuildHere(){
    if (this.areaSelection.isHostile()){
      return false;
    }
    if (this.currentSelection == 6 || this.currentSelection == 0){
      return false; //don't show for walls
    }
    let building = this.getSelectedBuilding();
    if (building == null){
      return true;
    }
    return false;
  }

  getSelectedBuilding(){
    let unit = this.areaSelection?.selectedField as OwnedAreaUnit;
    if (unit == null){
      return null;
    }
    switch (this.currentSelection){
      case 1:
        return unit?.MAIN_BUILDING;
      case 2:
        return unit?.NORTH_BUILDING;
      case 3:
        return unit?.SOUTH_BUILDING;
      case 4:
        return unit?.WEST_BUILDING;
      case 5:
        return unit?.EAST_BUILDING;
      case 6:
        return unit?.WALLS;
      default:
        return null;  
    }
  }

  isMain(){
    return this.currentSelection == 1;
  }

  pushSelection(n: number){
    this.selection.next(n);
    this.currentSelection = n;
    console.log(this.currentSelection);
  }
}
