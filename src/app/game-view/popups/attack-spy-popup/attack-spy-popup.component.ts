import { Component, OnInit } from '@angular/core';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';

@Component({
  selector: 'app-attack-spy-popup',
  templateUrl: './attack-spy-popup.component.html',
  styleUrls: ['./attack-spy-popup.component.css']
})
export class AttackSpyPopupComponent implements OnInit {

  constructor(private popupLauncher: PopupsLauncherService) { 
    popupLauncher.getAttackResetSignals().subscribe(signal => {
      this.resetAction();
    })
  }

  private resetAction(){
    this.selectAction(1);
  }

  ngOnInit(): void {
  }

  selectedAction: number = 1;

  selectAction(action: number){
    this.selectedAction = action;
  }

  sendSignal(signal: number){
    this.popupLauncher.sendSignal(signal);
  }

}
