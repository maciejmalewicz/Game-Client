import { Location } from '../location';
import { NotificationBase } from './notificationBase';

export interface AreaOwnershipNotification extends NotificationBase{
    location: Location,
    owner: string
}