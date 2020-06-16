import { Injectable } from '@angular/core';
import { DoubleFieldSelectorService } from '../board/double-field-selector.service';
import { ServerCoordinationService } from '../../shared/server-coordination.service';
import { Army } from 'src/app/game-view/game-models/battles/army';
import { HttpClient } from '@angular/common/http';
import { HttpAddresserService } from '../../shared/http-addresser.service';
import { CodeHandlerService } from '../../shared/code-handler.service';
import { TimeResponse } from 'src/app/models/playersRequestsResponses/timeResponse';
import { TransferArmyRequest } from 'src/app/game-view/game-models/requests/transferArmyRequest';
import { Location } from 'src/app/game-view/game-models/location';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { ArmyTransferEvent } from 'src/app/game-view/game-models/postponedEvents/armyMovementEvents/armyTrasferEvent';
import { GameInfoService } from '../board/game-info.service';

@Injectable({
  providedIn: 'root'
})
export class ArmyTransferService {

  constructor(private selector: DoubleFieldSelectorService, private sc: ServerCoordinationService,
              private http: HttpClient, private addresser: HttpAddresserService,
              private codeHandler: CodeHandlerService, private gameInfo: GameInfoService) { }

  transferArmy(army: Army){
    let request: TransferArmyRequest = {
      location: this.selector.startingPoint.location,
      targetLocation: this.selector.target.location,
      path: this.selector.path,
      army: army
    }
    
    this.sc.sendToServer(this.doTransferArmy, this, request);
  }

  private doTransferArmy(request: TransferArmyRequest){
    console.log(request);
    this.http.post<TimeResponse>(this.addresser.address + "api/armyTransfers/" + this.codeHandler.code, request)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      
      if (resp.status == 0){
        this.subtractArmy(request);
        let event = this.createEvent(request, resp);
        this.pushEvent(event);
      }
    })
  }

  private pushEvent(event: ArmyTransferEvent){
    event.fromArea.ARMY_MOVEMENT_QUEUE.events.push(event);
    event.toArea.ARMY_MOVEMENT_QUEUE.events.push(event);
  }

  private createEvent(request: TransferArmyRequest, response: TimeResponse){
    let event = new ArmyTransferEvent();
    event.fromArea = this.gameInfo.getUnit(request.location);
    event.toArea = this.gameInfo.getUnit(request.targetLocation);
    event.from = request.location;
    event.to = request.targetLocation;
    event.army = request.army,
    event.finishingTime = response.finishingTime;
    event.label = ArmyTransferEvent.commonLabel;
    return event;
  }

  private subtractArmy(request: TransferArmyRequest){
    let unit = this.selector.startingPoint.area as OwnedAreaUnit;
    let army = unit.ARMY;
    let toSubtract = request.army;
    army.droids -= toSubtract.droids;
    army.tanks -= toSubtract.tanks;
    army.cannons -= toSubtract.cannons;
  }
}
