import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { FieldSizerService } from '../services/game/rightWindow/field-sizer.service';
import { PlaceSelectionService } from '../services/game/rightWindow/place-selection.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit, AfterViewInit {

  constructor(private notifier: FieldSizerService, public selectedBuilding: PlaceSelectionService){
    
  }
  ngAfterViewInit(): void {
    this.notifier.requestSize();
  }
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  

}
