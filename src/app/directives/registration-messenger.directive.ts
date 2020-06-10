import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { RegistrationService } from '../services/registration.service';
import { HttpErrorResponse } from '@angular/common/http';


@Directive({
  selector: '[appRegistrationMessenger]'
})
export class RegistrationMessengerDirective {

  //private paragraph;
  
  constructor(private ref: ElementRef, private renderer: Renderer2, private regService: RegistrationService) { 
    //this.paragraph = this.renderer.createElement('p');
    this.regService.getState().subscribe(s => {
      this.postMessage(s as number);
    },
    err => {console.log('111111')});
  }

  postMessage(state: number){
    let message: string;
    console.log("state is " + state)
    switch(state){
      case 1:
        message = "Empty login!";
        break;
      case 2:
        message = "Password is too short!";
        break;  
      case 3:
        message = "Password doesn't contain any lower case letters!";
        break;
      case 4:
        message = "Password doesn't contain any upper case letters!";
        break;
      case 5:
        message = "Password doesn't contain any number!";
        break;  
      case 6:
        message = "Passwords don't match!"
        break;
      case 7:
        message = "Empty e-mail!";
        break;
      case 8:
        message = "Selected e-mail is already used!";
        break;  
      case 9:
        message = "Selected login is already used!";
        break;
      case 10:
        message = "Invalid e-mail address! We couldn't send an e-mail!";
        break;   
      case 11:
        message = "Internal server error! Couldn't generate activation code!";
        break;   
      case 100:
        message = "";
        break;  
      default:
      message = "Activation code has been sent! Enter it below!"; 
      break;   
    }
    this.ref.nativeElement.innerHTML = message;
  }


}
