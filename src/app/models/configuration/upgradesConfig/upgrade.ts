import { ResourceSet } from 'src/app/game-view/game-models/players/resourceSet';
import { Time } from 'src/app/game-view/game-models/time';

export interface Upgrade{
    //upgrades that must be done before doing this particular one
    REQUIREMENTS: Array<number>;

    //COST of an upgrade
    COST: ResourceSet;

    //time needed to finish an upgrade
    RESEARCH_TIME: Time;
}