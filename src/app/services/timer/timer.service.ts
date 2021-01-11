import { Injectable } from '@angular/core';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  private readonly TIMER_INTERVAL: number = 100;

  private secondsAfterUpdate: number = 0;

  constructor() {
  }

  startTimer() {
    interval(this.TIMER_INTERVAL)
    .subscribe(() => {
      this.secondsAfterUpdate += this.TIMER_INTERVAL / 1000;
    });
  }

  getSecondsAfterUpdate() {
    return this.secondsAfterUpdate;
  }
}
