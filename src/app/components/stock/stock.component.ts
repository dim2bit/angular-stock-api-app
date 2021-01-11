import { Component, OnInit } from '@angular/core';
import { StockService } from '../../services/stock/stock.service';
import { TimerService } from '../../services/timer/timer.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [StockService]
})
export class StockComponent implements OnInit {

  constructor(private stockService: StockService, private timerService: TimerService) {
    stockService.getStockData();
  }

  ngOnInit(): void {
  }

  getTableData() {
    return this.stockService.getTableData();
  }

  getSecondsAfterUpdate(): number {
    return this.timerService.getSecondsAfterUpdate();
  }
}
