import { Injectable } from '@angular/core';
import { GameConfiguration } from 'src/app/models/configuration/gameConfiguration';
import { CodeHandlerService } from '../shared/code-handler.service';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { HttpClient } from '@angular/common/http';
import { ServerCoordinationService } from '../shared/server-coordination.service';
import { GameConfigurationResponse } from 'src/app/models/configuration/gameConfigurationResponse';

@Injectable({
  providedIn: 'root'
})
export class GameConfigurationService {

  constructor(private addresser: HttpAddresserService, private codeHandler: CodeHandlerService,
              private http: HttpClient, private sc: ServerCoordinationService) { }

  configuration: GameConfiguration;

  loadConfiguration(){
    this.sc.interactWithServer(this.doLoadConfiguration, this);
  }

  doLoadConfiguration(){
    this.http.get<GameConfigurationResponse>(this.addresser.address + "api/config/" + this.codeHandler.code)
    .subscribe(resp => {
      this.codeHandler.code = resp.code;
      this.configuration = resp.configuration;
      console.log(this.configuration);
    })
  }

}
