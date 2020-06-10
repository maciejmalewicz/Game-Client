import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { SelectedFieldService } from '../board/selected-field.service';
import { BuildingSelectionService } from './building-selection.service';


@Injectable({
  providedIn: 'root'
})
export class BuildingChoiceService {

  constructor(private buildingSelection: BuildingSelectionService, private areaSelection: SelectedFieldService) { }

  currentSelection: number = 0;
  selection = new Subject<number>();
  
  getSelections(): Observable<number>{
    return this.selection.asObservable();
  }

  pushSelection(selection: number){
    this.selection.next(selection);
    this.currentSelection = selection;
  }
}
