import { Injectable } from '@angular/core';
import { HttpAddresserService } from '../../shared/http-addresser.service';
import { HttpClient } from '@angular/common/http';
import { CodeHandlerService } from '../../shared/code-handler.service';
import { ServerCoordinationService } from '../../shared/server-coordination.service';
import { BuildSmallBuildingRequest } from 'src/app/game-view/game-models/requests/buildSmallBuildingRequest';
import { StatusResponse } from 'src/app/models/menu-models/statusResponse';
import { TimeResponse } from 'src/app/models/playersRequestsResponses/timeResponse';
import { BuildingQueueService } from '../rightWindow/building-queue.service';
import { BuildingConstructionEvent } from 'src/app/game-view/game-models/postponedEvents/buildingConstructionEvent';
import { BuildingsFactory } from 'src/app/game-view/game-models/buildings/buildingsFactory';
import { SelectedFieldService } from '../board/selected-field.service';
import { UnderConstructionBuilding } from 'src/app/game-view/game-models/buildings/underConstructionBuilding';
import { GameInfoService } from '../board/game-info.service';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { Building } from 'src/app/game-view/game-models/buildings/building';

@Injectable({
  providedIn: 'root'
})
export class BuildBuildingService {

  constructor(private http: HttpClient, private addresser: HttpAddresserService,
              private codeHandler: CodeHandlerService, private sc: ServerCoordinationService,
              private selectedArea: SelectedFieldService, private gameInfo: GameInfoService) { }

  buildSmallBuilding(request: BuildSmallBuildingRequest){
    this.sc.sendToServer(this.doBuildSmallBuilding, this, request);
  }            

  buildingsFactory = new BuildingsFactory();


  private doBuildSmallBuilding(request: BuildSmallBuildingRequest){
    this.http.post<TimeResponse>(this.addresser.address + "api/build/" + this.codeHandler.code, request)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      if (resp.status == 0){
        let event: BuildingConstructionEvent = new BuildingConstructionEvent();
        event.finishingTime = resp.finishingTime;
        event.building = this.buildingsFactory.createSmallBuilding(request.building);
        event.place = request.place;
        //pushing event to queue
        //this.selectedArea.selectedField.BUILDING_QUEUE.events.push(event);
        this.pushEventSorted(event);
        //letting graphics know that something is being built
        this.createUnderConstructionBuilding(request, event.building);
      }
    })
  }

  createUnderConstructionBuilding(request: BuildSmallBuildingRequest, building: Building){
    let wrapper: UnderConstructionBuilding = {
      LABEL: "UNDER_CONSTRUCTION_BUILDING",
      LEVEL: 1,
      buildingUnderConstruction: building
    };
    this.gameInfo.setBuilding(wrapper, request.place, request.location);
  }
  
  pushEventSorted(event: BuildingConstructionEvent){
    let area = this.selectedArea.selectedField as OwnedAreaUnit;
    let events = area.BUILDING_QUEUE.events;
    events.push(event);
    events.sort((a, b) => {
      return a.compareWith(b);
    })
  }
}
