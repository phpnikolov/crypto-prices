import { Component, OnInit } from '@angular/core';
import { DataService } from "./services/data.service";
import { CurrencyPipe } from '@angular/common';

import * as _ from 'lodash';
import { Currency } from './interfaces/currency';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public cryptocurrencies: Currency[];
  public errorMsg: string = '';
  public sort = {
    column: 'market_cap',
    type: 'desc'
  }

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

      let currencies: Currency[] = [];
      for (let key in response.data) {
        let row = response.data[key];
        currencies.push({
          id: row.id,
          name: row.name,
          rank: row.rank,
          price: row.quotes['USD'].price,
          market_cap: row.quotes['USD'].market_cap,
          percent_change_24h: row.quotes['USD'].percent_change_24h,
        });
      }

      // object to array, sort by rank
      this.cryptocurrencies = currencies;
      this.doSort();

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

  public changeSort(column: string): void {
    let type = 'desc';
    if (this.sort.column == column && this.sort.type == 'desc') {
      type = 'asc';
    }

    this.sort.column = column;
    this.sort.type = type;

    this.doSort();
  }

  private doSort(): void {
    this.cryptocurrencies = _.orderBy(this.cryptocurrencies, this.sort.column, this.sort.type);
  }


  public formatPrice(price: number) {
    let digits = 2;
    if (price < 0.0001) {
      digits = 7;
    }
    else if (price < 0.001) {
      digits = 6;
    }
    else if (price < 0.01) {
      digits = 5;
    }
    else if (price < 0.1) {
      digits = 4;
    }
    else if (price < 1) {
      digits = 3;
    }

    return this.cp.transform(price, 'USD', true, '1.2-' + digits);

  }
}
