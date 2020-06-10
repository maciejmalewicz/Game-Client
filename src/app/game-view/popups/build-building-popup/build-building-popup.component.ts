import { Component, OnInit } from '@angular/core';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { BuildingChoiceService } from 'src/app/services/game/rightWindow/building-choice.service';

@Component({
  selector: 'app-build-building-popup',
  templateUrl: './build-building-popup.component.html',
  styleUrls: ['./build-building-popup.component.css']
})
export class BuildBuildingPopupComponent implements OnInit {

  constructor(private popupLauncher: PopupsLauncherService, private selectedBuilding: BuildingSelectionService,
              public buildingChoice: BuildingChoiceService) { }

  sendSignal(signal: number){
    this.popupLauncher.sendSignal(signal);
  }

  getSrc(){
    switch (this.selectedBuilding.currentSelection){
      case 2:
        return "assets/game-graphics/misc/topMarker.png";
      case 3:
        return "assets/game-graphics/misc/bottomMarker.png";
      case 4:
        return "assets/game-graphics/misc/leftMarker.png"; 
      case 5:
        return "assets/game-graphics/misc/rightMarker.png";   
    }
  }

  ngOnInit(): void {
  }

}
