import { Directive, HostListener, Input } from '@angular/core';
import { DoubleFieldSelectorService } from 'src/app/services/game/board/double-field-selector.service';
import { Location } from 'src/app/game-view/game-models/location';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';

@Directive({
  selector: '[appPairSelector]'
})
export class PairSelectorDirective {

  constructor(private service: DoubleFieldSelectorService) { }

  @Input()
  row: number;

  @Input()
  col: number;

  private getLocation(){
    let location: Location = {
      row: this.row,
      col: this.col
    }
    return location;
  }

  @HostListener("click", ["$event"]) onShortClick(){
    this.service.reactToMouseUp(this.getLocation());
  }

  @HostListener("mousedown", ["$event"]) onClick(){
    this.service.prepareConnectedFields(this.getLocation());
  }

  @HostListener("mouseenter", ["$event"]) onEnter(){
    if (this.service.isSelectionLaunched){
      this.service.reactToMouseEnter(this.getLocation());
    }
    
  }

  @HostListener("mouseup", ["$event"]) onRelease(){
    this.service.reactToMouseUp(this.getLocation());
  }

}
