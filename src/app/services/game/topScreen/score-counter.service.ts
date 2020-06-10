import { Injectable } from '@angular/core';
import { LoginService } from '../../login.service';
import { GameInfoService } from '../board/game-info.service';

@Injectable({
  providedIn: 'root'
})
export class ScoreCounterService {

  constructor(private datasource: GameInfoService, private logService: LoginService) { }

  getMyScore(){
    let myFields: number = 0;
    for (let row of this.datasource.areaUnits){
      for (let unit of row){
        if (unit.OWNER != null && unit.OWNER == this.logService.login){
          myFields++;
        }
      }
    }
    return myFields/121;
  }

  getEnemiesScores(): Array<number>{
    let enemies = this.getEnemies();
    if (enemies == null){
      return [0, 0, 0];
    }
    let counter: Array<number> = [0, 0, 0];
    for (let row of this.datasource.areaUnits){
      for (let unit of row){
        if (unit.OWNER == null){
          continue;
        }
        if (unit.OWNER == enemies[0]){
          counter[0]++;
        }
        if (unit.OWNER == enemies[1]){
          counter[1]++;
        }
        if (unit.OWNER == enemies[2]){
          counter[2]++;
        }
      }
    }
    counter[0] = counter[0]/121;
    counter[1] = counter[1]/121;
    counter[2] = counter[2]/121;
    return counter;
  }

  getEnemies(){
    let loginList = new Array<string>();
    let playersSet = this.datasource.players;
    let myLogin = this.logService.login;
    if (playersSet == null){
      return null;
    }
    if (playersSet.player1 != myLogin){
      loginList.push(playersSet.player1);
    }
    if (playersSet.player2 != myLogin){
      loginList.push(playersSet.player2);
    }
    if (playersSet.player3 != myLogin){
      loginList.push(playersSet.player3);
    }
    if (playersSet.player4 != myLogin){
      loginList.push(playersSet.player4);
    }
    return loginList;
  }
}
