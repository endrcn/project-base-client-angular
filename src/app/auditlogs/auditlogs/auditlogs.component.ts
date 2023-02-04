import { Component } from '@angular/core';
import * as moment from 'moment';
import { lastValueFrom } from 'rxjs';
import { Globals } from 'src/app/globals';
import { Alert } from 'src/app/lib/alert';
import { UsersService } from 'src/app/users/services/users.service';
import { AuditlogsService } from '../services/auditlogs.service';

@Component({
  selector: 'app-auditlogs',
  templateUrl: './auditlogs.component.html',
  styleUrls: ['./auditlogs.component.css']
})
export class AuditlogsComponent {
  auditLogs: any;
  filter: any = {
    begin_date: moment().startOf('day').subtract(1, 'day'),
    end_date: moment().endOf('day')
  };
  users: any = [];

  constructor(private auditLogsService: AuditlogsService, private alert: Alert, private globals: Globals, private userService: UsersService) { }

  ngOnInit(): void {
    this.get();
    this.getUsers();
  }

  ngAfterViewInit(): void {
    /* $('input[name="daterange"]').daterangepicker({
      opens: 'left',
      startDate: moment().startOf('day').subtract(1, 'day'),
      endDate: moment().endOf('day'),
      locale: this.globals.getDateRangePickerLocale()
    }, (start, end, label) => {
      this.changeFilter({ begin_date: start.format('YYYY-MM-DD'), end_date: end.format('YYYY-MM-DD') });
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    }); */
  }

  async get() {
    try {
      let res = await lastValueFrom(this.auditLogsService.get(this.filter));
      this.auditLogs = res["data"] || [];
    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  async getUsers() {
    try {
      let res = await lastValueFrom(this.userService.get(this.filter));
      let users = res["data"] || [];

      this.users = users;

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  changeFilter(filter: any = {}, clear = false) {
    if (clear) this.clearFilter();

    for (let key in filter) {
      this.filter[key] = filter[key];
    }
    console.log(this.filter);
  }

  clearFilter() {
    this.filter = {};
  }

  getPointClass(procType: any) {
    switch (procType) {
      case "Add":
        return "bg-primary";
      case "Update":
        return "bg-success";
      case "Activate":
        return "bg-primary";
      case "Delete":
        return "bg-danger";
      default:
        return "bg-default";
    }
  }
}
