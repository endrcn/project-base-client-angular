import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/lib/alert';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent {

  @Input() parent!: CategoryListComponent;
  category: any = {};

  constructor(private categoryService: CategoriesService, private alert: Alert, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  async add() {
    try {

      await lastValueFrom(this.categoryService.add(this.category));

      this.parent.get();

      this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_ADD"))

      this.category = {};

      const btnAddModalClose = document.getElementById("addCategoryModalClose")!

      btnAddModalClose.click();

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }

}
