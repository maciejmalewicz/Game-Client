import { Component, OnInit } from '@angular/core';
import { FriendsService } from 'src/app/services/menu/friends.service';
import { FriendSuggestionsService } from 'src/app/services/menu/friend-suggestions.service';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {

  constructor(public service: FriendsService, public suggestionService: FriendSuggestionsService) { }

  invitationLogin: string = "";

  invitationFieldHidden = true;
  invitationsSentHidden = true;

  setInvitationLogin(index: number){
    this.invitationLogin = this.suggestionService.suggestions[index];
  }

  invite(){
    this.service.invite(this.invitationLogin);
  }

  deleteInvitation(index: number){
    this.service.deleteInvitation(index);
  }

  acceptInvitation(index: number){
    this.service.acceptInvitation(index);
  }

  getButtonClass(field: boolean){
    if (field == true){
      return "btn btn-primary btn-block";
    } else {
      return "btn btn-secondary btn-block";
    }
  }

  getInvitationsSentButtonClass(){
    return this.getButtonClass(this.invitationsSentHidden);
  }

  getInvitationButtonClass(){
    return this.getButtonClass(this.invitationFieldHidden)
  }

  getActiveButtonClass(){
    return this.getButtonClass(this.activeHidden);
  }

  getOtherButtonClass(){
    return this.getButtonClass(this.otherHidden);
  }

  changeInvitationsSent(){
    this.invitationsSentHidden = !this.invitationsSentHidden;
  }

  showInvitationField(){
    //this.suggestionService.getFriendsSuggestions();
    this.invitationFieldHidden = !this.invitationFieldHidden;
  }

  ngOnInit(): void {
  }

  activeHidden = false;
  otherHidden = true;

  changeActive(){
    this.activeHidden = !this.activeHidden;
  }
  changeOther(){
    this.otherHidden = !this.otherHidden;
  }

  sendInvitation(){
    console.log(this.invitationLogin);
  }

  loadActiveProfile(index: number){
    let login: string = this.service.activeFriends[index];
    let profile = this.service.getProfileOrLoad(login);
    if (profile != null){
      this.service.pushProfileSignal(profile);
      console.log(profile);
    } 
    
  }

  loadNotActiveProfile(index: number){
    let login: string = this.service.notActiveFriends[index];
    let profile = this.service.getProfileOrLoad(login);
    if (profile != null){
      this.service.pushProfileSignal(profile);
      console.log(profile);
    } 
  }

  log(){
    console.log("yay");
  }

}
