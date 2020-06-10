import { ResponseBase } from 'src/app/models/responseBase';
import { BoardMessage } from './boardMessage';
import { OpponentsMessage } from './opponentsMessage';
import { UpgradesSet } from './players/upgradesSet';

export interface GameStateResponse extends ResponseBase{
    boardMessage: BoardMessage,
    opponentsMessage: OpponentsMessage,
    upgradesMessage: UpgradesSet
}