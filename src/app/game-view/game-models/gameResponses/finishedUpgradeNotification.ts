import { Location } from '../location';
import { NotificationBase } from './notificationBase';

export interface FinishedUpgradeNotification extends NotificationBase{
    location: Location,
    place: number,
    level: number
}