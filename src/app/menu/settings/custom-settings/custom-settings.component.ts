import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/menu/settings.service';
import { Settings } from 'src/app/models/menu-models/settings';
import { KeyEventHandlerService } from 'src/app/services/shared/key-event-handler.service';

@Component({
  selector: 'app-custom-settings',
  templateUrl: './custom-settings.component.html',
  styleUrls: ['./custom-settings.component.css']
})
export class CustomSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService, private keyListener: KeyEventHandlerService) { 
    this.keyListener.getCodeToSettings().subscribe(code => {
      this.updateMarkedSetting(code);
    });
    this.settingsService.getSavedSettings().subscribe(s => {
      this.updateSetings(s);
    });
  }

  saveSettings(){
    let result = this.validateSettings();
    this.settingsService.pushSavingSettingState(result);
    if (result == 4){
      this.settingsService.saveSettings(this.exportSettings());
    }
  }

  settingMarked: number = -1; //initially -1, so nothing is marked
  //numbers are associated with arrays "settingList" indexes

  private delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async markSetting(index: number){
    this.settingMarked = index;
    await this.delay(5000);
    if (this.settingMarked == index){ //if nothing changes, clear the mark
      this.settingMarked = -1;
    }
  }

  //custom settings update with saved, they are more aboud editing saved
  ngOnInit(): void {
    
  }

  settingList: Array<number> = [];
  settingListTranslated: Array<string> = [];

  updateSetings(settings: Settings){
    this.settingList = new Array<number>();
    this.settingListTranslated = new Array<string>();
    if (settings != null){
      this.settingList.push(settings.goUp);
      this.settingListTranslated.push(this.settingsService.mapToCharacter(settings.goUp));
      this.settingList.push(settings.goLeft);
      this.settingListTranslated.push(this.settingsService.mapToCharacter(settings.goLeft));
      this.settingList.push(settings.goDown);
      this.settingListTranslated.push(this.settingsService.mapToCharacter(settings.goDown));
      this.settingList.push(settings.goRight);
      this.settingListTranslated.push(this.settingsService.mapToCharacter(settings.goRight));
    }
  }

  updateMarkedSetting(newNumber: number){
    if (this.settingMarked != -1){
      this.updateSetting(this.settingMarked, newNumber);
      this.settingMarked = -1;
    }
  }

  updateSetting(index: number, newNumber: number){
    this.settingList[index] = newNumber;
    this.settingListTranslated[index] = this.settingsService.mapToCharacter(newNumber);
  }

  //transform array of numbers into settings
  exportSettings(){
    let settings = {
      goUp: this.settingList[0],
      goLeft: this.settingList[1],
      goDown: this.settingList[2],
      goRight: this.settingList[3]
    }
    return settings;
  }

  validateSettings(): number {
    //bruteforce - screw it, data is small
    //we are lookin for duplicates in array, cuz it's bad idea bind 2 things into one property!
    for (let i = 0; i < this.settingList.length-1; i++){
      for (let j = i + 1; j < this.settingList.length; j++){
        if (this.settingList[i] == this.settingList[j]){
          return 1;
        }
      }
    }
    for (let i = 0; i < this.settingListTranslated.length; i++){
      if (this.settingListTranslated[i] == "N/A"){
        return 2;
      }
    }
    if (!this.settingsAreChanged()){
      return 3;
    }
    
    return 4; //beginnings to save...
  }

  settingsAreChanged(): boolean{
    let other = this.settingsService.savedSettings;
    //if we are creating new settings
    if (other == null){
      return true;
    }
    //if we are changing
    if (this.settingList[0] != other.goUp){
      return true;
    }
    if (this.settingList[1] != other.goLeft){
      return true;
    }
    if (this.settingList[2] != other.goDown){
      return true;
    }
    if (this.settingList[3] != other.goRight){
      return true;
    }
    return false;
  }
}
