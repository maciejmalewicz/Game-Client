import { Injectable } from '@angular/core';
import { GameInfoService } from './board/game-info.service';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { OwnedAreaUnitMessage } from 'src/app/game-view/game-models/ownedAreaUnitMessage';
import { PostponedEventMessage } from 'src/app/game-view/game-models/postponedEvents/postponedEventMessage';
import { BuildingConstructionEvent } from 'src/app/game-view/game-models/postponedEvents/buildingConstructionEvent';
import { BuildingConstructionEventMessage } from 'src/app/game-view/game-models/postponedEvents/buildingConstructionEventMessage';
import { BuildingUpgradeEventMessage } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEventMessage';
import { BuildingQueue } from 'src/app/game-view/game-models/buildingQueue';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { ArmyTrainingEventMessage } from 'src/app/game-view/game-models/postponedEvents/armyTrainingEventMessage';
import { ArmyTrainingEvent } from 'src/app/game-view/game-models/postponedEvents/armyTrainingEvent';
import { TrainingQueue } from 'src/app/game-view/game-models/trainingQueue';
import { ArmyTransferEvent } from 'src/app/game-view/game-models/postponedEvents/armyMovementEvents/armyTrasferEvent';
import { ArmyMovementQueue } from 'src/app/game-view/game-models/armyMovementQueue';
import { ArmyMovementEvent } from 'src/app/game-view/game-models/postponedEvents/armyMovementEvents/armyMovementEvent';
import { ArmyTransferEventMessage } from 'src/app/game-view/game-models/postponedEvents/armyMovementEvents/armyTransferEventMessage';

@Injectable({
  providedIn: 'root'
})
export class UnitConverterService {

  constructor(private datasource: GameInfoService) { }

  convertMessage(toConvert: OwnedAreaUnitMessage): AreaUnit{
    //is hostile
    if (this.isAreaUnitHostile(toConvert)){
      return this.convertHostileAreaUnit(toConvert);
    } else {
      return this.convertOwnedAreaUnit(toConvert);
    }
  }

  private convertHostileAreaUnit(toConvert: OwnedAreaUnitMessage): AreaUnit {

    let unit: AreaUnit = {
      MAIN_BUILDING: toConvert.MAIN_BUILDING,
      OWNER: toConvert.OWNER,
      ARMY_MOVEMENT_QUEUE: {
        events: new Array<ArmyMovementEvent>()
      }
    }
    this.fillArmyMovementQueue(toConvert, unit);
    
    return unit;
  }

  private fillArmyMovementQueue(message: OwnedAreaUnitMessage, area: AreaUnit){
    for (let eventMessage of message.AREA_EVENTS.events){
      if (this.isArmyMovementEvent(eventMessage.label)){
        let msg = eventMessage as ArmyMovementEvent;
        let event = this.convertArmyMovementEvent(msg);
        area.ARMY_MOVEMENT_QUEUE.events.push(event);
      }
    }
  }

  private convertArmyMovementEvent(toConvert: ArmyMovementEvent){
    if (toConvert.label == ArmyTransferEvent.commonLabel){
      let event = this.messageToArmyTransferEvent(toConvert as ArmyTransferEventMessage);
      return event;
    }
    return null;
  }

  private isArmyMovementEvent(label: string){
    return label == ArmyTransferEvent.commonLabel;
  }

