import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { PageChangerService } from 'src/app/services/shared/page-changer.service';
import { LogOutService } from 'src/app/services/shared/log-out.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public logService: LoginService, private logoutService: LogOutService) { }

  ngOnInit(): void {
  }

  historyHidden = false;
  changeLoginHidden = true;
  changePasswordHidden = true;

  hideAll(){
    this.historyHidden = true;
    this.changeLoginHidden = true;
    this.changePasswordHidden = true;
  }

  goToHistory(){  
    this.hideAll();
    this.historyHidden = false;
  }

  goToChangeLogin(){
    this.hideAll();
    this.changeLoginHidden = false;
  }

  goToChangePassword(){
    this.hideAll();
    this.changePasswordHidden = false;
  }
  deleteAccount(){
    console.log("todo");
  }

  logOut(){
    this.logoutService.logOut();
  }
}
