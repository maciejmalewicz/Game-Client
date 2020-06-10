import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appAreaResizer]'
})
export class AreaResizerDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2) { 
    this.getScreenSize();
  }

  screenHeight: string;
  // screenWidth: string;


  ngOnInit(): void {
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          let height = window.innerHeight - 100;
          this.screenHeight = height + "px";
          this.renderer.setStyle(this.ref.nativeElement, "height", this.screenHeight);
          this.renderer.setStyle(this.ref.nativeElement, "width", this.screenHeight);
          // console.log(this.ref.nativeElement);
          
          // console.log(this.screenHeight)
          //console.log(this.screenHeight, this.screenWidth);
    }

}
