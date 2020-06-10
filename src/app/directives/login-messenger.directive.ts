import { Directive, ElementRef } from '@angular/core';
import { LoginService } from '../services/login.service';

@Directive({
  selector: '[appLoginMessenger]'
})
export class LoginMessengerDirective {

  constructor(private ref: ElementRef, private service: LoginService) { 
    this.service.getMessage().subscribe(a => {this.printMessage(a)});
  }

  printMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }
}
