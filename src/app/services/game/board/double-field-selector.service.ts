import { Injectable } from '@angular/core';
import { GameInfoService } from './game-info.service';
import { Location } from 'src/app/game-view/game-models/location';
import { AreaUnit } from 'src/app/game-view/game-models/areaUnit';
import { AreaCheck } from './areaCheck';
import LinkedList from './linkedList';
import { pathToFileURL } from 'url';
import { LinksVisibility } from 'src/app/game-view/areas/linksVisibility';
import { Subject, Observable } from 'rxjs';
import { PopupsLauncherService } from '../popups/popups-launcher.service';

@Injectable({
  providedIn: 'root'
})
export class DoubleFieldSelectorService {

  constructor(private datasource: GameInfoService, private popups: PopupsLauncherService) { }

  private rows: number = 11;
  private cols: number = 11;

  isSelectionLaunched = false;
  startingPoint: AreaCheck;
  target: AreaCheck;
  checkUnits: Array<Array<AreaCheck>>;
  ownedUnits: Array<AreaCheck>;

  linksSubject = new Subject<LinksVisibility>();
  path: Array<Location>;

  getLinksNotifications(): Observable<LinksVisibility>{
    return this.linksSubject.asObservable();
  }

  pushLinks(links: LinksVisibility){
    this.linksSubject.next(links);
  }

  reactToMouseUp(location: Location){
    if (this.isSelectionLaunched == true 
      && !this.areLocationsEqual(location, this.startingPoint.location)){

      this.doReactions(location);
    }
    this.isSelectionLaunched = false;
    this.clearLinks();
   
  }

  private areLocationsEqual(loc1: Location, loc2: Location){
    return loc1.row == loc2.row && loc1.col == loc2.col;
  }

  private doReactions(location: Location){
    if (this.isInOwnedGroup(location)){
      //launching popup
      this.popups.sendSignal(2);
      this.target = this.getByLocation(location);
    } else if (this.isAttackable(location)){
      this.target = this.getByLocation(location);
      this.popups.sendResetSignal(1);
      this.popups.sendSignal(3);
    }
  }

  reactToMouseEnter(location: Location){
    if (this.isStartingLocation(location)){
      this.clearLinks();
    } 
    else if (this.isInOwnedGroup(location)){
      this.path = this.findFriendlyShortestPath(location);
      let links = this.pathToLinksVisibility(this.path);
      this.pushLinks(links);
    }
    else if (this.isAttackable(location)){
      this.path = this.findAttackableShortestPath(location);
      let links = this.pathToLinksVisibility(this.path);
      this.pushLinks(links);
    } else {
      this.clearLinks();
    }
  }

  private clearLinks(){
    let links = this.generateEmptyLinksVisibility();
    this.linksSubject.next(links);
  }

  private pathToLinksVisibility(path: Array<Location>): LinksVisibility{
    let links = this.generateEmptyLinksVisibility();
    for (let i = 0; i < path.length-1; i++){
      let loc1 = path[i];
      let loc2 = path[i+1];
      this.changeLinksVisibility(loc1, loc2, links);
    }
    return links;
  }

  private changeLinksVisibility(field1: Location, field2: Location, links: LinksVisibility){
    if (this.areLocationsVertical(field1, field2)){
      let loc = this.pickVeritcalLocation(field1, field2);
      links.vertical[loc.row][loc.col] = true;
    } else {
      let loc = this.pickHorizontalLocation(field1, field2);
      links.horizontal[loc.row][loc.col] = true;
    }
  }

  private pickHorizontalLocation(field1: Location, field2: Location){
    if (field1.col > field2.col){
      return field2;
    } else {
      return field1;
    }
  }

  private pickVeritcalLocation(field1: Location, field2: Location){
    if (field1.row > field2.row){
      return field2;
    } else {
      return field1;
    }
  }

  private areLocationsVertical(field1: Location, field2: Location){
    return field1.row != field2.row;
  }

  generateEmptyLinksVisibility(){
    return {
      horizontal: this.createEmptyLinkTable(11, 10),
      vertical: this.createEmptyLinkTable(10, 11)
    }
  }

  private createEmptyLinkTable(rows: number, cols: number){
    let rowsArray = new Array<Array<boolean>>();
    for (let i = 0; i < rows; i++){
      let row = new Array<boolean>();
      for (let j = 0; j < cols; j++){
        row.push(false);
      }
      rowsArray.push(row);
    }
    return rowsArray;
  }

  private findFriendlyShortestPath(location: Location): Array<Location>{
    let target = this.getByLocation(location);
    let chain = new LinkedList<Location>();
    while (target != null){
      chain.pushFirst(target.location);
      target = target.parent;
    }
    return chain.toArray();
  }



