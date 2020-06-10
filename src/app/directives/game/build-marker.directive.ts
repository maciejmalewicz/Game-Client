import { Directive, HostListener, Input } from '@angular/core';
import { BuildingChoiceService } from 'src/app/services/game/rightWindow/building-choice.service';


@Directive({
  selector: '[appBuildMarker]'
})
export class BuildMarkerDirective {

  constructor(private service: BuildingChoiceService) { }

  @Input()
  index: number;

  @HostListener("mouseenter", ["$event"]) onEnter(){
    this.service.pushSelection(this.index);
  }

}
