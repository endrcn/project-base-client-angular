import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class RoleGuardService implements CanActivate {



  constructor(public auth: AuthService, public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['expectedRoles'];
    let user = {
      role: "",
      roles: []
    };
    if (localStorage.getItem('pb_user')) {
      user = JSON.parse(localStorage.getItem('pb_user') || '{}');
    }

    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    if (user.role != "SUPER_USER") {
      let i = 0;
      var privMatrix = user.roles.map((x: any) => x.privilege);
      var privileges: any = [];
      for (let j = 0; j < privMatrix.length; j++) {
        privileges = privileges.concat(privMatrix[j].map((x: any) => x.Key));
      }

      while (i < privileges.length && privileges.indexOf(expectedRoles[i]) < 0) i++;
      if (i < expectedRoles.length) {
        return true;
      } else {
        this.router.navigate(['/']);
        return false;
      }
    } else {
      return true;
    }

  }

}
