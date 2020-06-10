import { Component, OnInit } from '@angular/core';
import { ClickSoundService } from 'src/app/services/shared/click-sound.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {

  constructor(private clicker: ClickSoundService) { }

  loginHidden = false;
  registrationHidden = true;

  

  goToLogin(){
    this.clicker.play();
    this.loginHidden = false;
    this.registrationHidden = true;
  }

  goToRegistration(){
    this.clicker.play();
    this.loginHidden = true;
    this.registrationHidden = false;
  }

  ngOnInit(): void {
  }

}
