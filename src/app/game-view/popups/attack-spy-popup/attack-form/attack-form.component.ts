import { Component, OnInit } from '@angular/core';
import { Army } from 'src/app/game-view/game-models/battles/army';
import { ArmyTransferBase } from '../../common/armyTransferBase';
import { DoubleFieldSelectorService } from 'src/app/services/game/board/double-field-selector.service';
import { GameInfoService } from 'src/app/services/game/board/game-info.service';
import { AttackService } from 'src/app/services/game/requests/attack.service';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';

@Component({
  selector: 'app-attack-form',
  templateUrl: './attack-form.component.html',
  styleUrls: ['./attack-form.component.css']
})
export class AttackFormComponent extends ArmyTransferBase implements OnInit {

  constructor(protected selector: DoubleFieldSelectorService, private info: GameInfoService,
              private service: AttackService, private popups: PopupsLauncherService) { 
    super(selector);
  }

  attack(){
    let army = this.getRealSendingArmy();
    let usingCommander = false;
    this.service.attack(army, usingCommander);
    this.popups.sendSignal(-3);
  }

  isHostile(){
    return this.selector.target.area.OWNER == null;
  }

  isEnemy(){
    return !this.isHostile() && this.selector.target.area.OWNER != this.info.players.getMyLogin();
  }

  ngOnInit(): void {
  
  }

}
