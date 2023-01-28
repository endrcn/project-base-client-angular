import { Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from '../lib/alert';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = "";
  password = "";
  user: any = {};

  constructor(private auth: AuthService, private alert: Alert) { }

  ngOnInit(): void {
  }

  async login(email: any, pass: any) {

    try {


      let res = await lastValueFrom(this.auth.login(email, pass));
      let data = res['data'] || {};

      this.auth.saveToLocal("pb_user", data.user);
      this.auth.saveToLocal("pb_token", data.token);
      this.auth.saveToLocal("pb_language", "en");
      this.auth.userPublisher.next(data.user);
      this.auth.isLoginPublisher.next(true);
      this.auth.route(data.user.role, data.user.roles);
    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }
}
