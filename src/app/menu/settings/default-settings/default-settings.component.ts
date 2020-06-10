import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/menu/settings.service';

@Component({
  selector: 'app-default-settings',
  templateUrl: './default-settings.component.html',
  styleUrls: ['./default-settings.component.css']
})
export class DefaultSettingsComponent implements OnInit {

  constructor(public settingsService: SettingsService) {
    let settings = settingsService.defaultSettings;
    this.goUp = String.fromCharCode(settings.goUp).toUpperCase();
    this.goDown = String.fromCharCode(settings.goDown).toUpperCase();
    this.goLeft = String.fromCharCode(settings.goLeft).toUpperCase();
    this.goRight = String.fromCharCode(settings.goRight).toUpperCase();
   }

  goUp;
  goDown;
  goLeft;
  goRight;

  ngOnInit(): void {
  }

}
