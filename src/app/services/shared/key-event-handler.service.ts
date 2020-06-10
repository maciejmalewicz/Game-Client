import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyEventHandlerService {

  constructor() { }
  public state: number = 0; //0 - turned off
  //1 - sending to settings

  handleKeyEvent(event: KeyboardEvent){
    switch(this.state){
      case 0:
        //ignore
        break;
      case 1:
        this.sendCodeToSettings(event);
        break;
      default:
        console.log('error');
        break;    
    }
  }

  codeSubjectSettings = new Subject<number>();
  //state 1
  sendCodeToSettings(event: KeyboardEvent){
    let code = this.mapEventToNumber(event);
    this.codeSubjectSettings.next(code);
  }

  getCodeToSettings(): Observable<number>{
    return this.codeSubjectSettings.asObservable();
  }

  //maps key event to signal
  mapEventToNumber(event: KeyboardEvent): number{
    let code = event.keyCode;
    if (code >= 97 && code <= 122){
      code-=32;
    }
    return code;
  }
}
