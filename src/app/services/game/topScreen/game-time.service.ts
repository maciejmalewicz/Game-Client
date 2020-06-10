import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameTimeService {

  constructor() { }

  time: number;

  set(time: number){
    this.time = time;
  }

  abs(n: number){
    if (n >= 0){
      return n;
    } else {
      return -n;
    }
  }

  getMinutes(){
    let absoluteTime = this.abs(this.time);
    return Math.floor(absoluteTime/60);
  }

  getSeconds(){
    let absoluteTime = this.abs(this.time);
    return Math.floor(absoluteTime%60);
  }

  getTimeString(){
    let str: string = "";
    if (this.time < 0){
      str = str + "-";
    }
    let minutes = this.getMinutes();
    if (minutes < 10){
      str = str + "0";
    }
    str = str + minutes + ":";
    
    let seconds = this.getSeconds()
    if (seconds < 10){
      str = str + "0";
    }
    str = str + seconds;
    return str;
  }
  
}
