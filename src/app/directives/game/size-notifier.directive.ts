import { Directive, ElementRef, HostListener } from '@angular/core';
import { FieldSizerService } from 'src/app/services/game/rightWindow/field-sizer.service';

@Directive({
  selector: '[appSizeNotifier]'
})
export class SizeNotifierDirective {

  constructor(private ref: ElementRef, private service: FieldSizerService) { 
    this.service.getSignals().subscribe(signal => {
      this.getScreenSize();
      //console.log("MESSAGE GOT!!!!")
    })
  }

  @HostListener('window:resize', ['$event'])
    getScreenSize(event?) {
          let width = this.ref.nativeElement.offsetWidth;
          //console.log(width);
          this.service.pushSize(width);
    }

}
