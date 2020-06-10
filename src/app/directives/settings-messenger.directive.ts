import { Directive, ElementRef } from '@angular/core';
import { SettingsService } from '../services/menu/settings.service';

@Directive({
  selector: '[appSettingsMessenger]'
})
export class SettingsMessengerDirective {

  constructor(private ref: ElementRef, private settingsService: SettingsService) {
    this.settingsService.getSavingSettingsState().subscribe(n => {
      this.reactToState(n);
    })
  }

  sendMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }

  reactToState(state: number){
    let message = "<br/>";
    switch(state){
      case 1:
        message = "Can't bind more than one actions to single key!";
        break;
      case 2:
        message = "Some key is invalid! Search for 'N/A' values and correct them!";
        break;
      case 3:
        message = "No changes detected!";
        break;
      case 4:
        message = "Saving new settings...";
        break;  
      case 0:
        message = "Changes saved! You may check them in 'SAVED SETTINGS' now!";
        break;
    }
    this.sendMessage(message);
  }      

}
