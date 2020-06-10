import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appLittleAreaResizer]'
})
export class LittleAreaResizerDirective {

  screenHeight: string;

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.getScreenSize();
   }
  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          let height = (window.innerHeight - 100)/11;
          this.screenHeight = height + "px";
          this.renderer.setStyle(this.ref.nativeElement, "height", this.screenHeight);
          this.renderer.setStyle(this.ref.nativeElement, "width", this.screenHeight);
          //this.renderer.setStyle(this.ref.nativeElement, "background-color", "rgba(0, 255, 0, 255)");

          // console.log(this.ref.nativeElement);
          
          // console.log(this.screenHeight)
          //console.log(this.screenHeight, this.screenWidth);
    }

}
