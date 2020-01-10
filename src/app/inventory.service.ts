import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  productsUpdate = new Subject<any>();
  public productList = [];
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
  public addProducts(data) {
    const url = 'http://localhost:3000/product/add';
    return this.http.post<any>(url, data, this.httpOptions).pipe(map(response => {
      return response.response;
    })).subscribe(output => {
      this.productsUpdate.next(output);
      console.log(output);
    });
  }
  public getSingleProducts(pid) {
    const url = 'http://localhost:3000/product/';
    return this.http.get<any>(url + pid).pipe(map(response => {
      return response.response.map(
        name => name,
        id => id,
        description => description,
        created_at => created_at
      );
    })).subscribe(output => {
      this.productsUpdate.next(output);
    });
  }
}
