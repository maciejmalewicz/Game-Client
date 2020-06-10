import { Directive, ElementRef } from '@angular/core';
import { FriendsService } from '../services/menu/friends.service';

@Directive({
  selector: '[appInviteFriend]'
})
export class InviteFriendDirective {

  constructor(private ref: ElementRef, private friends: FriendsService) {
    this.friends.getSendingInvitationMessages().subscribe(msg => {
      this.sendMessage(msg);
    })
  }

  sendMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }

}
