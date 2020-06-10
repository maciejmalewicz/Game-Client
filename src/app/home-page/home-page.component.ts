import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  showModal: boolean = false;
  constructor() { }

  launchModal(){
    this.showModal = true;
  }

  hideModal(){
    this.showModal = false;
  }

  ngOnInit(): void {
    
  }

  

}
