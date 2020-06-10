import { Component, OnInit } from '@angular/core';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { ArmyMovementEvent } from '../game-models/postponedEvents/armyMovementEvents/armyMovementEvent';
import { ArmyTransferEvent } from '../game-models/postponedEvents/armyMovementEvents/armyTrasferEvent';
import { Location } from '../game-models/location';

@Component({
  selector: 'app-army-actions-queue',
  templateUrl: './army-actions-queue.component.html',
  styleUrls: ['./army-actions-queue.component.css']
})
export class ArmyActionsQueueComponent implements OnInit {

  constructor(private selectedField: SelectedFieldService) { }

  ngOnInit(): void {
  }

  getEvents(){
    return this.selectedField?.selectedField?.ARMY_MOVEMENT_QUEUE?.events;
  }

  getSource(event: ArmyMovementEvent){
    console.log(event);
    switch(event.label){
      case "ARMY_TRANSFER_EVENT":
        return this.getArmyTransferSource(event as ArmyTransferEvent);
    }
  }

  private getArmyTransferSource(event: ArmyTransferEvent){
    let currentLocation = this.selectedField.location;
    let startingLocation = event.from;
    if (this.areLocationsEqual(currentLocation, startingLocation)){
      return "assets/game-graphics/misc/transfer-out.png";
    } else {
      return "assets/game-graphics/misc/transfer-in.png";
    }
    
  }

  private areLocationsEqual(loc1: Location, loc2: Location){
    return loc1.row == loc2.row && loc1.col == loc2.col;
  }

  isQueueEmpty(){
    let events = this.getEvents();
    if (events == null){
      return true;
    }
    return this.getEvents().length == 0;
  }

}
