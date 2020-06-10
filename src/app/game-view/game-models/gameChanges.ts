import { ResponseBase } from 'src/app/models/responseBase';
import { ResourceSet } from './players/resourceSet';
import { NotificationBase } from './gameResponses/notificationBase';
import { NotificationsInbox } from './notificationsInbox';

export interface GameChanges extends ResponseBase {
    status: number,
    resources: ResourceSet,
    timeFromStart: number,
    inbox: NotificationsInbox
}