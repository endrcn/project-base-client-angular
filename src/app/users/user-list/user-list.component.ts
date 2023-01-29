import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { lastValueFrom } from 'rxjs';
import { Globals } from 'src/app/globals';
import { Alert } from 'src/app/lib/alert';
import { RolesService } from 'src/app/roles/services/roles.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public users: any = [];
  public user: any = [];
  public selected = [];
  public basicSelectedOption: number = 10;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  filter: any = {};
  allUsers: any;
  search: any;
  roles: any;

  constructor(private userService: UsersService, private alert: Alert, private translate: TranslateService, private globals: Globals, private rolesService: RolesService) {
  }

  ngOnInit(): void {
    this.get();
  }

  selectUser(user: any) {
    console.log(user);
    this.user = user;
  }

  async get() {
    try {
      let res = await lastValueFrom(this.userService.get(this.filter));
      let users = res['data'] || [];

      await this.getRoles();

      for (let i = 0; i < users.length; i++) {
        let roles = this.roles.filter((x: { _id: any; }) => users[i].role_ids.includes(x._id)).map((x: { role_name: any; level: any; }) => `${x.role_name}(${x.level})`);
        users[i].roles = roles;
      }

      this.users = users;
      this.allUsers = users;

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  async delete(id: any) {
    try {
      let alertResult = await this.alert.dialog(this.translate.instant("COMMON.WARNING_TITLE"), this.translate.instant("USERS.DELETE_WARNING_MSG"), "warning");

      if (alertResult.isConfirmed) {
        await lastValueFrom(this.userService.delete({ id }));
        this.get();
      }

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  filterUpdate() {
    this.users = this.allUsers.filter((x: { first_name: String; last_name: String; email: String; }) => {
      let search = this.globals.toLowerCase(this.search);
      return this.globals.toLowerCase(x.first_name).includes(search) ||
        this.globals.toLowerCase(x.last_name).includes(search) ||
        this.globals.toLowerCase(x.email).includes(search);
    })
  }

  async getRoles() {
    try {
      let resp = await lastValueFrom(this.rolesService.get({ is_active: true }));
      this.roles = resp["data"];
    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

}
