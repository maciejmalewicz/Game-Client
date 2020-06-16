import { NotificationBase } from './notificationBase';
import { Location } from '../location';
import { Army } from '../battles/army';

export interface ArmyTransferNotification extends NotificationBase{
    from: Location,
    to: Location,
    army: Army
}