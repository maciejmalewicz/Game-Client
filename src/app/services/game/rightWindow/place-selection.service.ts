import { Injectable } from '@angular/core';
import { SelectedFieldService } from '../board/selected-field.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceSelectionService {

  constructor(private areaSelection: SelectedFieldService) {
    areaSelection.getFieldUpdates().subscribe(update => {
      this.selection = 0; //clearing building selection
    })
  }

  selection: number = 0;

  pushSelection(n: number){
    this.selection = n;
  }

  canBuildHere(){
    if (this.areaSelection.isHostile()){
      return false;
    }
    if (this.selection < 1 || this.selection > 5){
      return false; //don't show for walls
    }
    let building = this.getBuilding();
    if (building == null){
      return true;
    }
    return false;
  }

  getBuilding(){
    switch(this.selection){
      case 1:
        return this.areaSelection.selectedField?.MAIN_BUILDING;
      case 2:
        return this.areaSelection.getNorth();
      case 3:
        return this.areaSelection.getSouth();
      case 4:
        return this.areaSelection.getWest();
      case 5:
        return this.areaSelection.getEast();
      case 6:
        return this.areaSelection.getWalls();  
      default:
        return null;          
    }
  }
}
