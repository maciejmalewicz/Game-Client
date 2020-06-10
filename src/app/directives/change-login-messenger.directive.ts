import { Directive, ElementRef } from '@angular/core';
import { AccountService } from '../services/menu/account.service';

@Directive({
  selector: '[appChangeLoginMessenger]'
})
export class ChangeLoginMessengerDirective {

  constructor(private ref: ElementRef, private service: AccountService) {
    service.getLogMessage().subscribe(msg => {
      this.printMessage(msg);
    })
  }

  printMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }
}
