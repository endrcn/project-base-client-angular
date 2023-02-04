import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: any = {};
  subscription: any;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.auth.getUser().subscribe(data => {
      this.user = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {

    this.auth.logout();

  }

  getUserRoles() {
    if (this.user.roles) {
      return this.user.roles.map((x: any) => `${x.role_name}`);
    } else {
      return "";
    }
  }

  getCapitalLetters(text: string) {
    let words = text.split(" ");
    let letters = words.map((x: any) => x[0].toUpperCase())
    return letters.join("");
  }

}
