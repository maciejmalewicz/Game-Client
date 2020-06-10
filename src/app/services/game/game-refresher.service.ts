import { Injectable } from '@angular/core';
import { ServerCoordinationService } from '../shared/server-coordination.service';
import { CodeHandlerService } from '../shared/code-handler.service';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { HttpClient } from '@angular/common/http';
import { StatusResponse } from 'src/app/models/menu-models/statusResponse';
import { Subject, Observable } from 'rxjs';
import { GameStateResponse } from 'src/app/game-view/game-models/gameStateResponse';
import { GameInfoService } from './board/game-info.service';
import { OpponentsMessage } from 'src/app/game-view/game-models/opponentsMessage';
import { PlayersSet } from 'src/app/game-view/game-models/players/playersSet';
import { LoginService } from '../login.service';
import { Location } from 'src/app/game-view/game-models/location';
import { UnitConverterService } from './unit-converter.service';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { GameChangesService } from './game-changes.service';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { UpgradeSetService } from './lab/upgrade-set.service';

@Injectable({
  providedIn: 'root'
})
export class GameRefresherService {

  constructor(private sc: ServerCoordinationService, private codeHandler: CodeHandlerService,
              private addresser: HttpAddresserService, private http: HttpClient,
              private datasource: GameInfoService, private logService: LoginService,
              private converter: UnitConverterService, private changesHandler: GameChangesService,
              private upgrades: UpgradeSetService) { }

  signals = new Subject<number>();

  refreshSignals = new Subject<Location>();

  callRefreshing(row: number, col: number){
    let loc: Location = {
      row: row,
      col: col
    }
    this.refreshSignals.next(loc);
  }

  getRefreshSignals(): Observable<Location>{
    return this.refreshSignals.asObservable();
  }

  getSignals(): Observable<number>{
    return this.signals.asObservable();
  }

  checkIfPlaying(){
    this.sc.interactWithServer(this.doCheckIfPlaying, this);
  } 
  
  doCheckIfPlaying(){
    this.http.get<StatusResponse>(this.addresser.address + "api/getGame/playing/" + this.codeHandler.code)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      let status = resp.status;
      console.log(resp);
      if (status == 0){
          this.signals.next(0);
          
      } else {
          this.signals.next(1);
          
      }
    })
  }

  refreshGame(){
    this.sc.interactWithServer(this.doRefreshGame, this);
  }

  doRefreshGame(){
    this.http.get<GameStateResponse>(this.addresser.address + "api/getGame/all/" + this.codeHandler.code)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      console.log(resp);
      this.updateGameState(resp);
      this.signals.next(100); //to notify graphics
      //at the end, continue to refresh game every second
      console.log("starting changes handling!")
      this.changesHandler.start();
    })
  }

  updateGameState(state: GameStateResponse){
    this.datasource.players = this.buildPlayersSet(state.opponentsMessage);
    //console.log(this.datasource.players);
    this.buildAreaUnits(state);
    this.addUpgrades(state);
  }

  private addUpgrades(state: GameStateResponse){
    this.upgrades.upgrades = state.upgradesMessage.upgrades;
  }

  private buildAreaUnits(state: GameStateResponse){
    console.log(state);
    for (let i = 0; i < state.boardMessage.units.length; i++){
      for (let j = 0; j < state.boardMessage.units.length; j++){

        let unit: AreaUnit = this.converter.convertMessage(state.boardMessage.units[i][j]);
        this.datasource.areaUnits[i][j] = unit;
        
        this.callRefreshing(i, j);
      }
    }
    console.log(this.datasource.areaUnits)
  }

  // private attachEventsToBuildings(unit: OwnedAreaUnit){
  //   for (let event of unit.BUILDING_QUEUE.events){
  //     switch(event.place){
  //       case 1:
  //         event.building = unit.MAIN_BUILDING;
  //         break;
  //       case 2:
  //         event.building = unit.NORTH_BUILDING;
  //         break;  
  //       case 3:
  //         event.building = unit.SOUTH_BUILDING;
  //         break;
  //       case 4:
  //         event.building = unit.WEST_BUILDING;
  //         break;
  //       case 5:
  //         event.building = unit.EAST_BUILDING;
  //         break;
  //       case 6:
  //         event.building = unit.WALLS;
  //         break;          
  //     }
  //   }
  // }

  buildPlayersSet(message: OpponentsMessage): PlayersSet{
    let out: PlayersSet = new PlayersSet();

    if (message.opponent1 == null){
      out.you = 1;
      out.player1 = this.logService.login;
    } else {
      out.player1 = message.opponent1;
    }

    if (message.opponent2 == null){
      out.you = 2;
      out.player2 = this.logService.login;
    } else {
      out.player2 = message.opponent2;
    }

    if (message.opponent3 == null){
      out.you = 3;
      out.player3 = this.logService.login;
    } else {
      out.player3 = message.opponent3;
    }

    if (message.opponent4 == null){
      out.you = 4;
      out.player4 = this.logService.login;
    } else {
      out.player4 = message.opponent4;
    }

    return out;
  }
}
