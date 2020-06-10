import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardIconService {

  constructor() { }

  getBoardIconSource(label: string): string{
    switch (label){
      case "TOWER":
        return 'assets/game-graphics/tower.png';
      case "MAIN_TOWER":
        return 'assets/game-graphics/home.png';
      case "ROCKET":
        return 'assets/game-graphics/rocket.png';
      case "BIG_METAL":
        return 'assets/game-graphics/metal.png';
      case "BIG_BUILDING_MATERIALS":
        return 'assets/game-graphics/buildingMaterials.png';
      case "BIG_ELECTRICITY":
        return 'assets/game-graphics/electricity.png';
      default:
        return "?";
  }
}
}