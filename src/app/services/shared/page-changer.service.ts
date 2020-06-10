import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HistoryService } from '../menu/history.service';
import { CodeHandlerService } from '../shared/code-handler.service';
import { SettingsService } from '../menu/settings.service';
import { ServerCoordinationService } from './server-coordination.service';
import { PresenceNotifierService } from './presence-notifier.service';
import { FriendsService } from '../menu/friends.service';
import { FriendSuggestionsService } from '../menu/friend-suggestions.service';
import { GameRefresherService } from '../game/game-refresher.service';
import { GameConfigurationService } from '../game/game-configuration.service';

@Injectable({
  providedIn: 'root'
})
export class PageChangerService {

  constructor(private historyService: HistoryService, private codeHandler: CodeHandlerService,
            private settingsService: SettingsService, private sc: ServerCoordinationService,
            private notifier: PresenceNotifierService, private friendsService: FriendsService,
            private suggestions: FriendSuggestionsService, private gameRefresher: GameRefresherService,
            private gameConfiguration: GameConfigurationService) { }

  pageActive: number = 0;
  pageActiveSubject = new Subject<number>();
  //0 for home page
  //1 for menu
  //2 for game

  getActivePage(): Observable<number>{
    return this.pageActiveSubject.asObservable();
  }

  goToGame(){
    this.pageActiveSubject.next(2);
    this.pageActive = 2;
  }

  loadGame(){
    this.notifier.notifies = true; //also launch notifier
    this.gameConfiguration.loadConfiguration();
    this.gameRefresher.refreshGame();
    
  }

  goToMenu(){
    this.pageActiveSubject.next(1);
    this.pageActive = 1;
  }

  //it is important to leave history at last! order matters here
  loadMenu(){
    //for code optimisation
    //works!!!!
    // <3
    this.sc.interactWithServer(this.loadSettings, this);
    this.friendsService.getFriends();
    this.friendsService.getInvitations();
    this.sc.interactWithServer(this.loadHistory, this);
    //launch notifier, so server doesn't kick us out
    this.notifier.notifies = true;
    
  }


  loadHistory(){ //loads history and friends suggestions after that
    this.historyService.getHistoryResponse().subscribe(resp => {
      this.codeHandler.setCode(resp.code); //refresh code here
      //console.log(this.codeHandler.code + " " + this.codeHandler.previousCode);
      this.historyService.pushHistory(resp.games); //notify app, that it has to change history
      console.log(resp);
      this.suggestions.getFriendsSuggestions();
    })
  }


  loadSettings(){
    this.settingsService.getSettings().subscribe(resp => {
      this.codeHandler.setCode(resp.code);
      this.settingsService.pushSettings(resp.settings);
      //console.log(this.codeHandler.code + " " + this.codeHandler.previousCode);
      console.log(resp);
    });
  }

  goHome(){
    this.pageActiveSubject.next(0);
    this.pageActive = 0;
    //this.notifier.notifies = false;
  }
}
