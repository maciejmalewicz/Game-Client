import { Component, OnInit } from '@angular/core';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { ArmyTrainingBase } from '../../army-training/armyTrainingBase';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

@Component({
  selector: 'app-train-army-popup',
  templateUrl: './train-army-popup.component.html',
  styleUrls: ['./train-army-popup.component.css']
})
export class TrainArmyPopupComponent extends ArmyTrainingBase implements OnInit {

  constructor(private popupLauncher: PopupsLauncherService, protected selectedField: SelectedFieldService,
    private config: ConfigInfoService ) {
    super(selectedField, config);
   }

  unitSelected: number = 0;

  ngOnInit(): void {
  }

  selectUnit(unit: number){
    if (this.unitSelected == unit){
      this.unitSelected = 0;
    } else {
      this.unitSelected = unit;
    }
  }

  sendSignal(signal: number){
    this.popupLauncher.sendSignal(signal);
  }

}
