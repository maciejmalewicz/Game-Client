import { PostponedEvent } from './postponedEvents/postponedEvent';
import { PostponedEventMessage } from './postponedEvents/postponedEventMessage';

export interface EventQueue{
    events: Array <PostponedEventMessage>
}