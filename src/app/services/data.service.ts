import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";

@Injectable()
export class DataService {


  public constructor(private httpClient: HttpClient) {
  }

  public getTicker(currency:string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpClient.get('https://api.coinmarketcap.com/v2/ticker/?convert=' + currency, {
        responseType: 'json'
      }).subscribe(resolve, reject);
    });
  }


}