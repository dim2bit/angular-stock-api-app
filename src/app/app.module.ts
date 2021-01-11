import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { StockService } from './services/stock/stock.service';

import { AppComponent } from './app.component';
import { StockComponent } from './components/stock/stock.component';
import { TimerService } from './services/timer/timer.service';

@NgModule({
  declarations: [
    AppComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    StockService,
    TimerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
