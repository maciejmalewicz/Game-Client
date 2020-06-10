import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClickSoundService{

  
  audioMachine = [];
  currentIndex = 0;

  constructor() { 
    for (let i = 0; i < 5; i++) {
      let audio = new Audio();
      audio.src = "./assets/click.wav";
      audio.load();
      this.audioMachine.push(audio);
    }
  }

  play(){
    if (this.currentIndex < 4){
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
    this.audioMachine[this.currentIndex].play();
    
  }

  
}
