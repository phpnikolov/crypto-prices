import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Services
import { DataService } from "./services/data.service";

// Components
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CurrencyPipe,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
