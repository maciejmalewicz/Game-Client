import { Injectable, OnInit } from '@angular/core';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { PlayersSet } from 'src/app/game-view/game-models/players/playersSet';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { Location } from 'src/app/game-view/game-models/location';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';


@Injectable({
  providedIn: 'root'
})
export class GameInfoService implements OnInit{

  constructor() { 
    for (let i = 0; i < 11; i++){
      let arr = new Array<AreaUnit>();
      for (let j = 0; j < 11; j++){
        let unit: AreaUnit = {
          
        }
        arr.push(unit);
      }
      this.areaUnits.push(arr);
    }
  }

  areaUnits = new Array<Array<AreaUnit>>();
  players: PlayersSet;

  getByLocation(location: Location): AreaUnit{
    return this.areaUnits[location.row][location.col];
  }


  getMyPlayerIndex(): number{ //from 1 to 4
    return this.players.you;
  }

  getUnit(location: Location){
    return this.areaUnits[location.row][location.col];
  }

  ownerOf(row: number, col: number){
    let owner = this.areaUnits[row][col].OWNER;
    if (owner == null){
      return 0;
    } 
    if (owner == this.players.player1){
      return 1;
    }
    if (owner == this.players.player2){
      return 2;
    }
    if (owner == this.players.player3){
      return 3;
    }
    if (owner == this.players.player4){
      return 4;
    }
    return -1;
  }

  ngOnInit(): void {
    
  }

  setBuilding(building: Building, place: number, location: Location){
    let areaUnit = this.areaUnits[location.row][location.col] as OwnedAreaUnit;
    switch(place){
      case 1:
        areaUnit.MAIN_BUILDING = building;
        break;
      case 2:
        areaUnit.NORTH_BUILDING = building;
        break;
      case 3:
        areaUnit.SOUTH_BUILDING = building;
        break;
      case 4:
        areaUnit.WEST_BUILDING = building;
        break;
      case 5:
        areaUnit.EAST_BUILDING = building;
        break;        
    }
  }

  

  
}
