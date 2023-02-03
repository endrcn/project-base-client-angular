import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/lib/alert';
import { RoleListComponent } from '../role-list/role-list.component';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-role-add',
  templateUrl: './role-add.component.html',
  styleUrls: ['./role-add.component.css']
})
export class RoleAddComponent implements OnInit {

  role: any = {};
  @Input() parent!: RoleListComponent;
  @Input() privileges: any = [];
  @Input() privilegeGroups: any = [];
  permissions: any = {};

  constructor(private rolesService: RolesService, private alert: Alert, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  async add() {
    try {

      this.role.permissions = [];

      for (let key of Object.keys(this.permissions)) {
        if (this.permissions[key])
          this.role.permissions.push(key);
      }

      await lastValueFrom(this.rolesService.add(this.role));

      this.parent.get();

      this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_ADD"))

      const btnAddModalClose = document.getElementById("addRoleModalClose")!

      btnAddModalClose.click();

      this.role = {};

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  permissionChange(event: any) {
    console.log("permission", this.permissions);
    console.log(event.currentTarget.checked);

  }

  selectAll(event: any) {
    if (event.currentTarget.checked) {
      for (let i = 0; i < this.privileges.length; i++) {
        let key = this.privileges[i].Key;
        this.permissions[key] = true;
      }
    } else {
      this.permissions = {};
    }
  }

}
