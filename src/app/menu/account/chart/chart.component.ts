import { Component, OnInit } from '@angular/core';
import { HistoryService } from 'src/app/services/menu/history.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  constructor(public historyService: HistoryService) { }

  ngOnInit(): void {
  }

}
