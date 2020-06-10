import { Component, OnInit } from '@angular/core';
import { ClickSoundService } from 'src/app/services/shared/click-sound.service';
import { TypeSoundService } from 'src/app/services/shared/type-sound.service';
import { RegistrationService } from 'src/app/services/registration.service';
import { registerLocaleData } from '@angular/common';
import { RegistrationData } from 'src/app/models/registrationData';
import { ServerCoordinationService } from 'src/app/services/shared/server-coordination.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  constructor(private clicker: ClickSoundService, 
  private typer: TypeSoundService, 
  private regService: RegistrationService,
  private sc: ServerCoordinationService) { }

  ngOnInit(): void {
  }

  login: string;
  password: string;
  passwordRepeated: string;
  email: string;
  code: string;

  aLoadingHidden = true;
  rLoadingHidden = true;

  register(){
    this.clicker.play();
    this.rLoadingHidden = false;
    let messageState = this.validateData();
    if (messageState == 0){
      let data: RegistrationData = {
        login: this.login,
        password: this.password,
        email: this.email
      }
      this.regService.register(data).subscribe(a => {
        this.regService.pushState(a);
        if (a == 0){
          this.clear();
        }
        this.rLoadingHidden = true;
      })
    } else {
      this.regService.pushState(messageState);
      this.sc.doAfter(() => {this.regService.pushState(100)}, this, 5000);
      this.rLoadingHidden = true;
    }
  }

  validateData(): number { //returns number on which depends error message shown
    if (this.login == null || this.login.length == 0){
      return 1; //1 - empty login
    } else if (this.password == null || this.password.length < 8){
      return 2; //2 - password too short
    } else if (!this.hasLowerCase(this.password)){
      return 3; //3 - password doesn't contain any lower case letter
    } else if (!this.hasUpperCase(this.password)){
      return 4; //4 - password doesn't contain any upper case letter
    } else if (!this.hasNumber(this.password)){
      return 5; //5 password doesn't have a number
    } else if (this.passwordRepeated == null || (this.password != this.passwordRepeated)){
      return 6; //6 passwords don't match
    } else if (this.email == null || this.email.length == 0){
      return 7; //empty email
    } else {
      return 0;
    }
  }

  hasLowerCase(s: string){
    return s.toUpperCase() != s;
  }

  hasUpperCase(s: string){
    return s.toLowerCase() != s;
  }

  hasNumber(s: string){
    return s.includes('0') || s.includes('1') || s.includes('2')
    || s.includes('3') || s.includes('4') || s.includes('5')
    || s.includes('6') || s.includes('7') || s.includes('8')
    || s.includes('9');
  }

  activate() {
    this.clicker.play();
    this.aLoadingHidden = false;
    if (this.code == null || this.code.length == 0){
       this.regService.pushActivationState(1);
       this.aLoadingHidden = true;
    } else {
      this.regService.activate(this.code).subscribe(a => {
        this.regService.pushActivationState(a);
        this.aLoadingHidden = true;
      });
    }
    this.sc.doAfter(() => {this.regService.pushActivationState(100)}, this, 5000);
  }

  type(){
    this.typer.play();
  }

  clear(){
    this.login = ""; //clear data if everything went fine
    this.password = "";
    this.passwordRepeated = "";
    this.email = "";
  }

}
