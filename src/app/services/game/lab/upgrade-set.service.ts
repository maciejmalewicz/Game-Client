import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UpgradeSetService {

  UPGRADES_NUMBER: 33;
  constructor() { 
    for (let i = 0; i < this.UPGRADES_NUMBER; i++){
      this.upgrades.push(false);
    }
  }

  upgrades = new Array<boolean>();

  upgraded(upgrade: number){
    return this.upgrades[upgrade];
  }

  addUpgrade(index: number){
    this.upgrades[index] = true;
  }
}
