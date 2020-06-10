import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeSoundService {

  audio: any;
  audioMachine = [];
  currentIndex = 0;

  constructor(){
    for (let i = 0; i < 20; i++){
      let audio = new Audio();
      audio.src = "./assets/typing.wav";
      audio.load();
      this.audioMachine.push(audio);
    }
  }

  ngOnInit(): void {
    
  }

  play(){
    if (this.currentIndex < 19){
      this.currentIndex++;
    } else {
    this.currentIndex = 0;
    }
    this.audioMachine[this.currentIndex].play();
  }
}
