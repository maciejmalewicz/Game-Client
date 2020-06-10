import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CodeHandlerService {

  constructor() { }
  previousCode: string = ""; //last used code
  //will be used to postpone sending requests until the response is received
  code: string; //current code

  canBeSent(): boolean {
    return this.previousCode != this.code;
  }

  getCode(){
    return this.code;
  }

  setCode(newCode: string){
    this.code = newCode;
  }
}
