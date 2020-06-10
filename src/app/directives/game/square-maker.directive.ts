import { Directive, HostListener, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { GameRefresherService } from 'src/app/services/game/game-refresher.service';

@Directive({
  selector: '[appSquareMaker]'
})
export class SquareMakerDirective implements OnInit{

  constructor(private ref: ElementRef, private renderer: Renderer2,
              private refresher: GameRefresherService) {
          
  }
  ngOnInit(): void {
    this.refresher.getSignals().subscribe(signal => {
      if (signal == 100){
        console.log("sending signal!")
        this.getScreenSize();
      }
    })
  }
  
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          let width = this.ref.nativeElement.offsetWidth;
          let h = width + "px";
          this.renderer.setStyle(this.ref.nativeElement, "height", h);
    }

}
