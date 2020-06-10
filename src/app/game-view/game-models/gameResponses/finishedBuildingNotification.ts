import { NotificationBase } from './notificationBase';
import { Location } from '../location';
import { Building } from '../buildings/building';

export interface FinishedBuildingNotification extends NotificationBase{
    location: Location,
    place: number,
    building: Building
}