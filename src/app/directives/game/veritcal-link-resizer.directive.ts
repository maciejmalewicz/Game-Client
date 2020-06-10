import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appVeritcalLinkResizer]'
})
export class VeritcalLinkResizerDirective {

  linkHeight: string;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.getScreenSize();
   }
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          let height = (window.innerHeight - 100)/11;
          this.linkHeight = height + "px";
          let linkTopPosition = height/2 + "px";
          let linkLeftPosition = height*17/48 + "px";
          this.renderer.setStyle(this.ref.nativeElement, "height", this.linkHeight);
          this.renderer.setStyle(this.ref.nativeElement, "top", linkTopPosition);
          this.renderer.setStyle(this.ref.nativeElement, "left", linkLeftPosition);
          
    }

}
