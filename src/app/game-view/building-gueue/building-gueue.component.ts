import { Component, OnInit } from '@angular/core';
import { BuildingQueueService } from 'src/app/services/game/rightWindow/building-queue.service';
import { BuildingImageMapperService } from 'src/app/services/game/rightWindow/building-image-mapper.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { GameTimeService } from 'src/app/services/game/topScreen/game-time.service';
import { OwnedAreaUnit } from '../game-models/ownedAreaUnit';
import { BuildingUpgradeEvent } from '../game-models/postponedEvents/buildingUpgradeEvent';

@Component({
  selector: 'app-building-queue',
  templateUrl: './building-gueue.component.html',
  styleUrls: ['./building-gueue.component.css']
})
export class BuildingGueueComponent implements OnInit {

  constructor(public selectedArea: SelectedFieldService, private mapper: BuildingImageMapperService,
              private timeService: GameTimeService) { }

  ngOnInit(): void {
  }

  getImage(index: number){
    if (this.selectedArea.selectedField != null){
      let field = this.selectedArea?.selectedField as OwnedAreaUnit;
    let event = field.BUILDING_QUEUE?.events[index];
    //let event = this.queue.queue[index];
    let building = event?.building;
    return this.mapper.getImage(building);
    }
    return null;
  }

  getTime(index: number){
    
    let secondsLeft = this.timeService.time;
    let areaUnit = this.selectedArea.selectedField as OwnedAreaUnit;
    secondsLeft = areaUnit.BUILDING_QUEUE.events[index].finishingTime - secondsLeft;
    return secondsLeft;
    // secondsLeft = this.selectedArea.selectedField.BUILDING_QUEUE[index].timeLeft - secondsLeft;
    // return secondsLeft;
  }

  getLevel(index: number){
    let areaUnit = this.selectedArea.selectedField as OwnedAreaUnit;
    let event = areaUnit.BUILDING_QUEUE?.events[index] as BuildingUpgradeEvent;
    if (event.level > 1){
      return event.level;
    }
    return "";
  }

  isEmpty(){
    if (this.selectedArea.isHostile()){
      return false;
    }
    let areaUnit = this?.selectedArea?.selectedField as OwnedAreaUnit;
    if (areaUnit == null || areaUnit.BUILDING_QUEUE?.events.length < 1){
      return true;
    } 
    return false;
  }

  isHostile(){
    return this.selectedArea.isHostile();
  }

}
