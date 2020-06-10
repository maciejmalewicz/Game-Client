import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { Location } from 'src/app/game-view/game-models/location';

export class AreaCheck{


    area: AreaUnit;
    location: Location;
    checked: boolean;
    parent: AreaCheck = null;

    constructor(area: AreaUnit, location: Location){
        this.area = area;
        this.checked = false;
        this.location = location;
    }

    markAsChecked(){
        this.checked = true;
    }

}