import { Component, OnInit } from '@angular/core';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { DoubleFieldSelectorService } from 'src/app/services/game/board/double-field-selector.service';
import { SelectorContext } from '@angular/compiler';
import { OwnedAreaUnit } from '../../game-models/ownedAreaUnit';
import { Army } from '../../game-models/battles/army';
import { ArmyTransferService } from 'src/app/services/game/requests/army-transfer.service';
import { ArmyTransferBase } from '../common/armyTransferBase';


@Component({
  selector: 'app-transfer-army-popup',
  templateUrl: './transfer-army-popup.component.html',
  styleUrls: ['./transfer-army-popup.component.css']
})
export class TransferArmyPopupComponent extends ArmyTransferBase implements OnInit {

  constructor(private popupLauncher: PopupsLauncherService, protected selector: DoubleFieldSelectorService,
            private service: ArmyTransferService) {
              super(selector);
             }

  sendSignal(signal: number){
    this.popupLauncher.sendSignal(signal);
  }

  transferArmy(){
    let army = this.getRealSendingArmy();
    this.service.transferArmy(army);
    this.popupLauncher.sendSignal(-2);
  }

  getSecondUnitsAfterTransfer(index: number){
    return this.getRealAmountFromTransfer(index) + this.getSecondUnits(index);
  }

  ngOnInit(): void {
  }

}
