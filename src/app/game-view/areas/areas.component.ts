import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { GameInfoService } from 'src/app/services/game/board/game-info.service';
import { BoardIconService } from 'src/app/services/game/board/board-icon.service';
import { GameRefresherService } from 'src/app/services/game/game-refresher.service';
import { SelectedFieldService } from 'src/app/services/game/board/selected-field.service';
import { LinksVisibility } from './linksVisibility';
import { DoubleFieldSelectorService } from 'src/app/services/game/board/double-field-selector.service';


@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {

  myColor: string = "rgba(0, 255, 0, 1.0)";
  player1Color: string = "rgba(255, 255, 0, 0.3)";
  player2Color: string = "rgba(255, 70, 0, 0.3)";
  player3Color: string = "rgba(210, 70, 140, 0.3)";
  player4Color: string = "rgba(180, 0, 0, 0.3)";

  constructor(public infoService: GameInfoService, private translator: BoardIconService,
              private refresher: GameRefresherService, private selector: SelectedFieldService,
              private doubleSelectorService: DoubleFieldSelectorService){
                refresher.getSignals().subscribe(signal => {
                  if (signal == 100){
                    this.loadColors();
                  }
                });
                doubleSelectorService.getLinksNotifications().subscribe(links => {
                  this.linksVisibility = links;
                })


  }

  linksVisibility: LinksVisibility = this.doubleSelectorService.generateEmptyLinksVisibility();

  isLinkableVertically(row, col){
    return row < 10;
  }

  isLinkableHorizontally(row, col){
    return col < 10;
  }

  isHorizontalLinkVisible(row, col): boolean{
    return this.linksVisibility.horizontal[row][col];
  }

  isVerticalLinkVisible(row, col): boolean{
    return this.linksVisibility.vertical[row][col];
  }

  select(row: number, column: number){
    this.selector.select(row, column);
  }

  isSomethingThere(row: number, col:number){
    return this.infoService.areaUnits[row][col].MAIN_BUILDING != null;
  }

  getBackground(){
    return "url('assets/game-graphics/game-background.jpg')";
  }

  getColor(row: number, col: number): string{
    let me = this.infoService.ownerOf(row, col);
    switch(me){
      case 1:
        return this.player1Color;
      case 2:
        return this.player2Color;
      case 3:
        return this.player3Color; 
      case 4:
        return this.player4Color;
      default:
        return 'rgba(0, 0, 0, 0.0)';     
    }
  }

  loadColors(){
    let me = this.infoService.getMyPlayerIndex();
    switch(me){
      case 1:
        this.player1Color = this.myColor;
        break;
      case 2:
        this.player2Color = this.myColor;
        break;
      case 3:
        this.player3Color = this.myColor;
        break; 
      case 4:
        this.player4Color = this.myColor;
        break;     
    }
  }

  getSource(row: number, col: number){
    let label = this.getLabel(row, col);
    return this.translator.getBoardIconSource(label);
  }

  getLabel(row: number, col: number){
    let areaUnit = this.infoService.areaUnits[row][col];
    let mainBuilding = areaUnit.MAIN_BUILDING;
    if (mainBuilding == null){
      return ""
    }
    else {
      return mainBuilding.LABEL;
    }
  }
  
  transformLabel(label: string){
    switch (label){
      case "TOWER":
        return '<button type = "button">aa</button>';
      case "MAIN_TOWER":
        return "H";
      case "ROCKET":
        return "R";
      case "BIG_METAL":
        return "M";
      case "BIG_BUILDING_MATERIALS":
        return "B";
      case "BIG_ELECTRICITY":
        return "E";
      default:
        return "?";            

    }
  }

  

  ngOnInit(): void {
    
  }

}
