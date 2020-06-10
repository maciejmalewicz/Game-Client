import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegistrationData } from '../models/registrationData';
import { HttpAddresserService } from './shared/http-addresser.service';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  state = new Subject<number>();
  activationState = new Subject<number>();

  aButtonNotifier = new Subject<number>();
  rButtonNotifier = new Subject<number>();

  constructor(private http: HttpClient, private addresser: HttpAddresserService) { 
    
  }

  register(data: RegistrationData): Observable<any>{
    this.rButtonNotifier.next(0);
    return this.http.post<any>(this.addresser.getAddress() + "api/activationLink", data);
  }

  activate(code: string): Observable<any>{
    this.aButtonNotifier.next(0);
    return this.http.get(this.addresser.getAddress() + "api/activationLink/" + code);
    
  }

  pushState(newState: number){
    this.state.next(newState);
  }

  getState(): Observable<number>{
    return this.state.asObservable();
  }

  pushActivationState(newState: number){
    this.activationState.next(newState);
  }

  getActivationState(): Observable<number>{
    return this.activationState.asObservable();
  }

  getRNotifier(): Observable<number>{
    return this.rButtonNotifier.asObservable();
  }

  getANotifier(): Observable<number>{
    return this.aButtonNotifier.asObservable();
  }
}
