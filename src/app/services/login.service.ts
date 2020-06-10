import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../models/loginData';
import { Observable, Subject } from 'rxjs';
import { HttpAddresserService } from './shared/http-addresser.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private addresser: HttpAddresserService) { }

  login: string = "";

  message = new Subject<string>();

  logIn(data: LoginData): Observable<any>{
    return this.http.put
    <any>(this.addresser.getAddress() + "api/user", data, {responseType: "text" as "json"});
  }

  pushMessage(message: string){
    this.message.next(message);
  }

  getMessage(): Observable<string>{
    return this.message.asObservable();
  }


}
