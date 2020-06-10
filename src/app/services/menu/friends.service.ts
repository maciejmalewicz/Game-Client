import { Injectable } from '@angular/core';
import { Friend } from 'src/app/models/menu-models/friend';
import { HttpClient } from '@angular/common/http';
import { CodeHandlerService } from '../shared/code-handler.service';
import { ServerCoordinationService } from '../shared/server-coordination.service';
import { FriendsResponse } from 'src/app/models/menu-models/friendsResponse';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { ProfileResponse } from 'src/app/models/menu-models/profileResponse';
import { InputModel } from 'src/app/models/menu-models/inputModel';
import { Subject, Observable } from 'rxjs';
import { StringsResponse } from 'src/app/models/menu-models/stringsResponse';
import { StatusResponse } from 'src/app/models/menu-models/statusResponse';
import { InvitationsResponse } from 'src/app/models/menu-models/invitationsResponse';
import { LoginService } from '../login.service';
import { FriendSuggestionsService } from './friend-suggestions.service';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(private http: HttpClient, private codeHandler: CodeHandlerService,
              private sc: ServerCoordinationService, private addresser: HttpAddresserService,
              private logService: LoginService) { }

  activeFriends: Array<string> = [];// = ['Andrzej', 'Kamysz', 'Duda', 'Kidawa', 'Bosak'];
  notActiveFriends: Array<string> = [];// = ['Cholownia', 'Mienso', 'Kebab', 'Biedron'];
  profilesLoaded: Array<ProfileResponse> = [];
  invitations: Array<string> = [];
  invitationsSent: Array<string> = [];

  profileSignal = new Subject<ProfileResponse>();
  sendingInvitationMessages = new Subject<string>();

  getSendingInvitationMessages(): Observable<string>{
    return this.sendingInvitationMessages.asObservable();
  }

  acceptInvitation(index: number){
    let login: string = this.invitations[index]; 
    this.sc.sendToServer(this.doAcceptInvitation, this, login)
  }

  doAcceptInvitation(login: string){
    let input: InputModel = {
      text: login
    }
    this.http.put<StatusResponse>(this.addresser.address + "api/friendship/invitations/accept/" 
    + this.codeHandler.code, input).subscribe(resp => {
      this.codeHandler.code = resp.code;
      // if (resp.status == 0){
      //   this.getFriends();
      // }
      this.invitations = this.invitations.filter(inv => {inv != login})
      this.activeFriends.push(login);
    })
  }

  invitationStatusToMessage(status: number){
    let message: string;
    switch(status){
      case -1:
        message = "Couldn't communicate with server! Try to log in again!";
        break;
      case -2:
        message = "You are trying to invite non-existing player!";
        break;
      case -3:
        message = "You can't invite yourself!";
        break;
      case -4:
        message = "You have already invited this user!";
        break;
      case -5:
        message = "User is already your friend!";
        break;
      case -6:
        message = 'User has already invited you! To view your invitations, click on "invitaions" button';
        break; 
      case -7:
        message = "Error sending message! Try again later!";
        break;  
      case 0:
        message = "User has been invited!";
        break; 
      default:
        message = "Unknown error!";
        break;             
    }
    return message;
  }

  deleteInvitation(index: number){
    let login: string = this.invitations[index];
    this.sc.sendToServer(this.doDeleteInvitation, this, login);
  }

  doDeleteInvitation(login: string){
    let input: InputModel = {
      text: login
    }
    this.http.put<StatusResponse>(this.addresser.address + "api/friendship/invitations/delete/"
    + this.codeHandler.code, input).subscribe(resp => {
      this.codeHandler.code = resp.code;
      if (resp.status == 0){
        this.invitations = this.invitations.filter(str => {str != login})
      }
    })
  }

  //checking conditions before sending to server, in order not to kill it
  checkInvitationConditions(login: string){
    if (login == this.logService.login){
      return -3;
    }
    if (this.alreadyInvitationSent(login)){
      return -4;
    }
    if (this.isFriend(login)){
      return -5;
    }
    if (this.invitedBy(login)){
      return -6;
    }
    return 0;
  }

  invite(login: string){
    let result = this.checkInvitationConditions(login);
    if (result != 0){
      let message = this.invitationStatusToMessage(result);
      this.sendingInvitationMessages.next(message);
    }
    this.sc.sendToServer(this.doInvite, this, login);
  }

  doInvite(login: string){
    let input: InputModel = {
      text: login
    }
    this.http.post<StatusResponse>(this.addresser.address + "api/friendship/" + this.codeHandler.code,
    input).subscribe(resp => {
      this.codeHandler.code = resp.code;
      let message: string = this.invitationStatusToMessage(resp.status);
      this.invitationsSent.push(login);
      this.sendingInvitationMessages.next(message);
      this.sc.doAfter(() => {this.sendingInvitationMessages.next("")}, this, 5000);
    })
  }

  getInvitations(){
    this.sc.interactWithServer(this.doGetInvitations, this);
  }

  doGetInvitations(){
    this.http.get<InvitationsResponse>(this.addresser.address + "api/friendship/invitations/" + this.codeHandler.code)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      this.invitations = resp.invitationsReceived;
      this.invitationsSent = resp.invitationsSent;
      console.log(this.invitationsSent);
    })
  }

  pushProfileSignal(signal: ProfileResponse){
    this.profileSignal.next(signal);
  }

  getProfileSignals(): Observable<ProfileResponse>{
    return this.profileSignal.asObservable();
  }

  buildFromFriendsList(list: Array<Friend>){
    this.activeFriends = [];
    this.notActiveFriends = [];
    for (let friend of list){
      if (friend.active){
        this.activeFriends.push(friend.login);
      } else {
        this.notActiveFriends.push(friend.login);
      }
    }
  }

  getFriends(){
    this.sc.interactWithServer(this.doGetFriends, this);
  }

  doGetFriends(){
    this.http.get<FriendsResponse>(this.addresser.address + "api/friendship/" + this.codeHandler.code)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      this.buildFromFriendsList(resp.friends);
    })
  }

  getProfileOrLoad(login: string): ProfileResponse{
    let profile = this.getProfileLoaded(login);
    if (profile != null){
      return profile;
    }
    this.loadProfile(login);
    return null;
  }

  loadProfile(login: string){
    this.sc.sendToServer(this.doLoadProfile, this, login);
  }

  doLoadProfile(login: string){
    let input: InputModel = {
      text: login
    }
    this.http.put<ProfileResponse>(this.addresser.address + "api/friendship/" + this.codeHandler.code, input)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      resp.code = null;
      this.profilesLoaded.push(resp);
      this.pushProfileSignal(resp);
    })
  }

  getProfileLoaded(login: string): ProfileResponse{
    for (let profile of this.profilesLoaded){
      if (profile.login == login){
        return profile;
      }
    }
    return null;
  }

  invitedBy(login: string){
    for (let str of this.invitations){
      if (login == str){
        return true;
      }
    }
    return false;
  }

  alreadyInvitationSent(login: string){
    for (let invitation of this.invitationsSent){
      if (login == invitation){
        return true;
      }
    }
    return false;
  }

  isFriend(login: string){
    for (let str of this.activeFriends){
      if (str == login){
        return true;
      }
    }
    for (let str of this.notActiveFriends){
      if (str == login){
        return true;
      }
    }
    return false;
  }

  isAlreadyActive(login: string){
    for (let str of this.activeFriends){
      if (login == str){
        return true;
      }
    }
    return false;
  }
}
