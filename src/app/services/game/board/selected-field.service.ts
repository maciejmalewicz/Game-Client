import { Injectable } from '@angular/core';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { Subject, Observable } from 'rxjs';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { Location } from 'src/app/game-view/game-models/location';
import { LoginService } from '../../login.service';
import { GameInfoService } from './game-info.service';
import { GameConfigurationService } from '../game-configuration.service';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { UpgradingInfo } from 'src/app/game-view/game-models/buildings/upgradingInfo';
import { OwnedAreaUnitMessage } from 'src/app/game-view/game-models/ownedAreaUnitMessage';
import { UpgradingBaseService } from '../rightWindow/upgrading-base.service';
import { SmallBuilding } from 'src/app/game-view/game-models/buildings/smallBuilding';

@Injectable({
  providedIn: 'root'
})
export class SelectedFieldService extends UpgradingBaseService{

  constructor(private datasource: GameInfoService, private logService: LoginService,
              private config: GameConfigurationService) {
                super();
               }

  public selectedField: AreaUnit;

  fieldSubject = new Subject<AreaUnit>();
  location: Location;
  currentUpgradesSubject = new Subject<UpgradingInfo>();

  getFieldUpdates(): Observable<AreaUnit>{
    return this.fieldSubject.asObservable();
  }

  isBuildingUpgraded(place: number){
    let event = this.getLatestEvent(place);
    if (event == null){
      return false;
    }
    let upgrading = event as BuildingUpgradeEvent;
    return upgrading.level > 1;
  }

  //concerning particular building
  getLatestEvent(place: number){
    let areaUnit = this?.selectedField as OwnedAreaUnit;
    let queue = areaUnit?.BUILDING_QUEUE?.events;
    if (queue == null){
      return;
    }
    
    for (let i = queue.length-1; i >= 0; i--){
      if (queue[i].place == place){
        return queue[i];
      }
    }

    return null;
  }

  canWallsBeUpgraded(){
    if (this.isHostile()){
      return false;
    }
    if (this.getWalls() == null){ //nothing has been built yet and it's your field
      return true;
    }
    let building = this.getWalls();
    let event = this.getLatestEvent(6) as BuildingUpgradeEvent;
    let level = this.getLevelToUpgrade(building, event);
    if (level > this.config.configuration.smallBuildingsConfig.wallsConfig.MAX_LEVEL){
      return false; //walls are already on level max
    }
    //todo!!!
    return true;
  }

  isHostile(){
    let owner = this.selectedField?.OWNER;
    if (owner == null){
      return true;
    } 
    else {
      return owner != this.logService.login;
    }
  }

  get(n: number){
    switch(n){
      case 1:
        return this.getMain();
      case 2:
        return this.getNorth();
      case 3:
        return this.getSouth();
      case 4:
        return this.getWest();
      case 5:
        return this.getEast();
      case 6:
        return this.getWalls();          
    }
  }

  getWalls(){
    let field = this.selectedField as OwnedAreaUnit;
    return field?.WALLS;
  }

  getMain(){
    let field = this.selectedField as OwnedAreaUnit;
    return field?.MAIN_BUILDING;
  }

  getExistingSmallBuildings(){
    let buildings = new Array<SmallBuilding>();
    let north = this.getNorth();
    if (north != null){
      buildings.push(north);
    }
    let south = this.getSouth();
    if (south != null){
      buildings.push(south);
    }
    let west = this.getWest();
    if (west != null){
      buildings.push(west);
    }
    let east = this.getEast();
    if (east != null){
      buildings.push(east);
    }
    return buildings;
  }

  getNorth(){
    let field = this.selectedField as OwnedAreaUnit;
    return field?.NORTH_BUILDING;
  }

  getSouth(){
    let field = this.selectedField as OwnedAreaUnit;
    return field?.SOUTH_BUILDING;
  }

  getWest(){
    let field = this.selectedField as OwnedAreaUnit;
    return field?.WEST_BUILDING;
  }

  getEast(){
    let field = this.selectedField as OwnedAreaUnit;
    return field?.EAST_BUILDING;
  }

  select(row: number, col: number){
    this.selectedField = this.datasource.areaUnits[row][col];
    this.fieldSubject.next(this.selectedField);
    //this.buildingSelector.pushSelection(0); //reseting selected building
    this.location = {
      row: row,
      col: col
    }
    this.refreshCurrentUpgrades();
    
  }

  getUpgradesUpdates(){
    return this.currentUpgradesSubject.asObservable();
  }

  refreshCurrentUpgrades(){
    let upgradingInfo: UpgradingInfo = new UpgradingInfo();
    upgradingInfo.b1 = this.isBuildingUpgraded(1);
    upgradingInfo.b2 = this.isBuildingUpgraded(2);
    upgradingInfo.b3 = this.isBuildingUpgraded(3);
    upgradingInfo.b4 = this.isBuildingUpgraded(4);
    upgradingInfo.b5 = this.isBuildingUpgraded(5);
    this.currentUpgradesSubject.next(upgradingInfo);
  }

}
