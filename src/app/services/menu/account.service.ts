import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerCoordinationService } from '../shared/server-coordination.service';
import { CodeHandlerService } from '../shared/code-handler.service';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { InputModel } from 'src/app/models/menu-models/inputModel';
import { StatusResponse } from 'src/app/models/menu-models/statusResponse';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private sc: ServerCoordinationService,
              private codeHandler: CodeHandlerService, private addresser: HttpAddresserService) { }

  logMessage = new Subject<string>();
  logCodeMessage = new Subject<string>();
  passwordStatusMessage = new Subject<string>();
  passwordCodeMessage = new Subject<string>();

  activatePassword(code: string){
    this.sc.sendToServer(this.doActivatePassword, this, code);
  }

  doActivatePassword(code: string){
    let input: InputModel = {
      text: code
    }
    this.http.put<StatusResponse>(this.addresser.address + "/api/changePassword/" + this.codeHandler.code, input)
        .subscribe(resp => {
          this.codeHandler.code = resp.code;
          this.sendPasswordCodeMessage(resp.status);
        })
  }

  getPasswordCodeMessenger(): Observable<string>{
    return this.passwordCodeMessage.asObservable();
  }

  sendPasswordCodeMessage(state: number){
    let message = "";
    switch(state){
      case -4:
        message = "Empty code!";
        break;
      case -3:
        message = "Internal server error! Try again later!";
        break;
      case -2:
        message = "Invalid code! Generate another above!";
        break;
      case -1:
        message = "Couldn't communicate with server! Try to log in again!";
        break;
      case 0:
        message = "Your password has been changed!";
        break;
      default:
        message = "Unknown error!";
        break;  
    }
    this.passwordCodeMessage.next(message);
  }

  changePassword(password: string){
    this.sc.sendToServer(this.doChangePassword, this, password);
  }

  doChangePassword(password: string){
    let input: InputModel = {
      text: password
    }
    this.http.post<StatusResponse>(this.addresser.address + "api/changePassword/" + this.codeHandler.code, input)
      .subscribe(resp => {
        this.codeHandler.code = resp.code;
        this.sendPasswordMessage(resp.status);
      })
  }

  sendPasswordMessage(state: number){
    let message = "";
    switch(state){
      case -1:
        message = "Couldn't communicate with server!";
        break;
      case 0:
        message = "Activation code has been sent!";
        break;
      case 1:
        message = "Passwords don't match!";
        break;
      case 2:  
        message = "Password is too short!";
        break;
      case 3:
        message = "Password must contain at least one lower case letter!";
        break;
      case 4:
        message = "Password must contain at least one upper case letter!";
        break;
      case 5:
        message = "Password must contain at least one digit!";
        break;  
      default:
        message = "Unknown error!";
        break;  
    }
    this.passwordStatusMessage.next(message);
  }

  getPasswordMessenger(): Observable<string>{
    return this.passwordStatusMessage.asObservable();
  }

  activateLogin(code: string){
    this.sc.sendToServer(this.doActivateLogin, this, code);
  }

  doActivateLogin(code: string){
    let input: InputModel = {
      text: code
    }
    this.http.put<StatusResponse>(this.addresser.address + "/api/changeLogin/" + this.codeHandler.code, input)
      .subscribe(resp => {
        this.codeHandler.code = resp.code;
        let status = resp.status;
        this.sendActivateLogMessage(status);
      })
  }

  getActivateLoginMessenger(): Observable<string>{
    return this.logCodeMessage.asObservable();
  }

  sendActivateLogMessage(status: number){
    let message = "";
    switch(status){
      case -4:
        message = "Empty code!";
        break;
      case -3:
        message = "Internal server error! Try again later!";
        break;
      case -2:
        message = "Invalid code! Generate another above!";
        break;
      case -1:
        message = "Couldn't communicate with server! Try to log in again!";
        break;
      case 0:
        message = "Your login has been changed!";
        break;
      default:
        message = "Unknown error!";
        break;  
          
    }
    this.logCodeMessage.next(message);
  }
  

  changeLogin(login: string){
    this.sc.sendToServer(this.doChangeLogin, this, login);
  }

  doChangeLogin(login: string){
    let input: InputModel = {
      text: login
    };
    this.http.post<StatusResponse>(this.addresser.address + "api/changeLogin/" + this.codeHandler.code, input).subscribe(resp => {
      this.codeHandler.code = resp.code;
      let status = resp.status;
      this.sendLogMessage(status);
    } 
    );
  }

  getLogMessage(): Observable<string>{
    return this.logMessage.asObservable();
  }

  sendLogMessage(state: number){
    let message = "";
    switch(state){
      case -2:
        message = "Login is already occupied!";
        break;
      case -1:
        message = "Couldn't communicate with server! Try to log in again!";
        break;
      case 0:
        message = "Message has been sent!";
        break;
      case 1:
        message = "Empty login!";
        break;      
    }
    this.logMessage.next(message);
  }
}
