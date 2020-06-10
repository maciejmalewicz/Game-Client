import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupsLauncherService {

  constructor() { }

  signals = new Subject<number>();

  //0 nothing can be done
  //1 is attackable
  //2 is spyable
  //3 is both
  attackPopupResetSignals = new Subject<number>();

  getSignals(): Observable<number>{
    return this.signals.asObservable();
  }

  sendSignal(signal: number){
    this.signals.next(signal);
  }

  getAttackResetSignals(): Observable<number>{
    return this.attackPopupResetSignals.asObservable();
  }
  
  sendResetSignal(signal: number){
    this.attackPopupResetSignals.next(signal);
  }
}
