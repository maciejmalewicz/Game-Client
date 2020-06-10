import { Location } from '../location';
import { Army } from '../battles/army';

export interface TransferArmyRequest{
    location: Location,
    targetLocation: Location,
    army: Army,
    path: Array<Location>
}