import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { lastValueFrom } from 'rxjs';
import { Globals } from 'src/app/globals';
import { Alert } from 'src/app/lib/alert';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.css']
})
export class RoleListComponent implements OnInit {

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
  role: any = {};
  filter: any = {};
  roles: any;
  privileges: any;
  privilegeGroups: any;
  allRoles: any;
  search: any;

  constructor(private roleService: RolesService, private alert: Alert, private translate: TranslateService, private globals: Globals) { }

  ngOnInit(): void {
    this.get();
    this.getPrivilegesAndGroups();
  }

  selectRole(role: any) {
    this.role = role;
  }

  async get() {
    try {
      let res = await lastValueFrom(this.roleService.get(this.filter));
      this.roles = res["data"] || [];
      this.allRoles = res["data"] || [];
    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  async delete(id: any) {
    try {
      let alertResult = await this.alert.dialog(this.translate.instant("COMMON.WARNING_TITLE"), this.translate.instant("COMMON.DELETE_WARNING_MSG"), "warning");

      if (alertResult.isConfirmed) {
        await lastValueFrom(this.roleService.delete({ id }));

        this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_DELETE"));

        this.get();
      }

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  async getPrivilegesAndGroups() {
    let resp = await lastValueFrom(this.roleService.getPrivilegeGroups())
    this.privilegeGroups = resp["data"];

    let resp2 = await lastValueFrom(this.roleService.getPrivileges())
    this.privileges = resp2["data"];

    for (let i = 0; i < this.privilegeGroups.length; i++) {
      this.privilegeGroups[i].privileges = this.privileges.filter((x: { Group: any; }) => x.Group == this.privilegeGroups[i].id);
    }

  }

  filterUpdate() {
    this.roles = this.allRoles.filter((x: { role_name: String; description: String; }) => {
      let search = this.globals.toLowerCase(this.search);
      return this.globals.toLowerCase(x.role_name).includes(search) || this.globals.toLowerCase(x.description).includes(search)
    })
  }

}
