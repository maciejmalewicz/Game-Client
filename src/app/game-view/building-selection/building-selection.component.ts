import { Component, OnInit } from '@angular/core';
import { BuildingChoiceService } from 'src/app/services/game/rightWindow/building-choice.service';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { PlaceSelectionService } from 'src/app/services/game/rightWindow/place-selection.service';
import { BuildBuildingService } from 'src/app/services/game/requests/build-building.service';
import { BuildSmallBuildingRequest } from '../game-models/requests/buildSmallBuildingRequest';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { ResourceSetService } from 'src/app/services/game/topScreen/resource-set.service';
import { UpgradeSetService } from 'src/app/services/game/lab/upgrade-set.service';
import { GameTimeService } from 'src/app/services/game/topScreen/game-time.service';
import { BuildingSelectionBase } from './building-selection-base';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';

@Component({
  selector: 'app-building-selection',
  templateUrl: './building-selection.component.html',
  styleUrls: ['./building-selection.component.css']
})
export class BuildingSelectionComponent extends BuildingSelectionBase {

  constructor(private selection: BuildingChoiceService,
              protected selectedArea: SelectedFieldService, private selectedPlace: PlaceSelectionService,
              private buildService: BuildBuildingService, private popups: PopupsLauncherService,
              protected resources: ResourceSetService, protected upgradeSet: UpgradeSetService,
              protected gameTime: GameTimeService, protected configInfo: ConfigInfoService,
              protected configMapper: BuildingConfigurationMapperService) { 

                super(upgradeSet, gameTime, resources, selectedArea, configInfo, configMapper);
     selection.getSelections().subscribe(newSel => {
       this.currentSelection = newSel;
     })
  }

  build(){
    let request: BuildSmallBuildingRequest = {
      location: this.selectedArea.location,
      place: this.selectedPlace.selection,
      building: this.selection.currentSelection
    }
    this.buildService.buildSmallBuilding(request);
    this.popups.sendSignal(-1);
  }


}
