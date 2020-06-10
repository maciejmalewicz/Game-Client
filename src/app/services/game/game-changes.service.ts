import { Injectable } from '@angular/core';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { CodeHandlerService } from '../shared/code-handler.service';
import { HttpClient } from '@angular/common/http';
import { GameChanges } from 'src/app/game-view/game-models/gameChanges';
import { ServerCoordinationService } from '../shared/server-coordination.service';
import { ResourceSetService } from './topScreen/resource-set.service';
import { GameTimeService } from './topScreen/game-time.service';
import { NotificationsUnboxerService } from './notifications-unboxer.service';

@Injectable({
  providedIn: 'root'
})
export class GameChangesService {

  constructor(private addresser: HttpAddresserService, private codeHandler: CodeHandlerService,
              private http: HttpClient, private sc: ServerCoordinationService,
              private resources: ResourceSetService, private time: GameTimeService,
              private unboxer: NotificationsUnboxerService) { }

              private isRunning = false;

              async start(){
                this.isRunning = true;
                while (this.isRunning){
                  this.getChanges();
                  await this.delay(1000);
                }
              }

              stop(){
                this.isRunning = false;
              }

              getChanges(){
                this.sc.interactWithServer(this.doGetChanges, this);
              }

              doGetChanges(){ 
                this.http.get<GameChanges>(this.addresser.address + "api/gameChanges/" + this.codeHandler.code)
                .subscribe(resp => {
                  this.codeHandler.code = resp.code;
                  this.resources.set(resp.resources);
                  this.time.set(resp.timeFromStart);
                  this.unboxer.unboxNotifications(resp.inbox.notifications);
                  //for testing
                  if (resp.inbox.notifications.length != 0){
                    console.log(resp);
                  }
                  //console.log(resp);
                })
              }

              private delay(ms: number){
                return new Promise(resolve => setTimeout(resolve, ms));
              }
}
