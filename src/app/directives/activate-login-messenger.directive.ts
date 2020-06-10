import { Directive, ElementRef } from '@angular/core';
import { AccountService } from '../services/menu/account.service';

@Directive({
  selector: '[appActivateLoginMessenger]'
})
export class ActivateLoginMessengerDirective {

  constructor(private ref: ElementRef, private service: AccountService) {
    this.service.getActivateLoginMessenger().subscribe(resp => {
      this.printMessage(resp);
    })
  }

  printMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }

}