  private convertOwnedAreaUnit(toConvert: OwnedAreaUnitMessage): OwnedAreaUnit {
    let buildingQueue: BuildingQueue = {
      events: new Array<BuildingConstructionEvent>()
    }
    let trainingQueue: TrainingQueue = {
      events: new Array<ArmyTrainingEvent>()
    }
    let armyMovementsQueue: ArmyMovementQueue = {
      events: new Array<ArmyMovementEvent>(),
    }
    let ownedAreaUnit: OwnedAreaUnit = {
      WALLS: toConvert.WALLS,
      ARMY: toConvert.ARMY,
      MAIN_BUILDING: toConvert.MAIN_BUILDING,
      NORTH_BUILDING: toConvert.NORTH_BUILDING,
      SOUTH_BUILDING: toConvert.SOUTH_BUILDING,
      WEST_BUILDING: toConvert.WEST_BUILDING,
      EAST_BUILDING: toConvert.EAST_BUILDING,
      OWNER: toConvert.OWNER,
      BUILDING_QUEUE: buildingQueue,
      TRAINING_QUEUE: trainingQueue,
      ARMY_MOVEMENT_QUEUE: armyMovementsQueue
    }
    for (let event of toConvert.AREA_EVENTS.events){
      this.matchEventToQueues(event, ownedAreaUnit);
    }
    this.fillArmyMovementQueue(toConvert, ownedAreaUnit);
    this.attachEventsToBuildings(ownedAreaUnit);
    
    return ownedAreaUnit;
  }


  private attachEventsToBuildings(unit: OwnedAreaUnit){
    for (let event of unit.BUILDING_QUEUE.events){
      switch(event.place){
        case 1:
          event.building = unit.MAIN_BUILDING;
          break;
        case 2:
          event.building = unit.NORTH_BUILDING;
          break;  
        case 3:
          event.building = unit.SOUTH_BUILDING;
          break;
        case 4:
          event.building = unit.WEST_BUILDING;
          break;
        case 5:
          event.building = unit.EAST_BUILDING;
          break;
        case 6:
          event.building = unit.WALLS;
          break;          
      }
    }
  }

  private matchEventToQueues(eventMessage: PostponedEventMessage, unit: OwnedAreaUnit){
    if (eventMessage.label == "BUILDING_EVENT"){
      let msg = eventMessage as BuildingConstructionEventMessage;
      let event = this.messageToBuildingEvent(msg);
      unit.BUILDING_QUEUE.events.push(event);
    }

    if (eventMessage.label == "UPGRADE_EVENT"){
      let msg = eventMessage as BuildingUpgradeEventMessage;
      let event = this.messageToUpgradeEvent(msg);
      unit.BUILDING_QUEUE.events.push(event);
    }

    if (eventMessage.label == "ARMY_TRAINING_EVENT"){
      let msg = eventMessage as ArmyTrainingEventMessage;
      let event = this.messageToArmyTrainingEvent(msg);
      unit.TRAINING_QUEUE.events.push(event);
    }
  }

  private messageToArmyTransferEvent(message: ArmyTransferEventMessage){
    let event = new ArmyTransferEvent();
    event.finishingTime = message.finishingTime;
    event.army = message.army;
    event.label = ArmyTransferEvent.commonLabel;
    event.to = message.to;
    event.from = message.from;
    event.fromArea = this.datasource.getUnit(message.from);
    event.toArea = this.datasource.getUnit(message.to);
    return event;
  }

  private messageToBuildingEvent(message: BuildingConstructionEventMessage){
    let event = new BuildingConstructionEvent();
    event.building = message.building;
    event.place = message.place;
    event.finishingTime = message.finishingTime;
    return event;
}

private messageToUpgradeEvent(message: BuildingUpgradeEventMessage){
  let event = new BuildingUpgradeEvent();
  event.building = message.building;
  event.place = message.place;
  event.finishingTime = message.finishingTime;
  event.level = message.level;
  return event;
}

private messageToArmyTrainingEvent(message: ArmyTrainingEventMessage){
  let event = new ArmyTrainingEvent();
  event.finishingTime = message.finishingTime;
  event.quantity = message.quantity;
  event.unitType = message.unitType;
  return event;
} 

  convert(toConvert: AreaUnit): AreaUnit{
    console.log("converting")
    if (toConvert.OWNER != this.datasource.players.getMyLogin()){
      let out = toConvert as AreaUnit;
      //console.log(out);
      return out;
    } else {
      toConvert.OWNER = this.datasource.players.getMyLogin();
      let response = toConvert as OwnedAreaUnit;
      //console.log(toConvert);
      return response;
    }
  }

  private isAreaUnitHostile(unit: OwnedAreaUnitMessage): boolean{
    return unit.OWNER == null || unit.OWNER != this.datasource.players.getMyLogin(); 
  }

}
