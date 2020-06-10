import { Injectable } from '@angular/core';
import { CodeHandlerService } from './code-handler.service';
import { PresenceNotifierService } from './presence-notifier.service';
import { SettingsService } from '../menu/settings.service';
import { FriendsService } from '../menu/friends.service';
import { PageChangerService } from './page-changer.service';

@Injectable({
  providedIn: 'root'
})
export class LogOutService {

  constructor(private codeHandler: CodeHandlerService, private notifier: PresenceNotifierService,
              private settingsService: SettingsService, private friendsService: FriendsService,
              private pageChanger: PageChangerService) { }

  logOut(){
    this.codeHandler.code = "";
    this.codeHandler.previousCode = "";
    this.notifier.notifies = false;
    this.settingsService.customSettings = null;
    this.settingsService.savedSettings = null;
    this.friendsService.activeFriends = [];
    this.friendsService.notActiveFriends = [];
    this.friendsService.profilesLoaded = [];
    this.pageChanger.goHome();
  }
}
