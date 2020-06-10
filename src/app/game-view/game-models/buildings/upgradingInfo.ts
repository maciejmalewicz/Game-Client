export class UpgradingInfo{
    b1: boolean;
    b2: boolean;
    b3: boolean;
    b4: boolean;
    b5: boolean;

    isUpgraded(n: number): boolean{
        switch(n){
            case 1:
                return this.b1;
            case 2: 
                return this.b2;  
            case 3: 
                return this.b3;
            case 4:
                return this.b4;
            case 5:
                return this.b5;
            default:
                return false;                   
        }
    }
}
