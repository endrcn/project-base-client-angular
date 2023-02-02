import { Component, Input, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/lib/alert';
import { UsersService } from '../services/users.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {


  @Input() user: any = {};
  @Input() roles: any = [];
  @Input() parent!: UserListComponent;
  updates: any = {};

  constructor(private usersService: UsersService, private alert: Alert) { }

  ngOnInit(): void {

  }

  async update() {
    let resp;
    try {

      this.user.id = this.user._id;

      resp = await lastValueFrom(this.usersService.update(this.user));

      this.parent.get();

      const btnModalClose = document.getElementById("updateModalClose")!

      btnModalClose.click();

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

}
