import { Component, OnInit } from '@angular/core';
import { ProfileResponse } from 'src/app/models/menu-models/profileResponse';
import { FriendsService } from 'src/app/services/menu/friends.service';

@Component({
  selector: 'app-profile-description',
  templateUrl: './profile-description.component.html',
  styleUrls: ['./profile-description.component.css']
})
export class ProfileDescriptionComponent implements OnInit {

  constructor(private service: FriendsService) {
    this.service.getProfileSignals().subscribe(resp => {
      this.currentlyLoadedProfile = resp;
    })
  }

  currentlyLoadedProfile: ProfileResponse = null;

  ngOnInit(): void {
  }

}
