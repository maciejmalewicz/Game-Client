import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appHorizontalLinkResizer]'
})
export class HorizontalLinkResizerDirective {

  linkWidth: string;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.getScreenSize();
   }
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          let width = (window.innerHeight - 100)/11;
          this.linkWidth = width + "px";
          let linkLeftPosition = width/2 + "px";
          let linkTopPosition = width*17/48 + "px";
          this.renderer.setStyle(this.ref.nativeElement, "width", this.linkWidth);
          this.renderer.setStyle(this.ref.nativeElement, "top", linkTopPosition);
          this.renderer.setStyle(this.ref.nativeElement, "left", linkLeftPosition);
    }

}
