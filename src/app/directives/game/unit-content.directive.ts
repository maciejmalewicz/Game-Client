import { Directive, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { GameRefresherService } from 'src/app/services/game/game-refresher.service';
import { GameInfoService } from 'src/app/services/game/board/game-info.service';

@Directive({
  selector: '[appUnitContent]'
})
export class UnitContentDirective implements OnInit{

  @Input() row: number;
  @Input() col: number;

  constructor(private refresher: GameRefresherService, private datasource: GameInfoService,
              private ref: ElementRef, private renderer: Renderer2) { 
    refresher.getRefreshSignals().subscribe(loc => {
      if (loc.col == this.col && loc.row == this.row){
        this.refresh()
      }
    })
  }

  refresh(){
    
    let content: string = "";
    let unit = this.datasource.areaUnits[this.row][this.col];
    let mainBuilding = unit.MAIN_BUILDING;
    if (mainBuilding != null){
      let label: string = unit.MAIN_BUILDING.LABEL;
    
      console.log(label);
      if (label == "MAIN_TOWER"){
        console.log("got it!! " + this.ref.nativeElement + " pushing T")
        content = "T";
        this.printMessage(content);
        
      }
    }

    
  }

  printMessage(message: string){
    this.ref.nativeElement.innerHTML = message;
  }

  ngOnInit(): void {
    //console.log(this.row + " " + this.col);
  }

}
