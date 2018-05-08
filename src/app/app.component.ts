import { Component, OnInit } from '@angular/core';
import { DataService } from "./services/data.service";
import { CurrencyPipe } from '@angular/common';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public cryptocurrencies: Object[];
  public errorMsg: string = '';

  constructor(
    private cp: CurrencyPipe,
    private data: DataService
  ) { }

  ngOnInit(): void {
    this.updateRates();

    setInterval(() => {
      this.updateRates();
    }, 60 * 1000);
  }

  private updateRates(): void {
    this.data.getTicker().then((response) => {
   
      // object to array, sort by rank
      this.cryptocurrencies = _.sortBy(_.values(response.data), 'rank');

      this.errorMsg = '';
    }, (errObj) => {
      if (!this.cryptocurrencies) {
        this.errorMsg = "Can't load cryptocurrencies. Please check again later.";
      }
      else {
        this.errorMsg = "Can't update prices. Please check again later.";
      }
    });
  }


  public formatPrice(price: number) {
    let digits = 2;
    if (price < 0.0001) {
      digits = 7;
    }
    if (price < 0.001) {
      digits = 6;
    }
    if (price < 0.01) {
      digits = 5;
    }
    if (price < 0.1) {
      digits = 4;
    }
    if (price < 1) {
      digits = 3;
    }

    return this.cp.transform(price, 'USD', true, '1.2-' + digits); 

  }
}
