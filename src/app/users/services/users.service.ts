import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { Response } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private globals: Globals) { }

  get(data: any) {
    return this.http.post<Response>(this.globals.url + "api/users", data);
  }

  add(data: any) {
    return this.http.post<object>(this.globals.url + "api/users/add", data);
  }

  update(data: any) {
    return this.http.post<object>(this.globals.url + "api/users/update", data);
  }

  delete(data: any) {
    return this.http.post<object>(this.globals.url + "api/users/delete", data);
  }
}
