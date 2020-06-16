import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpAddresserService } from '../../shared/http-addresser.service';
import { CodeHandlerService } from '../../shared/code-handler.service';
import { ServerCoordinationService } from '../../shared/server-coordination.service';
import { DoubleFieldSelectorService } from '../board/double-field-selector.service';
import { Army } from 'src/app/game-view/game-models/battles/army';
import { AttackRequest } from 'src/app/game-view/game-models/requests/attackRequest';
import { TimeResponse } from 'src/app/models/playersRequestsResponses/timeResponse';
import { Location } from 'src/app/game-view/game-models/location';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { AttackEvent } from 'src/app/game-view/game-models/postponedEvents/armyMovementEvents/attackEvent';
import { GameInfoService } from '../board/game-info.service';
import { EventHandlerVars } from '@angular/compiler/src/compiler_util/expression_converter';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { PostponedEvent } from 'src/app/game-view/game-models/postponedEvents/postponedEvent';
import { ArmyMovementEvent } from 'src/app/game-view/game-models/postponedEvents/armyMovementEvents/armyMovementEvent';

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private http: HttpClient, private addresser: HttpAddresserService,
    private codeHandler: CodeHandlerService, private sc: ServerCoordinationService,
    private selector: DoubleFieldSelectorService, private gameInfo: GameInfoService) { }

    attack(army: Army, usingCommander: boolean){
      let request: AttackRequest = {
        location: this.selector.startingPoint.location,
        targetLocation: this.selector.target.location,
        path: this.selector.path,
        army: army,
        usingCommander: usingCommander
      }

      this.sc.sendToServer(this.doAttack, this, request);
    }

    private doAttack(request: AttackRequest){
      this.http.post<TimeResponse>(this.addresser.address + "api/attacks/" + this.codeHandler.code, request)
      .subscribe(resp => {
        this.codeHandler.code = resp.code;
        console.log(resp);
        if (resp.status == 0){
          this.subtractArmy(request);
          this.addEvent(request, resp);
        }
      })
    }

    private addEvent(request: AttackRequest, response: TimeResponse){
      let event = this.createEvent(request, response);
      this.pushEventSorted(event.fromArea, event);
      this.pushEventSorted(event.toArea, event);
    }

    private pushEventSorted(areaUnit: AreaUnit, event: ArmyMovementEvent){
      areaUnit.ARMY_MOVEMENT_QUEUE.events.push(event);
      areaUnit.ARMY_MOVEMENT_QUEUE.events.sort((a, b) => {return a.compareWith(b)});
    }

    private createEvent(request: AttackRequest, response: TimeResponse): AttackEvent{
      let event: AttackEvent = new AttackEvent();
        event.finishingTime = response.finishingTime;
        event.army = request.army;
        event.fromArea = this.gameInfo.getByLocation(request.location);
        event.toArea = this.gameInfo.getByLocation(request.targetLocation);
        event.from = request.location;
        event.to = request.targetLocation;
        event.label = AttackEvent.commonLabel;
      return event;
    }

    private subtractArmy(request: AttackRequest){
      let unit = this.selector.startingPoint.area as OwnedAreaUnit;
      let army = unit.ARMY;
      let toSubtract = request.army;
      army.droids -= toSubtract.droids;
      army.tanks -= toSubtract.tanks;
      army.cannons -= toSubtract.cannons;
    }
}
