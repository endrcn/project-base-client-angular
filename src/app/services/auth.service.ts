import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, lastValueFrom } from 'rxjs';
// import 'rxjs/add/operator/map'
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
import { Globals } from '../../app/globals';
import decode from 'jwt-decode';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Response } from '../models/response.model';


@Injectable()
export class AuthService {

  isLoginPublisher = new BehaviorSubject<boolean>(this.getLocalData('pb_token'))
  userPublisher = new BehaviorSubject<boolean>(this.getLocalData('pb_user'))

  user: any = {};

  constructor(private http: HttpClient, private globals: Globals, private router: Router) {
    this.getUser().subscribe(data => {
      this.user = data;
    });
  }

  public saveToLocal(name: string, data: any) {
    if (typeof data === 'object')
      data = JSON.stringify(data);
    localStorage.setItem(name, data)
  }

  login(email: any, password: any) {
    return this.http.post<any>(this.globals.url + "api/users/auth", { email, password });
  }


  async logout() {
    try {
      let email = "";
      let role = "";
      if (localStorage && localStorage['user']) {
        if ("object" === typeof (JSON.parse(localStorage['user']))) {
          var user = JSON.parse(localStorage['user']);
          email = user["email"];
          role = user["role"];
        }

      }
      // await lastValueFrom(this.http.post(this.globals.url + "api/users/logout", {}));

      localStorage.removeItem('pb_token');
      localStorage.removeItem('pb_user');
      this.isLoginPublisher.next(false);
      this.userPublisher.next(false);
      this.router.navigate(['login']);
    } catch (err) {
      localStorage.removeItem('pb_token');
      localStorage.removeItem('pb_user');
      this.isLoginPublisher.next(false);
      this.userPublisher.next(false);
      this.router.navigate(['login']);
    }


  }

  public getLocalData(name: string): boolean {
    if (name == 'pb_token') return !!localStorage.getItem('pb_token');

    let user = localStorage.getItem('pb_user')
    if (user && user != 'undefined') {
      return JSON.parse(user)
    }
    return false;
  }

  getUser(): Observable<any> {
    return this.userPublisher.asObservable()
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginPublisher.asObservable();
  }

  isAuthenticated(): boolean {
    let payload;
    let token = localStorage.getItem("pb_token");
    if (token) {
      payload = decode(token);
      // return payload.exp <= Date.now();
      return true;
    }

    return false;
  }

  getRolesPrivileges(roles = []) {
    let privileges: any[] = [];
    let privMatrix = roles.map((x: any) => x.privilege);
    for (let i = 0; i < privMatrix.length; i++) {
      privileges = privileges.concat(privMatrix[i].map((x: { Key: any; }) => x.Key));
    }

    return privileges;
  }

  checkUserRoles(expectedRoles: any) {
    let privileges = this.getRolesPrivileges(this.user.roles);
    if (this.checkRoles(expectedRoles, privileges)) {
      return true;
    } else {
      return false;
    }
  }

  checkRoles(expectedRoles: string | any[], privileges: string | any[]) {
    let i = 0;
    while (i < expectedRoles.length && privileges.indexOf(expectedRoles[i]) < 0) i++;

    return i < expectedRoles.length;
  }


  public route(role: string, roles = []) {
    console.log("ROUTE: ", role);
    if (role == "SUPER_USER") {
      this.router.navigate(["dashboard"]);
    } else {
      let privMatrix = roles.map((x: any) => x.privilege);
      let privileges: any[] = [];
      for (let i = 0; i < privMatrix.length; i++) privileges = privileges.concat(privMatrix[i]);
      let groups = privileges.map(x => x.Group);
      if (groups.indexOf("Dashboard") >= 0) {
        this.router.navigate(["dashboard"]);
      } else if (groups.indexOf("User") >= 0) {
        this.router.navigate(["users"]);
      } else if (groups.indexOf("Role") >= 0) {
        this.router.navigate(["roles"]);
      } else if (groups.indexOf("Instruction") >= 0) {
        this.router.navigate(["instructions"]);
      }

    }
  }

  getCurrentUser() {
    return this.http.get(this.globals.url + "api/users");
  }

}
