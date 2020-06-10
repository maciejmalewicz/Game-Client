import { ResponseBase } from './responseBase';
import { PlayersIbox } from './PlayersInbox';

export interface NotificationResponse extends ResponseBase{
    inbox: PlayersIbox;
}