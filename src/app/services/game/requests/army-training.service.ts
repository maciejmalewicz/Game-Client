import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerCoordinationService } from '../../shared/server-coordination.service';
import { CodeHandlerService } from '../../shared/code-handler.service';
import { HttpAddresserService } from '../../shared/http-addresser.service';
import { TrainArmyRequest } from 'src/app/game-view/game-models/requests/trainArmyRequest';
import { TimeResponse } from 'src/app/models/playersRequestsResponses/timeResponse';
import { Location } from 'src/app/game-view/game-models/location';
import { SelectedFieldService } from '../board/selected-field.service';
import { OwnedAreaUnit } from 'src/app/game-view/game-models/ownedAreaUnit';
import { isFunction } from 'util';
import { ArmyTrainingEvent } from 'src/app/game-view/game-models/postponedEvents/armyTrainingEvent';

@Injectable({
  providedIn: 'root'
})
export class ArmyTrainingService {

  constructor(private http: HttpClient, private sc: ServerCoordinationService,
    private addresser: HttpAddresserService, private codeHandler: CodeHandlerService,
    private selectedField: SelectedFieldService) { }

    train(location: Location, unitType: number, productionType: number){
      let request: TrainArmyRequest = {
        location: location,
        unitType: unitType,
        productionType: productionType
      }
      this.sc.sendToServer(this.doTrain, this, request);
    }

    private doTrain(request: TrainArmyRequest){
      this.http.post<TimeResponse>(this.addresser.address + "api/training/" + this.codeHandler.code, request)
      .subscribe(resp => {
        this.codeHandler.code = resp.code;
        if (resp.status == 0){
          this.addEvent(request, resp);
        }
      })
    }

    private addEvent(request: TrainArmyRequest, response: TimeResponse){
      let event = new ArmyTrainingEvent();
      event.finishingTime = response.finishingTime;
      event.unitType = request.unitType;
      console.log("to fix");
      event.quantity = request.productionType;
      //!!!!
      //sort!!!
      this.pushEventSorted(event);
    }

    pushEventSorted(event: ArmyTrainingEvent){
      let area = this.selectedField.selectedField as OwnedAreaUnit;
      let events = area.TRAINING_QUEUE.events;
      events.push(event);
      events.sort((a, b) => {
        return a.compareWith(b);
      })
    }
}
