import { Directive, ElementRef } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Directive({
  selector: '[appActivationMessenger]'
})
export class ActivationMessengerDirective {

  constructor(private regService: RegistrationService, private ref: ElementRef) { 
    this.regService.getActivationState().subscribe(a => {
      this.printMessage(a as number);
    },
    error => {
      console.log('eee');
      this.printMessage(3);
    },
    () => {console.log('eee')});
  }

  loadingHidden = true;

  printMessage(state: number){
    let message = "";
    if (state == 1){
      message = "Activation code is empty!";
    }
    if (state == 2){
      message = "Couldn't activate this code. Generate new one above!";
    } 
    if (state == 3){
      message = "Internal server error! Couldn't activate account!";
    }
    if (state == 100){
      message = "";
    }
    if (state == 0){
      message = "Your account has been created succesfully! You may log in now!";
    }
    this.ref.nativeElement.innerHTML = message;
  }

}
