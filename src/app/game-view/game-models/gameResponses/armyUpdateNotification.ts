import { NotificationBase } from './notificationBase';
import { Army } from '../battles/army';
import { Location } from '../location';

export interface ArmyUpdateNotification extends NotificationBase{
    location: Location,
    army: Army
}