import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/menu-models/settings';
import { SettingsService } from 'src/app/services/menu/settings.service';
import { KeyEventHandlerService } from 'src/app/services/shared/key-event-handler.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService, private keyListener: KeyEventHandlerService) {
   
   }

   defaultSettingsHidden = false;
   savedSettingsHidden = true;
   customSettingsHidden = true;

   goToDefaultSettings(){
     this.defaultSettingsHidden = false;
     this.savedSettingsHidden = true;
     this.customSettingsHidden = true;
     this.keyListener.state = 0;
   }

   goToSavedSettings(){
     this.defaultSettingsHidden = true;
     this.savedSettingsHidden = false;
     this.customSettingsHidden = true;
     this.keyListener.state = 0;
   }

   goToCustomSettings(){
     this.keyListener.state = 1;
     this.defaultSettingsHidden = true;
     this.savedSettingsHidden = true;
     this.customSettingsHidden = false;
   }
  ngOnInit(): void {

  }

  defaultSettings: Settings = {
    goUp: 119,
    goDown: 115,
    goLeft: 97,
    goRight: 100
  }
  //saved already in database, can't be edited
  savedSettings: Settings;
  //another free memory slot, can be saved into saved settings
  customSettings: Settings;

}
