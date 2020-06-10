import { Building } from './building';

export interface UnderConstructionBuilding extends Building{
    buildingUnderConstruction: Building
}