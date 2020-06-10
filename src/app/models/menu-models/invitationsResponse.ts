import { ResponseBase } from '../responseBase';

export interface InvitationsResponse extends ResponseBase{

    invitationsSent: Array<string>;
    invitationsReceived: Array<string>;
}