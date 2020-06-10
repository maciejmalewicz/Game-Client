import { Component, OnInit } from '@angular/core';
import { PresenceNotifierService } from 'src/app/services/shared/presence-notifier.service';

@Component({
  selector: 'app-main-messenger',
  templateUrl: './main-messenger.component.html',
  styleUrls: ['./main-messenger.component.css']
})
export class MainMessengerComponent implements OnInit {

  constructor(public notifier: PresenceNotifierService) { }

  ngOnInit(): void {
  }

}
