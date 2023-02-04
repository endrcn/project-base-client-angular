import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';

@Injectable({
  providedIn: 'root'
})
export class AuditlogsService {

  constructor(private http: HttpClient, private globals: Globals) { }

  get(data: any) {
    return this.http.post<any>(this.globals.url + "api/auditlogs", data);
  }
}
