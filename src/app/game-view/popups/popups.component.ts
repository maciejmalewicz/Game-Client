import { Component, OnInit } from '@angular/core';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';

@Component({
  selector: 'app-popups',
  templateUrl: './popups.component.html',
  styleUrls: ['./popups.component.css']
})
export class PopupsComponent implements OnInit {



  showPopups: Array<boolean> = [false, false, false, false];

  constructor(private launchSignals: PopupsLauncherService) {
    launchSignals.getSignals().subscribe(signal => {
      this.handleSignal(signal);
    })
  }

  private handleSignal(signal: number){
    switch(signal){
      //building popup
      case 1:
        this.showPopups[0] = true;
        break;
      case -1:
        this.showPopups[0] = false;
        break;  
      //army transfering popups
      case 2:
        this.showPopups[1] = true;
        break;
      case -2:
        this.showPopups[1] = false;  
        break;
      //attacks  
      case 3:
        this.showPopups[2] = true;
        break;
      case -3:
        this.showPopups[2] = false;
        break; 
      //army training
      case 4:
        this.showPopups[3] = true;
        break;
      case -4:
        this.showPopups[3] = false;
        break;       
    }
  }

  ngOnInit(): void {
    
  }

  sendSignal(signal: number){
    this.launchSignals.sendSignal(signal);
  }

}
