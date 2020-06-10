import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/menu/account.service';

@Component({
  selector: 'app-change-login',
  templateUrl: './change-login.component.html',
  styleUrls: ['./change-login.component.css']
})
export class ChangeLoginComponent implements OnInit {

  constructor(private service: AccountService) { }

  ngOnInit(): void {
  }

  login: string = "";
  code: string = "";

  sendLogin(){
    if (this.login.length == 0){
      this.service.sendLogMessage(1);
    } else {
      this.service.changeLogin(this.login);
    }
  }

  sendCode(){
    if (this.code.length == 0){
      this.service.sendActivateLogMessage(-4)
    } else {
      this.service.activateLogin(this.code);
    }
  }
}
