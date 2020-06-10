import { ResponseBase } from '../responseBase';

export interface StringsResponse extends ResponseBase{
    strings: Array<string>;
}