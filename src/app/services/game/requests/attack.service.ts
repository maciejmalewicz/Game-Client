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

@Injectable({
  providedIn: 'root'
})
export class AttackService {

  constructor(private http: HttpClient, private addresser: HttpAddresserService,
    private codeHandler: CodeHandlerService, private sc: ServerCoordinationService,
    private selector: DoubleFieldSelectorService) { }

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
        }
      })
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
