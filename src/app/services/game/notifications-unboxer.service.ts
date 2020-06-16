import { Injectable } from '@angular/core';
import { NotificationBase } from 'src/app/game-view/game-models/gameResponses/notificationBase';
import { FinishedBuildingNotification } from 'src/app/game-view/game-models/gameResponses/finishedBuildingNotification';
import { GameInfoService } from './board/game-info.service';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { BuildingsFactory } from 'src/app/game-view/game-models/buildings/buildingsFactory';
import { GameTimeService } from './topScreen/game-time.service';
import { FinishedUpgradeNotification } from 'src/app/game-view/game-models/gameResponses/finishedUpgradeNotification';
import { SelectedFieldService } from './board/selected-field.service';
import { Walls } from 'src/app/game-view/game-models/buildings/walls';
import {  ArmyUpdateNotification } from 'src/app/game-view/game-models/gameResponses/armyUpdateNotification';
import { AreaOwnershipNotification } from 'src/app/game-view/game-models/gameResponses/areaOwnershipNotification';
import { AreaDetailsNotification } from 'src/app/game-view/game-models/gameResponses/areaDetailsNotifiaction';
import { UnitConverterService } from './unit-converter.service';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { ArmyTransferNotification } from 'src/app/game-view/game-models/gameResponses/armyTransferNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsUnboxerService {

  constructor(private gameInfo: GameInfoService, private timer: GameTimeService, 
            private selector: SelectedFieldService, private unitConverter: UnitConverterService) { }

  buildingsFactory = new BuildingsFactory();

  unboxNotifications(list: Array<NotificationBase>){
    if (list == null){
      return;
    }
    
    for (let notification of list){
      switch(notification.label){
        case "FINISHED_BUILDING":
          this.unboxFinishedBuilding(notification as FinishedBuildingNotification);
          break;
        case "FINISHED_UPGRADE":
          this.unboxFinishedUpgrade(notification as FinishedUpgradeNotification);
          break;  
        case "ARMY_UPDATE":
          this.unboxArmyUpdate(notification as ArmyUpdateNotification);
          break;
        case "AREA_OWNERSHIP":
          this.unboxAreaOwnership(notification as AreaOwnershipNotification);  
          break;
        case "AREA_DETAILS":
          this.unboxAreaDetails(notification as AreaDetailsNotification);
          break;
        case "ARMY_TRANSFER":
          this.unboxArmyTransfer(notification as ArmyTransferNotification);  
          break;
      }
    }
  }

  private unboxArmyTransfer(notification: ArmyTransferNotification){
    let from = this.gameInfo.getByLocation(notification.from);
    let to = this.gameInfo.getByLocation(notification.to);
    //do stuff...
    this.clearArmyTransfersQueue(from);
    this.clearArmyTransfersQueue(to);
  }

  private unboxAreaDetails(notification: AreaDetailsNotification){
    let unit = this.unitConverter.convertMessage(notification.message);
    this.gameInfo.areaUnits[notification.location.row][notification.location.col] = unit;
  }

  private unboxAreaOwnership(notification: AreaOwnershipNotification){
    let areaUnit = this.gameInfo.getByLocation(notification.location);
    areaUnit.OWNER = notification.owner;
  }

  private unboxArmyUpdate(notification: ArmyUpdateNotification){
    let areaUnit = this.gameInfo.getByLocation(notification.location) as OwnedAreaUnit;
    this.gameInfo.areaUnits[notification.location.row][notification.location.col] as OwnedAreaUnit;
    areaUnit.ARMY = notification.army;
    this.clearTrainingEventQueue(areaUnit);
  }

  private unboxFinishedUpgrade(notification: FinishedUpgradeNotification){
    let areaUnit =
     this.gameInfo.getByLocation(notification.location) as OwnedAreaUnit;
    let building = this.getBuilding(areaUnit, notification.place);
    building.LEVEL = notification.level; 
    //clearing queue
    this.clearEventQueue(areaUnit);
    this.selector.refreshCurrentUpgrades();
  }

  private unboxFinishedBuilding(notification: FinishedBuildingNotification){
    let areaUnit 
    = this.gameInfo.getByLocation(notification.location) as OwnedAreaUnit;
    let building = notification.building;
    this.setNewBuilding(building, notification.place, areaUnit);
    this.clearEventQueue(areaUnit);
    console.log(notification);
  }

  private clearArmyTransfersQueue(areaUnit: AreaUnit){
    areaUnit.ARMY_MOVEMENT_QUEUE.events = areaUnit.ARMY_MOVEMENT_QUEUE.events.filter(e => {
      return this.timer.time < e.finishingTime;
    })
  }

  private clearTrainingEventQueue(areaUnit: OwnedAreaUnit){
    areaUnit.TRAINING_QUEUE.events = areaUnit.TRAINING_QUEUE.events.filter(e => {
      return this.timer.time < e.finishingTime;
    })
  }

  private clearEventQueue(areaUnit: OwnedAreaUnit){
    areaUnit.BUILDING_QUEUE.events = areaUnit.BUILDING_QUEUE.events.filter(e => {
      return this.timer.time < e.finishingTime;
    })
  }

  private setNewBuilding(building: Building, place: number, areaUnit: OwnedAreaUnit){
    switch(place){
      case 1:
        areaUnit.MAIN_BUILDING = building;
        break;
      case 2:
        areaUnit.NORTH_BUILDING = building;
        break;
      case 3:
        areaUnit.SOUTH_BUILDING = building;
        break;
      case 4:
        areaUnit.WEST_BUILDING = building;
        break;
      case 5:
        areaUnit.EAST_BUILDING = building;
        break; 
      case 6:
        areaUnit.WALLS = building as Walls;     
        break;     
    }
  }

  private getBuilding(areaUnit: OwnedAreaUnit, place: number){
    switch(place){
      case 1:
        return areaUnit.MAIN_BUILDING;
      case 2:
        return areaUnit.NORTH_BUILDING;
      case 3:
        return areaUnit.SOUTH_BUILDING;
      case 4:
        return areaUnit.WEST_BUILDING;
      case 5:
        return areaUnit.EAST_BUILDING;    
      case 6:
        return areaUnit.WALLS;   
    }
  }
}
