import { Component, OnInit } from '@angular/core';
import { ProfileResponse } from 'src/app/models/menu-models/profileResponse';
import { FriendsService } from 'src/app/services/menu/friends.service';

@Component({
  selector: 'app-profile-history',
  templateUrl: './profile-history.component.html',
  styleUrls: ['./profile-history.component.css']
})
export class ProfileHistoryComponent implements OnInit {

  constructor(private friendService: FriendsService) {
    this.friendService.getProfileSignals().subscribe(resp => {
      this.currentlyLoadedProfile = resp;
    })
  }

  currentlyLoadedProfile: ProfileResponse = null;

  ngOnInit(): void {
  }

}
