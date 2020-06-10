import { Location } from '../location';

export interface TrainArmyRequest{
    location: Location,
    unitType: number,
    productionType: number
}