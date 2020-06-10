import { Component, OnInit, AfterViewInit, DoCheck, ViewEncapsulation } from '@angular/core';
import { GameRefresherService } from 'src/app/services/game/game-refresher.service';
import { OwnedAreaUnit } from '../game-models/ownedAreaUnit';
import { FieldSizerService } from 'src/app/services/game/rightWindow/field-sizer.service';
import { ServerCoordinationService } from 'src/app/services/shared/server-coordination.service';
import { BuildingImageMapperService } from 'src/app/services/game/rightWindow/building-image-mapper.service';
import { PlaceSelectionService } from 'src/app/services/game/rightWindow/place-selection.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { Building } from '../game-models/buildings/building';
import { UpgradeBuildingService } from 'src/app/services/game/requests/upgrade-building.service';
import { UpgradingInfo } from '../game-models/buildings/upgradingInfo';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';
import { UpgradeWallsService } from 'src/app/services/game/requests/upgrade-walls.service';

@Component({
  selector: 'app-area-zoomed',
  templateUrl: './area-zoomed.component.html',
  styleUrls: ['./area-zoomed.component.css'],
  styles: [`
     /deep/ .dark {
        background: rgb(20, 20, 20);
     }
  `]
})
export class AreaZoomedComponent implements OnInit, DoCheck{

  constructor(private refresher: GameRefresherService, private selector: SelectedFieldService,
              private sizeService: FieldSizerService, private sc: ServerCoordinationService,
              private selection: BuildingSelectionService, private mapper: BuildingImageMapperService,
              private placeSelection: PlaceSelectionService, private upgrader: UpgradeBuildingService,
              private popupsLauncher: PopupsLauncherService, private wallsService: UpgradeWallsService) { 
    this.selector.getFieldUpdates().subscribe(field => {
      console.log(field);
    });
    this.selection.getSelections().subscribe(selection => {
      this.buildingSelected = selection;
    })
    this.selector.getUpgradesUpdates().subscribe(upgrades => {
      this.currentUpgrades = upgrades;
    })
    this.currentUpgrades = new UpgradingInfo();
  }
  ngDoCheck(): void {
    this.sizeService.requestSize();
  }

  dark: string = ".darkened { background-color: red }"

  buildingSelected: number;
  currentUpgrades: UpgradingInfo;

  upgradeWalls(){
    this.wallsService.upgradeWalls();
  }

  pushSelection(selection: number){
    this.placeSelection.pushSelection(selection);
    //launching this window with building
    if (this.selection.canBuildHere()){
      this.popupsLauncher.sendSignal(1);
    }
  }

  isBeingBuilt(n: number){
    let building = this.selector.get(n);
    if (building == null){
      return false;
    }
    return this.selector.get(n).LABEL == "UNDER_CONSTRUCTION_BUILDING";
  }

  canBeUpgraded(n: number){
    return this.selection.canBeUpgraded(n);

  }

  canWallsBeUpgraded(){
    return this.selector.canWallsBeUpgraded();
  }

  

  isSelected(n: number){
    if (this.buildingSelected == n){
      return true;
    }
    return false;
  }

  getBackground(): string{
    return "assets\\game-graphics\\field-background.jpg";
  }

  getCenterBuilding(): string{
    
    return this.mapper.getImage(this.selector.selectedField?.MAIN_BUILDING);
    // this.selector;
    // return "assets\\game-graphics\\rocket1.png";
  }

  getBuildingImage(building: Building){
    if (this.selector.isHostile()){
      return "assets\\game-graphics\\unknownbuilding.png";
    }
    if (building == null){
      return "assets/game-graphics/emptyBuildingPlace.png";
    }
    return this.mapper.getImage(building);
  }

  getNorthBuilding():string{
    return this.getBuildingImage(this.selector.getNorth());
  }

  getSouthBuilding(){
    return this.getBuildingImage(this.selector.getSouth());
  }

  getWestBuilding(){
    return this.getBuildingImage(this.selector.getWest());
  }

  getEastBuilding(){
    return this.getBuildingImage(this.selector.getEast());
  }

  getWalls(): string{
    let unit = this.selector.selectedField as OwnedAreaUnit;

    if (unit == null){
      return "assets/game-graphics/emptywalls.png";
    }
    if (this.selector.isHostile()){
      return "assets/game-graphics/unknownwalls.png";
    }
    if (unit.WALLS == null){
      return "assets/game-graphics/emptywalls.png";
    }
    if (unit.WALLS.LEVEL == 1){
      return "assets\\game-graphics\\lvl1walls.png";
    }
    if (unit.WALLS.LEVEL == 2){
      return "assets\\game-graphics\\lvl2walls.png";
    }
    if (unit.WALLS.LEVEL == 3){
      return "assets\\game-graphics\\lvl3walls.png";
    }
    
  }

  isUpgraded(index: number){
    return this.currentUpgrades.isUpgraded(index);
  }

  upgradeBuilding(){
    this.upgrader.upgradeBuilding();
  }
  
  ngOnInit(): void {
  }

}
