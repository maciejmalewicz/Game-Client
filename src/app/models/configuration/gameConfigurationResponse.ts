import { ResponseBase } from '../responseBase';
import { GameConfiguration } from './gameConfiguration';

export interface GameConfigurationResponse extends ResponseBase{
    configuration: GameConfiguration
}