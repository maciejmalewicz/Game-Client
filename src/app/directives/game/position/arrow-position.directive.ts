import { Directive, ElementRef, Renderer2, Input } from '@angular/core';
import { FieldSizerService } from 'src/app/services/game/rightWindow/field-sizer.service';

@Directive({
  selector: '[appArrowPosition]'
})
export class ArrowPositionDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2,
    private service: FieldSizerService) { 
      this.service.getSizeNofitications().subscribe(resp => {
        this.allocate(resp);
      })

  }

  @Input()
  loc: number;

  allocate1(size: number){
    let length = Math.floor(0.15 * size);
    let a: string = length + "px";
    let veritcalPosition: string = Math.floor(0.5 * size - (length/2)) + "px";
    let horizontalPosition: string = Math.floor(0.5 * size - (length/2)) + "px";
          
    this.renderer.setStyle(this.ref.nativeElement, "width", a);
    this.renderer.setStyle(this.ref.nativeElement, "height", a);
    this.renderer.setStyle(this.ref.nativeElement, "left", horizontalPosition);
    this.renderer.setStyle(this.ref.nativeElement, "top", veritcalPosition);
  }

  allocate2(size: number){
    let length = Math.floor(0.09 * size);
    let a: string = length + "px";
          let veritcalPosition: string = Math.floor(0.1875*size + (0.125*size - length)/2) + "px";
          let horizontalPosition: string = Math.floor(0.5 * size - (length/2)) + "px";
          
          this.renderer.setStyle(this.ref.nativeElement, "width", a);
          this.renderer.setStyle(this.ref.nativeElement, "height", a);
          this.renderer.setStyle(this.ref.nativeElement, "left", horizontalPosition);
          this.renderer.setStyle(this.ref.nativeElement, "top", veritcalPosition);
  }

  allocate3(size: number){
    let length = Math.floor(0.09 * size);
    let a: string = length + "px";
          let veritcalPosition: string = Math.floor(0.1875*size + ((0.125*size - length)/2)) + "px";
          let horizontalPosition: string = Math.floor(0.5 * size - (length/2)) + "px";
          
          this.renderer.setStyle(this.ref.nativeElement, "width", a);
          this.renderer.setStyle(this.ref.nativeElement, "height", a);
          this.renderer.setStyle(this.ref.nativeElement, "left", horizontalPosition);
          this.renderer.setStyle(this.ref.nativeElement, "bottom", veritcalPosition);
  }

  allocate4(size: number){
    let length = Math.floor(0.09 * size);
    let a: string = length + "px";
          let veritcalPosition: string = Math.floor(0.5 * size - (length/2)) + "px";
          let horizontalPosition: string = Math.floor(0.1875*size + ((0.125*size - length)/2)) + "px";
          
          this.renderer.setStyle(this.ref.nativeElement, "width", a);
          this.renderer.setStyle(this.ref.nativeElement, "height", a);
          this.renderer.setStyle(this.ref.nativeElement, "left", horizontalPosition);
          this.renderer.setStyle(this.ref.nativeElement, "top", veritcalPosition);
  }

  allocate5(size: number){
    let length = Math.floor(0.09 * size);
    let a: string = length + "px";
          let veritcalPosition: string = Math.floor(0.5 * size - (length/2)) + "px";
          let horizontalPosition: string = Math.floor(0.1875*size + ((0.125*size - length)/2)) + "px";
          
          this.renderer.setStyle(this.ref.nativeElement, "width", a);
          this.renderer.setStyle(this.ref.nativeElement, "height", a);
          this.renderer.setStyle(this.ref.nativeElement, "right", horizontalPosition);
          this.renderer.setStyle(this.ref.nativeElement, "top", veritcalPosition);
  }

  allocate6(size: number){
    let length = Math.floor(0.15 * size);
    let a: string = length + "px";
          let veritcalPosition: string = Math.floor(0.125 * size) + "px";
          let horizontalPosition: string = Math.floor(0.125 * size) + "px";
          
          this.renderer.setStyle(this.ref.nativeElement, "width", a);
          this.renderer.setStyle(this.ref.nativeElement, "height", a);
          this.renderer.setStyle(this.ref.nativeElement, "left", horizontalPosition);
          this.renderer.setStyle(this.ref.nativeElement, "bottom", veritcalPosition);
  }


allocate(size: number) {
  if (this.loc == 1){
    this.allocate1(size);
  }
  if (this.loc == 2){
    this.allocate2(size);
  }
  if (this.loc == 3){
    this.allocate3(size);
  }
  if (this.loc == 4){
    this.allocate4(size);
  }
  if (this.loc == 5){
    this.allocate5(size);
  }
  if (this.loc == 6){
    this.allocate6(size);
  }
}

}
