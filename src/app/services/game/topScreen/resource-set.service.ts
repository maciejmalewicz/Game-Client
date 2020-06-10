import { Injectable } from '@angular/core';
import { ResourceSet } from 'src/app/game-view/game-models/players/resourceSet';

@Injectable({
  providedIn: 'root'
})
export class ResourceSetService {

  constructor() { }

  currentResourceSet: ResourceSet = {
    METAL: 0,
    BUILDING_MATERIALS: 0,
    ELECTRICITY: 0
  };

  get(){
    return this.currentResourceSet;
  }

  set(newSet: ResourceSet){
    this.currentResourceSet = newSet;
  }


}
