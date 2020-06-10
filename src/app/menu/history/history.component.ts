import { Component, OnInit } from '@angular/core';
import { HistoryUnit } from 'src/app/models/menu-models/historyUnit';
import { HistoryService } from 'src/app/services/menu/history.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private historyService: HistoryService, public logService: LoginService) { }

  history: Array<HistoryUnit> = [];

  ngOnInit(): void {
    this.historyService.getHistory().subscribe(arr => {
      this.history = arr;
      //console.log(this.history);
    })
  }

}
