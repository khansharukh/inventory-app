import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  productsUpdate = new Subject<any>();
  userUpdate = new Subject<any>();
  productsDelete = new Subject<any>();
  public productList = [];
  public user;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  public getProducts(uid) {
    const url = 'http://localhost:3000/products/' + uid;
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
      return response.response;
    })).subscribe(output => {
      this.productsUpdate.next(output);
    });
  }
  public removeProducts(pid) {
    const url = 'http://localhost:3000/product/delete/';
    return this.http.delete<any>(url + pid).pipe(map(response => {
      return response.response;
    })).subscribe(output => {
      console.log(output);
      this.productsDelete.next(true);
    });
  }
  public authUser(data) {
    const url = 'http://localhost:3000/user/login';
    return this.http.post<any>(url, data, this.httpOptions).pipe(map(response => {
      return response.response.map(
        name => name,
        email => email,
        id => id
      );
    })).subscribe(output => {
      console.log(output);
      this.user = output;
      localStorage.setItem('user_auth', JSON.stringify(this.user));
      this.userUpdate.next(output);
    });
  }
}
