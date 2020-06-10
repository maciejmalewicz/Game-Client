import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import { ServerCoordinationService } from 'src/app/services/shared/server-coordination.service';
import { PlaceSelectionService } from 'src/app/services/game/rightWindow/place-selection.service';
import { BuildingSelectionService } from 'src/app/services/game/rightWindow/building-selection.service';
import { PopupsLauncherService } from 'src/app/services/game/popups/popups-launcher.service';

@Directive({
  selector: '[appArrowCross]'
})
export class ArrowCrossDirective {

  constructor(private ref: ElementRef, private renderer: Renderer2,
    private sc: ServerCoordinationService, private selectionService: BuildingSelectionService,
    private placeSelection: PlaceSelectionService, private popups: PopupsLauncherService) { }

    @Input()
    loc: number = 0;

@HostListener('mouseenter', ['$event']) onEnter( e: MouseEvent ) {
  if (this.loc == 6){
    this.selectPostponed();
  } else {
    this.selectionService.pushSelection(this.loc);
    
    //this.eraseBuildingWindow();
  }
  
}

eraseBuildingWindow(){
  if (this.selectionService.canBeUpgraded(this.loc)){
    this.placeSelection.pushSelection(0);
  }
}

selectPostponed(){
  let prevSelection = this.selectionService.currentSelection;
  this.sc.doAfter(() => {
    if (this.selectionService.currentSelection == prevSelection){
      this.selectionService.pushSelection(this.loc);
    }
  }, this, 300);
}


}


