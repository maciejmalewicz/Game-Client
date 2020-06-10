import { Injectable } from '@angular/core';
import { SelectedFieldService } from '../board/selected-field.service';
import { UpgradeWallsRequest } from 'src/app/game-view/game-models/requests/upgradeWallsRequest';
import { HttpClient } from '@angular/common/http';
import { ServerCoordinationService } from '../../shared/server-coordination.service';
import { CodeHandlerService } from '../../shared/code-handler.service';
import { HttpAddresserService } from '../../shared/http-addresser.service';
import { TimeResponse } from 'src/app/models/playersRequestsResponses/timeResponse';
import { Building } from 'src/app/game-view/game-models/buildings/building';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';
import { BuildingConstructionEvent } from 'src/app/game-view/game-models/postponedEvents/buildingConstructionEvent';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { UpgradingBaseService } from '../rightWindow/upgrading-base.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';

@Injectable({
  providedIn: 'root'
})
export class UpgradeWallsService extends UpgradingBaseService{

  constructor(private area: SelectedFieldService, private http: HttpClient,
            private sc: ServerCoordinationService, private codeHandler: CodeHandlerService,
            private addresser: HttpAddresserService, private selectedField: SelectedFieldService) { 

              super();
            }

  upgradeWalls(){
    let request: UpgradeWallsRequest = {
      location: this.area.location
    }
    this.sc.sendToServer(this.doUpgradeWalls, this, request);
  }

  doUpgradeWalls(request: UpgradeWallsRequest){
    this.http.post<TimeResponse>(this.addresser.address + "api/wallsUpgrading/" + this.codeHandler.code, request)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      if (resp.status == 0){
        this.reactToResponse(resp);
      }
    });
  }

  private reactToResponse(resp: TimeResponse){
    if (this.area.getWalls() == null){
      this.createBuildingEvent(resp);
    } else {
      this.createUpgradingEvent(resp);
    }
  }

  private createUpgradingEvent(resp: TimeResponse){
    let event: BuildingUpgradeEvent = new BuildingUpgradeEvent();
    event.building = this.getWallsBuilding();
    let lastEvent = this.area.getLatestEvent(6) as BuildingUpgradeEvent;
    event.level = this.getLevelToUpgrade(event.building, lastEvent);
    event.place = 6;
    event.finishingTime = resp.finishingTime;
    let area = this.selectedField.selectedField as OwnedAreaUnit;
    this.pushEventSorted(event);
  }

  private getWallsBuilding(){
    let building = this.area.getWalls();
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      building = ucb.buildingUnderConstruction;
    }
    return building;
  }

  private createBuildingEvent(resp: TimeResponse){
    let event: BuildingConstructionEvent = new BuildingConstructionEvent();
    event.building = this.createUnderConstructionWalls().buildingUnderConstruction;
    event.place = 6;
    event.finishingTime = resp.finishingTime;
    this.pushEventSorted(event);
  }

  private createUnderConstructionWalls(){
    let building: UnderConstructionBuilding = {
      buildingUnderConstruction: this.createWalls(),
      LABEL: "UNDER_CONSTRUCTION_BUILDING",
      LEVEL: 1
    }
    let area = this.selectedField.selectedField as OwnedAreaUnit;
    area.WALLS = building;
    return building;
  }


  private createWalls(): Building{
    let building: Building = {
      LEVEL: 1,
      LABEL: "WALLS"
    }
    return building;
  }

  private pushEventSorted(event: BuildingConstructionEvent){
    let area = this.area.selectedField as OwnedAreaUnit;
    let events = area.BUILDING_QUEUE.events;
    events.push(event);
    events.sort((a, b) => {
      return a.compareWith(b);
    })
  }
}
