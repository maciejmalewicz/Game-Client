import { Component, OnInit } from '@angular/core';
import { HistoryResponse } from '../models/menu-models/historyResponse';
import { HistoryService } from '../services/menu/history.service';
import { CodeHandlerService } from '../services/shared/code-handler.service';
import { PageChangerService } from '../services/shared/page-changer.service';
import { HistoryUnit } from '../models/menu-models/historyUnit';
import { Friend } from '../models/menu-models/friend';
import { FriendsService } from '../services/menu/friends.service';
import { LogOutService } from '../services/shared/log-out.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private historyService: HistoryService, private codeHandler: CodeHandlerService,
              private logoutService: LogOutService, private friendsService: FriendsService) {
    for (let i = 0; i < 5; i++){
      this.windows.push(true);
    }
    this.windows[4] = false;
    
    this.friendsService.getProfileSignals().subscribe(resp => {
      this.goToProfile();
    })
   }

  windows = new Array<boolean>();

  currentHistory = new Array<HistoryUnit>();
  currentPlayer: Friend = null;
  //array of flags, determining which window is visible
  //0 - how to play
  //1 - settings
  //2 - play game
  //3 - account
  //4 - profile

  hideAll(){
    for (let i = 0; i < this.windows.length; i++){
      this.windows[i] = true;
    }
  }

  goToHowToPlay(){
    this.hideAll();
    this.windows[0] = false;
  }

  goToSettings(){
    this.hideAll();
    this.windows[1] = false;
  }

  goToPlayGame(){
    this.hideAll();
    this.windows[2] = false;
  }


  goToAccount(){
    this.hideAll();
    this.windows[3] = false;
  }

  //to do finish
  goToProfile(){
    this.hideAll();
    this.windows[4] = false;
  }

  logOut(){
    this.logoutService.logOut();
  }

  ngOnInit(): void {
  }

}
