import { Component, OnInit, DoCheck } from '@angular/core';
import { ResourceSetService } from 'src/app/services/game/topScreen/resource-set.service';
import { ScoreCounterService } from 'src/app/services/game/topScreen/score-counter.service';
import { GameTimeService } from 'src/app/services/game/topScreen/game-time.service';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.css']
})
export class GameHeaderComponent implements DoCheck {

  constructor(public resources: ResourceSetService, private scores: ScoreCounterService,
              public time: GameTimeService) { }

  myScore: number;
  enemy1Score: number;
  enemy2Score: number;
  enemy3Score: number;

  enemy1: string = "";
  enemy2: string = "";
  enemy3: string = "";

  ngDoCheck(): void {
    this.updateScores();
  }

  updateScores(){
    let enemies = this.scores.getEnemies();
    if (enemies != null){
      this.enemy1 = enemies[0];
      this.enemy2 = enemies[1];
      this.enemy3 = enemies[2];
    }
    this.myScore = this.scores.getMyScore();
    let arr = this.scores.getEnemiesScores();
    this.enemy1Score = arr[0];
    this.enemy2Score = arr[1];
    this.enemy3Score = arr[2];
  }

}
