import { Location } from '../location';
import { OwnedAreaUnitMessage } from '../ownedAreaUnitMessage';
import { NotificationBase } from './notificationBase';

export interface AreaDetailsNotification extends NotificationBase {
    location: Location,
    message: OwnedAreaUnitMessage
}