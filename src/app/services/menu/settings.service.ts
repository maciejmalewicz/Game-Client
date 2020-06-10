import { Injectable } from '@angular/core';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { HttpClient } from '@angular/common/http';
import { CodeHandlerService } from '../shared/code-handler.service';
import { SettingsResponse } from 'src/app/models/menu-models/settingsResponse';
import { Observable, Subject } from 'rxjs';
import { Settings } from 'src/app/models/menu-models/settings';
import { SavingSettingsResponse } from 'src/app/models/menu-models/savingSettingsResponse';
import { ServerCoordinationService } from '../shared/server-coordination.service';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private addresser: HttpAddresserService, private http: HttpClient,
            private codeHandler: CodeHandlerService, private sc: ServerCoordinationService) { }

  defaultSettings: Settings = {
    goUp: 119,
    goDown: 115,
    goLeft: 97,
    goRight: 100
  }         
  savedSettings: Settings;
  customSettings: Settings;

  savedSettingsSubject = new Subject<Settings>();

  savingSettingsState = new Subject<number>();

  pushSavingSettingState(state: number){
    this.savingSettingsState.next(state);
  }

  getSavingSettingsState(): Observable<number>{
    return this.savingSettingsState.asObservable();
  }

  pushSettings(settings: Settings){
    this.savedSettingsSubject.next(settings);
    this.savedSettings = settings;
    this.customSettings = settings;
  }

  saveSettings(settings: Settings){
    this.sc.sendToServer(this.saveSettingsFunction, this, settings); //wrapping this
  }

  saveSettingsFunction(settings: Settings){
    this.http.put<SavingSettingsResponse>(this.addresser.getAddress() + "api/settings/" +
     this.codeHandler.getCode(), settings).subscribe(resp => {
       this.codeHandler.code = resp.code;
       console.log(resp);
       if (resp.status != -1){
        this.pushSettings(settings);
        this.pushSavingSettingState(0);
       }
      });
  }
  
  getSavedSettings(): Observable<Settings>{
    return this.savedSettingsSubject.asObservable();
  }

  getSettings(): Observable<SettingsResponse>{
    return this.http.get<SettingsResponse>(this.addresser.getAddress() + "api/settings/" + this.codeHandler.getCode())
  }

  mapToCharacter(n: number): string{
    if (n <= 31){
      return "N/A";
    }
    if (n == 32){
      return "SPACE";
    }
    if (n >= 33 && n <= 38){
      return "N/A"
    }
    if (n >= 40 && n <= 43){
      return "N/A";
    }
    if (n == 58){
      return "uN/A";
    }
    if (n == 60 || n == 62){
      return "N/A";
    }
    if (n == 63 || n == 64){
      return "N/A";
    }
    if (n == 94 || n == 95){
      return "N/A";
    }
    if (n >= 123){
      return "N/A";
    }

    if (n >= 97 && n <= 122){
      n-=32;
    }

    return String.fromCharCode(n);
  }
}
