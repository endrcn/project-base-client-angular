import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient, private globals: Globals) { }

  get(data: any) {
    return this.http.post<any>(this.globals.url + "api/categories", data);
  }

  getBrokerageList() {
    return this.http.post<any>(this.globals.url + "api/categories/brokerages", {});
  }

  add(data: any) {
    return this.http.post<any>(this.globals.url + "api/categories/add", data);
  }

  update(data: any) {
    return this.http.post<any>(this.globals.url + "api/categories/update", data);
  }

  delete(data: any) {
    return this.http.post<any>(this.globals.url + "api/categories/delete", data);
  }
}
