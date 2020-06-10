import { Injectable } from '@angular/core';
import { FriendsService } from './friends.service';
import { HistoryService } from './history.service';
import { HistoryUnit } from 'src/app/models/menu-models/historyUnit';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class FriendSuggestionsService {

  constructor(private friends: FriendsService, private history: HistoryService, 
              private logService: LoginService) { 
    this.history.getHistory().subscribe(history => {
      this.historyUnits = history;
    })
  }

  historyUnits: Array<HistoryUnit> = [];

  suggestions: Array<string> = [];

  pushDistinct(element: string, array: Array<string>){
    for (let str of array){
      if (str == element){
        return;
      }
    }
    array.push(element);
  }

  getPlayersFromHistory(): Array<string>{
    let players: Array<string> = new Array<string>();
    for (let unit of this.historyUnits){
      let player1: string = unit.player1Login;
      let player2: string = unit.player2Login;
      let player3: string = unit.player3Login;
      let player4: string = unit.player4Login;
      this.pushDistinct(player1, players);
      this.pushDistinct(player2, players);
      this.pushDistinct(player3, players);
      this.pushDistinct(player4, players);
    }
    return players;
  }

  filterNotFriendsFromPlayers(arr: Array<string>){
    return arr.filter(str => {
      return !this.friends.isFriend(str);
    });
  }

  filterYourLogin(arr: Array<string>){
    return arr.filter(str => {
      return str != this.logService.login;
    })
  }

  filterAlreadySent(arr: Array<string>){
    return arr.filter(str => {
      return !this.friends.alreadyInvitationSent(str);
    })
  }

  filterInvitedBy(arr: Array<string>){
    return arr.filter(str => {
      return !this.friends.invitedBy(str);
    })
  }

  filterLast(arr: Array<string>){
    let out: Array<string> = [];
    for (let i = 0; i < 10 && i < arr.length; i++){
      out.push(arr[i]);
    }
    return out;
  }

  getFriendsSuggestions(){
    let arr: Array<string> = this.getPlayersFromHistory();
    arr = this.filterNotFriendsFromPlayers(arr);
    arr = this.filterAlreadySent(arr);
    arr = this.filterInvitedBy(arr);
    arr = this.filterYourLogin(arr)
    arr = this.filterLast(arr);
    this.suggestions = arr;
  }
}
