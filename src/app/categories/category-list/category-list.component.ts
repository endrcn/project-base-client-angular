import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { lastValueFrom } from 'rxjs';
import { Globals } from 'src/app/globals';
import { Alert } from 'src/app/lib/alert';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {

  // public
  public rows: any;
  public selected = [];
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public ColumnMode = ColumnMode;
  public instruction: any = {};
  subscription: any;
  user: any;
  search: any;
  filter: any = {};
  category: any = {};
  allRows: any;

  constructor(private categoryService: CategoriesService, private auth: AuthService, private alert: Alert, private translate: TranslateService, private globals: Globals) { }

  ngOnInit(): void {
    this.subscription = this.auth.getUser().subscribe(data => {
      this.user = data;
    });
    this.get();
  }

  async get() {
    try {
      let res = await lastValueFrom(this.categoryService.get(this.filter));
      this.rows = res["data"] || [];
      this.allRows = res["data"] || [];
    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  selectCategory(category: any) {
    this.category = category;
  }

  async delete(id: any) {
    try {
      let alertResult = await this.alert.dialog(this.translate.instant("COMMON.WARNING_TITLE"), this.translate.instant("COMMON.DELETE_WARNING_MSG"), "warning");

      if (alertResult.isConfirmed) {
        await lastValueFrom(this.categoryService.delete({ id }));

        this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_DELETE"));

        this.get();
      }

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

  filterUpdate() {
    this.rows = this.allRows.filter((x: any) => {
      let search = this.globals.toLowerCase(this.search);
      return this.globals.toLowerCase(x.title).includes(search);
    })
  }

}
