import { Component, OnInit } from '@angular/core';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { OwnedAreaUnit } from '../game-models/ownedAreaUnit';
import { ArmyTrainingEvent } from '../game-models/postponedEvents/armyTrainingEvent';
import { GameTimeService } from 'src/app/services/game/topScreen/game-time.service';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';

@Component({
  selector: 'app-training-queue',
  templateUrl: './training-queue.component.html',
  styleUrls: ['./training-queue.component.css']
})
export class TrainingQueueComponent implements OnInit {

  constructor(public selectedField: SelectedFieldService, private timer: GameTimeService,
    private popupsLauncher: PopupsLauncherService) { }

  trainUnits(){
    this.popupsLauncher.sendSignal(4);
  }  

  getTrainingQueue(){
    let area = this.selectedField?.selectedField as OwnedAreaUnit;
    if (area == null || this.selectedField.isHostile()){
      return null;
    } else {
      return area.TRAINING_QUEUE.events;
    }
  }

  isQueueEmpty(){
    let queue = this.getTrainingQueue();
    if (queue == null){
      return true;
    }
    return queue.length == 0;
  }

  ngOnInit(): void {
    
  }

  getSource(event: ArmyTrainingEvent){
    switch (event.unitType){
      case 1:
        return "/assets/game-graphics/mechs/droid-full.png";
      case 2:
        return "/assets/game-graphics/mechs/tank-full.png";
      case 3:
        return "/assets/game-graphics/mechs/cannon-full.png";  
    }
  }

  getTimeToFinish(event: ArmyTrainingEvent){
    return event.finishingTime - (this.timer.getMinutes()*60+this.timer.getSeconds());
  }

}
