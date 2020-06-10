import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { FieldSizerService } from 'src/app/services/game/rightWindow/field-sizer.service';

@Directive({
  selector: '[appCenterPosition]'
})
export class CenterPositionDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2,
    private service: FieldSizerService) { 
      this.service.getSizeNofitications().subscribe(resp => {
        this.allocate(resp);
      })

  }


allocate(size: number) {
  let a: string = Math.floor(0.25 * size) + "px";
  let veritcalPosition: string = Math.floor(0.375 * size) + "px";
  let horizontalPosition: string = Math.floor(0.375 * size) + "px";
          
  this.renderer.setStyle(this.ref.nativeElement, "width", a);
  this.renderer.setStyle(this.ref.nativeElement, "height", a);
  this.renderer.setStyle(this.ref.nativeElement, "left", horizontalPosition);
  this.renderer.setStyle(this.ref.nativeElement, "top", veritcalPosition);
}
}
