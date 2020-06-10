import { Component, OnInit } from '@angular/core';
import { Time } from '../game-models/time';
import { BuildSmallBuildingRequest } from '../game-models/requests/buildSmallBuildingRequest';
import { BuildingChoiceService } from 'src/app/services/game/rightWindow/building-choice.service';
import { GameConfigurationService } from 'src/app/services/game/game-configuration.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { PlaceSelectionService } from 'src/app/services/game/rightWindow/place-selection.service';
import { BuildBuildingService } from 'src/app/services/game/requests/build-building.service';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { GameInfoService } from 'src/app/services/game/board/game-info.service';
import { ResourceSetService } from 'src/app/services/game/topScreen/resource-set.service';
import { UpgradeSetService } from 'src/app/services/game/lab/upgrade-set.service';
import { Upgrades } from '../game-models/players/upgrades';
import { GameTimeService } from 'src/app/services/game/topScreen/game-time.service';
import { BuildingSelectionBase } from '../building-selection/building-selection-base';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';

@Component({
  selector: 'app-quickbuild',
  templateUrl: './quickbuild.component.html',
  styleUrls: ['./quickbuild.component.css']
})
export class QuickbuildComponent extends BuildingSelectionBase {

  constructor(private selection: BuildingChoiceService,
    protected selectedArea: SelectedFieldService, private buildService: BuildBuildingService, 
    private popups: PopupsLauncherService, protected resources: ResourceSetService,
    protected upgradeSet: UpgradeSetService, protected gameTime: GameTimeService,
    protected configInfo: ConfigInfoService, protected configMapper: BuildingConfigurationMapperService) {
      super(upgradeSet, gameTime, resources, selectedArea, configInfo, configMapper);
    selection.getSelections().subscribe(newSel => {
      this.currentSelection = newSel;
    })
  }

  getFirstFreePlace(): number{
    for (let i = 2; i < 6; i++){
      if (this.selectedArea.get(i) == null){
        return i;
      }
    }
    return -1;
  }


  build() {
    if (!this.canBeBuilt(this.selection.currentSelection)){
      return;
    }
    let request: BuildSmallBuildingRequest = {
      location: this.selectedArea.location,
      place: this.getFirstFreePlace(),
      building: this.selection.currentSelection
    }
    this.buildService.buildSmallBuilding(request);
    this.popups.sendSignal(-1);
  }

  canBeBuilt(index: number){
    if (this.getFirstFreePlace() == -1){
      return false;
    }
    return super.canBeBuilt(index);
  }

}
