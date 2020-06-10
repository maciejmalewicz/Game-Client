import { StatusResponse } from '../menu-models/statusResponse';

export interface TimeResponse extends StatusResponse{
    finishingTime: number
}