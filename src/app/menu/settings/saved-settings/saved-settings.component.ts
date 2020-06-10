import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/menu/settings.service';
import { Settings } from 'src/app/models/menu-models/settings';

@Component({
  selector: 'app-saved-settings',
  templateUrl: './saved-settings.component.html',
  styleUrls: ['./saved-settings.component.css']
})
export class SavedSettingsComponent implements OnInit {

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.settingsService.getSavedSettings().subscribe(s => {
      this.updateSettings(s);
    })
  }

  goUp;
  goDown;
  goLeft;
  goRight;

  updateSettings(settings: Settings){
    console.log(settings);
    if (settings != null){
      this.goUp = this.settingsService.mapToCharacter(settings.goUp);
      this.goDown = this.settingsService.mapToCharacter(settings.goDown);
      this.goLeft = this.settingsService.mapToCharacter(settings.goLeft);
      this.goRight = this.settingsService.mapToCharacter(settings.goRight);
    }
    
  }

}
