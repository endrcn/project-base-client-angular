import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient, private globals: Globals) { }

  get(data: any) {
    return this.http.post<any>(this.globals.url + "api/roles", data);
  }

  add(data: any) {
    return this.http.post<any>(this.globals.url + "api/roles/add", data);
  }

  update(data: any) {
    return this.http.post<any>(this.globals.url + "api/roles/update", data);
  }

  delete(data: any) {
    return this.http.post<any>(this.globals.url + "api/roles/delete", data);
  }

  getPrivileges() {
    return this.http.post<any>(this.globals.url + "api/roles/privileges", {});
  }

  getPrivilegeGroups() {
    return this.http.post<any>(this.globals.url + "api/roles/privileges/groups", {});
  }

}
