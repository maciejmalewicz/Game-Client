import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/menu/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private service: AccountService) { }

  passwordFirst: string = "";
  passwordRepeated: string = "";
  code: string = "";

  ngOnInit(): void {
  }

  activatePassword(){
    if (this.code.length == 0){
      this.service.sendPasswordCodeMessage(-4);
    } else {
      this.service.activatePassword(this.code);
    }
  }

  changePassword(){
    let result = this.validatePassword();
    if (result != 0){
      this.service.sendPasswordMessage(result);
    } else {
      this.service.changePassword(this.passwordFirst);
      this.passwordFirst = "";
      this.passwordRepeated = "";
    }
  }

  private validatePassword(): number{
    if (this.passwordFirst != this.passwordRepeated){
      return 1;
    } else if (this.passwordFirst.length < 8){
      return 2;
    } else if (!this.hasLowerCase(this.passwordFirst)){
      return 3;
    } else if (!this.hasUpperCase(this.passwordFirst)){
      return 4;
    } else if (!this.hasNumber(this.passwordFirst)){
      return 5;
    } else {
      return 0;
    }
  }

  activateCode(){

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

}
