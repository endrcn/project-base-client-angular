import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/lib/alert';
import { UsersService } from '../services/users.service';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: any = {};
  @Input() roles: any;
  @Input() parent!: UserListComponent;

  constructor(private usersService: UsersService, private alert: Alert, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  async add() {
    let resp;
    try {
      resp = await lastValueFrom(this.usersService.add(this.user));

      this.parent.get();

      this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_ADD"))

      this.user = {};

      const btnAddModalClose = document.getElementById("addModalClose")!

      btnAddModalClose.click();

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

}
