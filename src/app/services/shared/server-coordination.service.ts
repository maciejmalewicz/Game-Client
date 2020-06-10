import { Injectable } from '@angular/core';
import { CodeHandlerService } from './code-handler.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServerCoordinationService {

  constructor(private codeHandler: CodeHandlerService) { }

  private delay(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public doAfterCondition<T>(fun: Function, object: any, observable: Observable<T>, awaitedValue: T){
    observable.subscribe(msg => {
      if (msg == awaitedValue){
        fun.call(object);
      }
    })
  }

  //improvement
  //will try to do something max 10 times, not infinitely many
  //we must handle unlocking in function
  async interactWithServer(fun: Function, object: any){
    for (let i = 0; i < 10; i++){
      if (this.codeHandler.canBeSent()){
        this.codeHandler.previousCode = this.codeHandler.code; //lock sending request possibility
        fun.call(object);
        break;
      }
      await this.delay(1000);
    }
  }

  //version with parameter
  async sendToServer(fun: Function, object: any, parameter: any){
    for (let i = 0; i < 10; i++){
      if (this.codeHandler.canBeSent()){
        this.codeHandler.previousCode = this.codeHandler.code; //lock sending request possibility
        fun.call(object, parameter);
        break;
      }
      await this.delay(1000);
    }
  }

  async doAfter(fun: Function, object: any, delay: number){
    await this.delay(delay);
    fun.call(object);
  }
}
