import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

export class ArmyTrainingBase{

    private selection: SelectedFieldService;
    private configInfo: ConfigInfoService;

    constructor(selection: SelectedFieldService,
                configInfo: ConfigInfoService ){
        this.selection = selection;
        this.configInfo = configInfo;
    }
    cannonsDescription = "Cannons are the best for big damage dealing. Very effective in protecting your areas, when supported with walls or towers. They are also usefull when attacking and mixed with some tanks, they will destroy anything in their path!";
    tanksDescription = "Tanks are heavy, expensive troops, that provide your army with loads of protection. They may be very usefull when attacking other players towers or areas with walls built, as few of them is enough to equalize the protection bonuses gained from defensive buildings!";
    droidsDescription = "Droids are the weakest kind of troops, quite balanced concerning hitpoints and attack damage they contribute to your army. They are very dangerous in early game, due to their fast production speed. Use them to ambush your opponents early and gain huge advantage!";

    getAmount(unitType: number, productionType: number){
        let building = this.getResponsibleBuilding(unitType);
        if (building == null){
            return 0;
        }
        let level = building.LEVEL;
        return this.configInfo.getMechProduction(building, level, productionType);
    }

    protected getResponsibleBuilding(unitType: number){
        if (this.selection.selectedField == null){
            return null;
        }
        if (this.selection.isHostile()){
           return null;
        }
        switch(unitType){
            case 1:
                return this.getDroidsFactory();
            case 2:
                return this.getTanksFactory();
            case 3:
                return this.getCannonsFactory();        
        }
        return null;
    }

    private getBuildingOfLabel(label: string){
        let buildings = this.selection.getExistingSmallBuildings();
        for (let building of buildings){
            if (building.LABEL == label){
                return building;
            }
        }
        return null;
    }

    private getDroidsFactory(){
        return this.getBuildingOfLabel("DROIDS");
    }

    private getTanksFactory(){
        return this.getBuildingOfLabel("TANKS");
    }

    private getCannonsFactory(){
        return this.getBuildingOfLabel("CANNONS");
    }

    getPrice(unitType: number, productionType: number){
        let building = this.getResponsibleBuilding(unitType);
        let level = building.LEVEL;
        return 30;
    }

    getTime(unitType: number, productionType: number){
        return "00:30";
    }
}