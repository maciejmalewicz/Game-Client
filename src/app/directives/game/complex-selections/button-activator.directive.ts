import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { ServerCoordinationService } from 'src/app/services/shared/server-coordination.service';

@Directive({
  selector: '[appButtonActivator]'
})
export class ButtonActivatorDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2,
    private sc: ServerCoordinationService) { }
  
  private defaultSource: string = "/assets/game-graphics/misc/green-button.png";
  private selectSource: string = "/assets/game-graphics/misc/selected-button.png";

  @Input()
  enlightingCondition: boolean;

  @HostListener("click", ["$event"]) onClick(){
    if (this.enlightingCondition){
      this.renderer.setAttribute(this.ref.nativeElement, "src", this.selectSource);
      this.sc.doAfter(this.setBack, this, 50);
    }
  }

  private setBack(){
    this.renderer.setAttribute(this.ref.nativeElement, "src", this.defaultSource);
  }

  // @HostListener("mouseup", ["$event"]) onRelease(){
  //   console.log("Realeasing");
  // }

}
