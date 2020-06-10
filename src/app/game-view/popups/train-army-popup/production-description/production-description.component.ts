import { Component, OnInit, Input } from '@angular/core';
import { ArmyTrainingBase } from 'src/app/game-view/army-training/armyTrainingBase';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingConfigurationMapperService } from 'src/app/services/game/rightWindow/building-configuration-mapper.service';
import { ConfigInfoService } from 'src/app/services/game/rightWindow/config-info.service';

@Component({
  selector: 'app-production-description',
  templateUrl: './production-description.component.html',
  styleUrls: ['./production-description.component.css']
})
export class ProductionDescriptionComponent extends ArmyTrainingBase implements OnInit {

  constructor(private selectedField: SelectedFieldService, private config: ConfigInfoService) { 

    super(selectedField, config);
  }

  @Input()
  productionType: number;

  @Input()
  unitType: number;

  ngOnInit(): void {
  }

  getTitle(){
    switch(this.productionType){
      case 1:
        return "REGULAR";
      case 2:
        return "BIG";
      case 3:
        return "MASS";    
    }
  }

  getAmountSource(){
    switch(this.productionType){
      case 1:
        return "assets/game-graphics/misc/upgrades/regular-production.png";
      case 2:
        return "assets/game-graphics/misc/upgrades/bigger-production.png";  
      case 3:
        return "assets/game-graphics/misc/upgrades/mass-production.png";  
    }
  }

}
