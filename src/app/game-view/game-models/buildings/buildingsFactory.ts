import { SmallBuilding } from './smallBuilding';

export class BuildingsFactory{

    createSmallBuilding(n: number){
        let s: string = "";
        switch (n){
            case 1:
                s = "SMALL_METAL";
                break;
            case 2:
                s = "SMALL_BUILDING_MATERIALS";
                break;
            case 3:
                s = "SMALL_ELECTRICITY";
                break;
            case 4:
                s = "OBSERVATORY";
                break;
            case 5:
                s = "DROIDS";
                break;
            case 6:
                s = "TANKS";
                break;
            case 7:
                s = "CANNONS";
                break;                        
        }
        let out: SmallBuilding = {
            LEVEL: 1,
            LABEL: s
        }
        return out;
    }
}