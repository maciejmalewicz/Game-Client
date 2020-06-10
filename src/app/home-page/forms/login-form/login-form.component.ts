import { Component, OnInit } from '@angular/core';
import { ClickSoundService } from 'src/app/services/shared/click-sound.service';
import { TypeSoundService } from 'src/app/services/shared/type-sound.service';
import { PageChangerService } from 'src/app/services/shared/page-changer.service';
import { LoginData } from 'src/app/models/loginData';
import { LoginService } from 'src/app/services/login.service';
import { CodeHandlerService } from 'src/app/services/shared/code-handler.service';
import { LoginMessengerDirective } from 'src/app/directives/login-messenger.directive';
import { PresenceNotifierService } from 'src/app/services/shared/presence-notifier.service';
import { ServerCoordinationService } from 'src/app/services/shared/server-coordination.service';
import { GameRefresherService } from 'src/app/services/game/game-refresher.service';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private clicker: ClickSoundService, private typer: TypeSoundService, 
    private pageChanger: PageChangerService, private logService: LoginService,
    private codeService: CodeHandlerService, private sc: ServerCoordinationService,
    private gameRefresher: GameRefresherService) {
      this.observable = this.gameRefresher.getSignals();  

  }

  observable: Observable<number>;
  login: string;
  password: string;

  loadingHidden = true;

  ngOnInit(): void {
  }

  type(){
    this.typer.play();
  }

  logIn(){
    this.clicker.play();
    this.loadingHidden = false;
    let data: LoginData = {
      login: this.login,
      password: this.password
    };
    this.password = "";
    this.logService.logIn(data).subscribe(str => {
      if (str == "NOT FOUND"){
        this.logService.pushMessage("Wrong combination of login and password!");
      } else {
        this.logService.pushMessage("Welcome!");
        this.codeService.setCode(str);
        this.logService.login = this.login; //now, everything depends on whether a game has been started
        
        this.gameRefresher.checkIfPlaying();
        this.sc.doAfterCondition(this.getMenu, this, this.observable, 0);
        this.sc.doAfterCondition(this.getGame, this, this.observable, 1);
        // this.pageChanger.goToMenu(); //todo: stuff with finding started game
        // this.pageChanger.loadMenu();
      }
      this.sc.doAfter(() => {this.logService.pushMessage("")}, this, 5000); //hiding message
      this.loadingHidden = true;
    })
  }

  getMenu(){
    this.pageChanger.goToMenu(); //todo: stuff with finding started game
    this.pageChanger.loadMenu();
  }

  getGame(){
    this.pageChanger.loadGame();
    this.pageChanger.goToGame();
  }



}
