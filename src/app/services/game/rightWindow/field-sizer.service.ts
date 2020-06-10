import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FieldSizerService {

  constructor() { }

  currentSize = new Subject<number>();

  signals = new Subject<number>();

  getSignals(): Observable<number>{
    return this.signals.asObservable();
  }

  requestSize(){
    this.signals.next(0);
  }

  getSizeNofitications(): Observable<number>{
    return this.currentSize.asObservable();
  }

  pushSize(n: number){
    this.currentSize.next(n);
  }
}
