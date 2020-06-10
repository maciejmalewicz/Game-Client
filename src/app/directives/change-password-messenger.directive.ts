import { Directive, ElementRef } from '@angular/core';
import { AccountService } from '../services/menu/account.service';

@Directive({
  selector: '[appChangePasswordMessenger]'
})
export class ChangePasswordMessengerDirective {

  constructor(private ref: ElementRef, private service: AccountService) { 
    this.service.getPasswordMessenger().subscribe(msg => {
      this.printMessage(msg);
    })
  }

  printMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
}
}
