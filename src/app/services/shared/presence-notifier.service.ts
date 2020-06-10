import { Injectable, OnInit } from '@angular/core';
import { CodeHandlerService } from './code-handler.service';
import { HttpClient } from '@angular/common/http';
import { HttpAddresserService } from './http-addresser.service';
import { ResponseBase } from 'src/app/models/responseBase';
import { ServerCoordinationService } from './server-coordination.service';
import { NotificationResponse } from 'src/app/models/notificationResponse';
import { FriendsService } from '../menu/friends.service';
import { FriendSuggestionsService } from '../menu/friend-suggestions.service';

@Injectable({
  providedIn: 'root'
})
export class PresenceNotifierService{

  constructor(private codeHandler: CodeHandlerService, private http: HttpClient, 
              private addresser: HttpAddresserService, private sc: ServerCoordinationService,
              private friends: FriendsService, private friendsSuggestions: FriendSuggestionsService) { }


  notifies = false;

  messageDelay: number = 2000; //ten seconds between messages
  messageShown: string = "";
  messagesToShowQueue: Array<string> = [];
  addToQueue(message: string){
    this.messagesToShowQueue.push(message);
  }

  nextMessage(){
    if (this.messagesToShowQueue.length != 0){
      this.messageShown = this.messagesToShowQueue[this.messagesToShowQueue.length-1];
      this.messagesToShowQueue = this.messagesToShowQueue.filter(s => {s != this.messageShown});
    }
  }

  //notifies server every 10 seconds
  notificationRate: number = 5000;


  notify(){
    if (this.notifies == false){//this.codeHandler.code == "" || this.codeHandler.code == "UNKNOWN CODE"){
      console.log("ERROR");
    } else {
      this.sc.interactWithServer(this.doNotify, this);
    }
  }

  doNotify(){
    this.http.put<NotificationResponse>(this.addresser.address + "api/notifications/" + 
    this.codeHandler.code, null) .subscribe(resp => {
      if (resp.code == "UNKNOWN CODE"){
        this.notifies = false; //stop notifying server if it responds with this code
      } else {
        //console.log(resp);
        this.codeHandler.code = resp.code; //if not, update code as always
        //console.log(this.codeHandler.code);
        this.handleResponse(resp);
      }
    });
  }

  handleResponse(response: NotificationResponse){
    this.handlePlayersInvitations(response.inbox.playersInvitations);
    this.handleAcceptances(response.inbox.invitationsAcceptance);
    this.handleRejections(response.inbox.invitationsRejection);
    this.handleLogIns(response.inbox.logins);
  }

  handlePlayersInvitations(invitations: Array<string>){
    for (let inv of invitations){
      this.friends.invitations.push(inv);
      let msg: string = inv + " has invited you to be friends!";
      this.addToQueue(msg);
    }
  }

  handleAcceptances(acceptances: Array<string>){
    for (let acc of acceptances){
      this.friends.invitationsSent = this.friends.invitationsSent.filter(s => {return s != acc}) //remove invitation
      this.friends.activeFriends.push(acc); //add to active friends cuz guy must be active if he just accepted
      this.friendsSuggestions.getFriendsSuggestions();
      let msg: string = acc + " accepted your friend request!";
      this.addToQueue(msg);
    }
  }

  handleRejections(rejections: Array<string>){
    for (let rej of rejections){
      this.friends.invitationsSent = this.friends.invitationsSent.filter(s => {return s != rej}) //remove invitation
      this.friendsSuggestions.getFriendsSuggestions();
      let msg: string = rej + " rejected your friend request!";
      this.addToQueue(msg);
    }
  }

  handleLogIns(logins: Array<string>){
    for (let login of logins){
      //delete not active
      this.friends.notActiveFriends = this.friends.notActiveFriends.filter(s => {return s != login}) 
      //add to active
      if (!this.friends.isAlreadyActive(login)){
        this.friends.activeFriends.push(login);
      }
      let msg: string = login + " has just logged in!";
      this.addToQueue(msg);
    }

  }
  
}
