import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval } from 'rxjs';
import { TimerService } from '../timer/timer.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private readonly API_URL: string = "https://cloud.iexapis.com/v1/stock/market/batch?symbols=gm,foxa,dis,nflx,aapl,googl,msft,nvda&types=quote&token=pk_8e9aee0c27934de5b972796c2b0d5c74";
  private readonly REQUEST_INTERVAL: number = 10000;

  private response: any;
  private prevPrice: any;
  private secondsAfterUpdate: number = 0;

  constructor(private http: HttpClient, private timerService: TimerService) {
  }

  getStockData() {
    interval(this.REQUEST_INTERVAL)
    .subscribe(() => {
      if (this.response != null) {
        this.prevPrice = this.getStockPrice();
      }
      this.http.get(this.API_URL)
      .subscribe(response => {
        this.response = response;
        this.secondsAfterUpdate = 0;
      });
    });
    this.timerService.startTimer();
  }
  getTableData() {
    let tableData = [];
    const companyNames = this.getCompanyNames();
    const positionNames = this.getPositionNames();
    const prevPrice = this.getPrevPrice();
    const curPrice = this.getStockPrice();

    for (let i = 0; i < Object.keys(this.response).length; i++) {
      tableData.push([
        companyNames[i],
        positionNames[i],
        prevPrice[i],
        curPrice[i],
        parseFloat(curPrice[i]) - parseFloat(prevPrice[i])
      ]);
    }

    return tableData;
  }

  private getCompanyNames(): Array<string> {
    let companyNames = [];
    for (let i of this.getPositionNames()) {
      companyNames.push(this.response[i].quote.companyName);
    }
    return companyNames;
  }

  private getPositionNames(): Array<string> {
    return Object.keys(this.response);
  }

  private getStockPrice(): Array<string> {
    let companyNames = [];
    for (let i of this.getPositionNames()) {
      companyNames.push(this.response[i].quote.latestPrice);
    }
    return companyNames;
  }

  private getPrevPrice() {
    return this.prevPrice;
  }
}