  private findAttackableShortestPath(location: Location): Array<Location>{
    let mainTarget = this.getByLocation(location);
    let mainNeighbours = this.getNeighbours(mainTarget);
    mainNeighbours = mainNeighbours.filter(n => {
      return this.isInOwnedGroup(n.location);
    });
    let minPath: Array<Location> = this.findFriendlyShortestPath(mainNeighbours[0].location);
    for (let i = 1; i < mainNeighbours.length; i++){
      let path = this.findFriendlyShortestPath(mainNeighbours[i].location);
      if (path.length < minPath.length){
        minPath = path;
      }
    }
    minPath.push(mainTarget.location);
    return minPath;
  }

  private prepareShortestPathConnections(){

    this.clearAllMarkings();
    let queue = new LinkedList<AreaCheck>();
    queue.pushFirst(this.startingPoint);

    while (!queue.isEmpty()){

      let parent = queue.popFirst();
      let neighbours = this.getNeighbours(parent);

      for (let neighbour of neighbours){
        if (!neighbour.checked && this.isMyField(neighbour)){
          neighbour.parent = parent;
          neighbour.checked = true;
          queue.push(neighbour)
        }
      }
    }
  }

  private clearAllMarkings(){
    for (let unit of this.ownedUnits){
      unit.checked = false;
    }
    this.startingPoint.checked = true;
  }

  private isStartingLocation(location: Location): boolean{
    let startLoc = this.startingPoint.location;
    return location.row == startLoc.row && location.col == startLoc.col
  }

  private isInOwnedGroup(location: Location): boolean{
    let owner = this.getByLocation(location).area.OWNER
    if (owner == null || owner != this.datasource.players.getMyLogin()){
      return false;
    }
    for (let unit of this.ownedUnits){
      if (unit.location.row == location.row && unit.location.col == location.col){
        return true;
      }
    }
    return false;
  }

  private isAttackable(location: Location){
    let unit = this.getByLocation(location);
    if (this.isMyField(unit)){
      return false;
    }
    
    let neighbours = this.getNeighbours(unit);
    for (let neighbour of neighbours){
      if (this.isMyField(neighbour) && this.isInOwnedGroup(neighbour.location)){
        return true;
      }
    }
    return false;
  }

 

  prepareConnectedFields(startingLocation: Location){
    //here we initialize it
    this.checkUnits = this.generateAreaChecks();
    let queue = new Array<AreaCheck>();
    let accumulator = new Array<AreaCheck>(); //here we place OUR area units connected to selected one
    this.startingPoint = this.getByLocation(startingLocation);
    this.startingPoint.markAsChecked();
    if (this.isMyField(this.startingPoint)){
      this.isSelectionLaunched = true;
      queue.push(this.startingPoint); //as we push an element, chain reaction will happen
    }

    //algorithm
    while (queue.length > 0){
      let unit = queue.pop();
      accumulator.push(unit);
      //unit.markAsChecked();
      let neighbours = this.getNeighbours(unit);
      for (let neighbour of neighbours){
        if (neighbour.checked == false && this.isMyField(neighbour)){
          queue.push(neighbour);
          neighbour.markAsChecked();
        }
      } 
    }

    this.ownedUnits = accumulator;
    console.log(this.ownedUnits);
    this.prepareShortestPathConnections();
  }

  private isMyField(unit: AreaCheck){
    return unit.area.OWNER != null && unit.area.OWNER == this.datasource.players.getMyLogin();
  }

  private getNeighbours(unit: AreaCheck): Array<AreaCheck>{
    let arr = new Array<AreaCheck>();

    let locations = new Array<Location>();
    let northLocation: Location = { row: unit.location.row-1, col: unit.location.col};
    let southLocation: Location = { row: unit.location.row+1, col: unit.location.col};
    let westLocation: Location = { row: unit.location.row, col: unit.location.col-1};
    let eastLocation: Location = { row: unit.location.row, col: unit.location.col+1};
    locations.push(northLocation);
    locations.push(southLocation);
    locations.push(westLocation);
    locations.push(eastLocation);

    for (let location of locations){
      if (this.isFieldInsideBounds(location)){
        let unit = this.getByLocation(location);
        arr.push(unit);
      }
    }
    return arr;
  }

  private isFieldInsideBounds(location: Location){
    return location.col >= 0 && location.col < this.cols 
    && location.row >= 0 && location.row < this.rows;
  }



  private getByLocation(location: Location){
    return this.checkUnits[location.row][location.col];
  }

  

  //objects that are used to mark area units as already collected into an array, so we dont have to iterate 
  //over array of collected units
  private generateAreaChecks(): Array<Array<AreaCheck>> {
    let out: Array<Array<AreaCheck>> = new Array<Array<AreaCheck>>();
    for (let i = 0; i < this.rows; i++){
      out.push(new Array<AreaCheck>());
      for (let j = 0; j < this.cols; j++){
        let checkedUnit = new AreaCheck(this.datasource.areaUnits[i][j], { row: i, col: j})
        out[i].push(checkedUnit);
      }
      
    }
    return out;
  }
  

  


}
