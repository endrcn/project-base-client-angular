import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/lib/alert';
import { RoleListComponent } from '../role-list/role-list.component';
import { RolesService } from '../services/roles.service';

@Component({
  selector: 'app-role-update',
  templateUrl: './role-update.component.html',
  styleUrls: ['./role-update.component.css']
})
export class RoleUpdateComponent implements OnInit {

  @Input() role: any = {};
  @Input() parent!: RoleListComponent;
  @Input() privileges: any = [];
  @Input() privilegeGroups: any = [];
  roles: any;
  updates: any = {};
  permissions: any = {};

  constructor(private roleService: RolesService, private alert: Alert, private translate: TranslateService) { }

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["role"] && !changes["role"].isFirstChange() && changes["role"].previousValue != changes["role"].currentValue) {
      this.permissions = {};
      for (let i = 0; i < this.role.permissions.length; i++) {
        let key = this.role.permissions[i];
        this.permissions[key] = true;
      }
    }
    console.log("permissions", this.permissions);
  }

  async update() {
    let resp;
    try {

      this.role.permissions = [];

      for (let key of Object.keys(this.permissions)) {
        if (this.permissions[key])
          this.role.permissions.push(key);
      }

      resp = await lastValueFrom(this.roleService.update(this.role));

      this.parent.get();

      this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_UPDATE"))

      const btnAddModalClose = document.getElementById("updateRoleModalClose")!

      btnAddModalClose.click();

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  permissionChange(event: any) {
    let key = event.currentTarget.id.replace("updatecheckbox_", "");
    if (event.currentTarget.checked) {
      this.permissions[key] = true;
    } else {
      this.permissions[key] = null;
    }


    console.log(this.permissions);

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

    console.log(this.permissions);
  }

  isAllPermissionsSelected() {
    let permissionKeys = Object.keys(this.privileges || {});
    return permissionKeys.length == this.role.permissions?.length;
  }

}
