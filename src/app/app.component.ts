import { Component, AfterViewInit, ElementRef, HostListener, OnInit } from '@angular/core';
import { PageChangerService } from './services/shared/page-changer.service';
import { KeyEventHandlerService } from './services/shared/key-event-handler.service';
import { PresenceNotifierService } from './services/shared/presence-notifier.service';
import { FieldSizerService } from './services/game/rightWindow/field-sizer.service';
import { ServerCoordinationService } from './services/shared/server-coordination.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit{

  ngOnInit(): void {
    setInterval(() => {this.notifier.notify();}, this.notifier.notificationRate)
    setInterval(() => {this.notifier.nextMessage();}, this.notifier.messageDelay)
  }

  constructor(private ref: ElementRef, private pageChanger: PageChangerService,
            private keyListener: KeyEventHandlerService, private notifier: PresenceNotifierService,
            private gameSizer: FieldSizerService, private sc: ServerCoordinationService){

    this.pageChanger.getActivePage().subscribe(n => {
      switch(n){
        case 0:
          this.goHome();
          break;
        case 1:
          this.goToMenu();
          break;
        case 2:
          this.goToGame();
          break; 
        default:
          console.log('???');    
      }
    })
  }

  homePageHidden = false;
  menuHidden = true;
  gameViewHidden = true;

  goHome(){
    this.homePageHidden = false;
    this.menuHidden = true;
    this.gameViewHidden = true;
    this.ref.nativeElement.ownerDocument.body.className = 'main-background';
  }

  goToMenu(){
    this.homePageHidden = true;
    this.menuHidden = false;
    this.gameViewHidden = true;
    this.ref.nativeElement.ownerDocument.body.className = 'menu-background';
  }

  goToGame(){
    this.homePageHidden = true;
    this.menuHidden = true;
    this.gameViewHidden = false;
    //this.sc.doAfter(this.gameSizer.requestSize, this.gameSizer, 2000)
    //this.gameSizer.requestSize();
  }

  ngAfterViewInit(): void {
    this.ref.nativeElement.ownerDocument.body.className = 'main-background';
  }

  @HostListener('document: keypress', ['$event'])
  handlePress(event: KeyboardEvent){
    this.keyListener.handleKeyEvent(event);
  }

}
