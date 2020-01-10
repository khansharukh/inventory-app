import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  productsUpdate = new Subject<any>();
  public productList = [];

  constructor(private http: HttpClient) { }

  public getProducts() {
    const url = 'http://localhost:3000/products';
    return this.http.get<any>(url).pipe(map(response => {
      return response.response.map(
        name => name,
        id => id
      );
    })).subscribe(output => {
      this.productsUpdate.next(output);
    });
  }
}
