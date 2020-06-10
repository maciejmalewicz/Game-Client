import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HistoryResponse } from 'src/app/models/menu-models/historyResponse';
import { HttpClient } from '@angular/common/http';
import { CodeHandlerService } from '../shared/code-handler.service';
import { HttpAddresserService } from '../shared/http-addresser.service';
import { HistoryUnit } from 'src/app/models/menu-models/historyUnit';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient, private codeService: CodeHandlerService,
              private addresser: HttpAddresserService) { }

  history = new Subject<Array<HistoryUnit>>();

  pushHistory(history: Array<HistoryUnit>){
    this.history.next(history);
  }

  getHistory(): Observable<Array<HistoryUnit>>{
    return this.history.asObservable();
  }

  getHistoryResponse(): Observable<HistoryResponse>{
    return this.http.get<HistoryResponse>(this.addresser.getAddress() + "api/history/" + this.codeService.getCode()
     );
  }
}
