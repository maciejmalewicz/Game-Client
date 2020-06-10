import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { ServerCoordinationService } from '../services/shared/server-coordination.service';

@Directive({
  selector: '[appEnlighter]'
})
export class EnlighterDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2,
              private sc: ServerCoordinationService) { }

  @HostListener('mouseenter', ['$event']) onEnter( e: MouseEvent ) {
    this.renderer.addClass(this.ref.nativeElement, "enlightment")
  }

  @HostListener('mouseleave', ['$event']) onLeave( e: MouseEvent ) {
    this.renderer.removeClass(this.ref.nativeElement, "enlightment")
  }

  @HostListener('click', ['$event']) onClick( e: MouseEvent ) {
    this.select();
    this.sc.doAfter(this.unselect, this, 50);
  }

  select(){
    this.renderer.addClass(this.ref.nativeElement, "selecting")
  }

  unselect(){
    this.renderer.removeClass(this.ref.nativeElement, "selecting")
  }
}
