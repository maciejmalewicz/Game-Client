import { ResponseBase } from '../responseBase';
import { Friend } from './friend';

export interface FriendsResponse extends ResponseBase{
    friends: Array<Friend>;
}