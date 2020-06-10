import { ResponseBase } from '../responseBase';
import { Settings } from './settings';


export interface SettingsResponse extends ResponseBase{
    settings: Settings;
}