import { Directive, ElementRef } from '@angular/core';
import { AccountService } from '../services/menu/account.service';

@Directive({
  selector: '[appActivatePassword]'
})
export class ActivatePasswordDirective {

  constructor(private ref: ElementRef, private service: AccountService) {
    this.service.getPasswordCodeMessenger().subscribe(msg => {
      this.printMessage(msg);
    })
  }

  printMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }

}
