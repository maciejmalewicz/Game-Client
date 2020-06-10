import { ResponseBase } from '../responseBase';

export interface StatusResponse extends ResponseBase{
    status: number;
}