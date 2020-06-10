import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-to-play',
  templateUrl: './how-to-play.component.html',
  styleUrls: ['./how-to-play.component.css']
})
export class HowToPlayComponent implements OnInit {

  pages = 5; 
  constructor() {
    this.isHidden.push(false);
    for (let i = 0; i < this.pages-1; i++){
      this.isHidden.push(true);
    }
  }

  hideAll(){
    for (let i = 0; i < this.pages-1; i++){
      this.isHidden[i] = true;
    }
  }

  goTo(page: number){
    this.hideAll();
    this.isHidden[page] = false;
  }

  isHidden = new Array<boolean>();
  

  ngOnInit(): void {
  }

}
