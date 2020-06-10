import { DoubleFieldSelectorService } from 'src/app/services/game/board/double-field-selector.service';
import { OwnedAreaUnit } from '../../game-models/ownedAreaUnit';
import { Army } from '../../game-models/battles/army';

export class ArmyTransferBase {

    constructor(protected selector: DoubleFieldSelectorService){}

    armyToSend: Army = {
        droids: 0,
        tanks: 0,
        cannons: 0
      }

    protected getFirstArea(){
        return this.selector.startingPoint.area;
    }
    
    protected getTargetArea(){
        return this.selector.target.area;
    }

    protected getFirstArmy(){
        let unit = this.getFirstArea() as OwnedAreaUnit;
        return unit.ARMY;
    }
    
    protected getTargetArmy(){
        let area = this.getTargetArea() as OwnedAreaUnit;
        return area.ARMY;
    }

    protected getFromArmy(army: Army, index: number){
        switch(index){
          case 1:
            return army.droids;
          case 2:
            return army.tanks;
          case 3: 
            return army.cannons;
          default:
            return 0;      
        }
    }

    getSecondUnits(index: number){
        let army = this.getTargetArmy();
        return this.getFromArmy(army, index);
    }
    
    getFirstUnits(index: number){
        let army = this.getFirstArmy();
        return this.getFromArmy(army, index);
    }

    protected getFromTransfer(index: number){
        return this.getFromArmy(this.armyToSend, index);
      }

    protected getRealSendingArmy(){
      let available = this.getFirstArmy();
      let selected = this.armyToSend;
      if (selected.droids > available.droids){
        selected.droids = available.droids;
      }
      if (selected.tanks > available.tanks){
        selected.tanks = available.tanks;
      }
      if (selected.cannons > available.cannons){
        selected.cannons = available.cannons;
      }
      return selected;
    }  
    
    protected getRealAmountFromTransfer(index: number){
        let fromTransfer = this.getFromTransfer(index);
        let available = this.getFirstUnits(index);
        if (available < fromTransfer){
          return available;
        } else {
          return fromTransfer;
        }
    }

    selectAll(index: number){
        let availableArmy = this.getFirstArmy();
        switch (index){
          case 1:
            this.armyToSend.droids = availableArmy.droids;
            break;
          case 2:
            this.armyToSend.tanks = availableArmy.tanks;
            break;
          case 3:
            this.armyToSend.cannons = availableArmy.cannons;
            break;
        }
      }
}