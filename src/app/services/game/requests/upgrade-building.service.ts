import { Injectable } from '@angular/core';
import { BuildingSelectionService } from '../rightWindow/building-selection.service';
import { SelectedFieldService } from '../board/selected-field.service';
import { Location } from 'src/app/game-view/game-models/location';
import { UpgradeBuildingRequest } from 'src/app/game-view/game-models/requests/upgradeBuildingRequest';
import { HttpClient } from '@angular/common/http';
import { CodeHandlerService } from '../../shared/code-handler.service';
import { HttpAddresserService } from '../../shared/http-addresser.service';
import { TimeResponse } from 'src/app/models/playersRequestsResponses/timeResponse';
import { ServerCoordinationService } from '../../shared/server-coordination.service';
import { BuildingUpgradeEvent } from 'src/app/game-view/game-models/postponedEvents/buildingUpgradeEvent';
import { BuildingConstructionEvent } from 'src/app/game-view/game-models/postponedEvents/buildingConstructionEvent';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';


@Injectable({
  providedIn: 'root'
})
export class UpgradeBuildingService {

  constructor(private selection: BuildingSelectionService, private area: SelectedFieldService,
               private http: HttpClient, private codeHandler: CodeHandlerService,
               private addresser: HttpAddresserService, private sc: ServerCoordinationService) { }


  upgradeBuilding(){
    this.sc.interactWithServer(this.doUpgradeBuilding, this);
  }

  private doUpgradeBuilding(){
    let location: Location = this.area.location;
    let building: number = this.selection.currentSelection;
    let request: UpgradeBuildingRequest = {
      location: location,
      place: building
    }
    this.http.post<TimeResponse>(this.addresser.address + "api/upgradeBuilding/" + this.codeHandler.code, request)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      if (resp.status == 0){
        this.addToTheQueue(request, resp);
        this.area.refreshCurrentUpgrades();
      }
      console.log(resp);
    })
  }     
  
  private addToTheQueue(request: UpgradeBuildingRequest, response: TimeResponse){
    let building = this.area.get(request.place);
    let event = new BuildingUpgradeEvent();
    let currentEvent = this.area.getLatestEvent(request.place) as BuildingUpgradeEvent;
    
    let levelToUpgrade: number;
    //lowest possible upgrade level
    if (currentEvent == null || currentEvent.level == undefined){
      levelToUpgrade = building.LEVEL+1;
    } else {
      levelToUpgrade = currentEvent.level+1;
    }
    if (building.LABEL == "UNDER_CONSTRUCTION_BUILDING"){
      let ucb = building as UnderConstructionBuilding;
      building = ucb.buildingUnderConstruction;
    }
    event.building = building;
    event.level = levelToUpgrade;
    event.place = request.place;
    event.finishingTime = response.finishingTime;
    this.pushEventSorted(event);
  }

  pushEventSorted(event: BuildingConstructionEvent){
    let area = this.area.selectedField as OwnedAreaUnit;
    let events = area.BUILDING_QUEUE.events;
    events.push(event);
    events.sort((a, b) => {
      return a.compareWith(b);
    })
  }

}
