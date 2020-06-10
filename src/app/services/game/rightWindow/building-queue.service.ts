import { Injectable } from '@angular/core';
import { PostponedEvent } from 'src/app/game-view/game-models/postponedEvents/postponedEvent';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { BuildingConstructionEvent } from 'src/app/game-view/game-models/postponedEvents/buildingConstructionEvent';
import { BuildingChoiceService } from './building-choice.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingQueueService {

  constructor() { }

  queue = new Array<BuildingConstructionEvent>();

  addBuilding(event: BuildingConstructionEvent){
    this.queue.push(event);
    this.queue.sort((a, b) => {
      return a.compareWith(b);
    });
    console.log(this.queue);
  }
}
