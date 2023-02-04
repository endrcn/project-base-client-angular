import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { lastValueFrom } from 'rxjs';
import { Alert } from 'src/app/lib/alert';
import { CategoryListComponent } from '../category-list/category-list.component';
import { CategoriesService } from '../services/categories.service';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent {

  @Input() parent!: CategoryListComponent;
  @Input() category: any = {};

  constructor(private categoryService: CategoriesService, private alert: Alert, private translate: TranslateService) { }

  ngOnInit(): void {
  }

  async update() {
    try {

      await lastValueFrom(this.categoryService.update(this.category));

      this.parent.get();

      this.alert.success(this.translate.instant("COMMON.SUCCESS_TITLE"), this.translate.instant("COMMON.SUCCESS_UPDATE"))

      const btnAddModalClose = document.getElementById("updateCategoryModalClose")!

      btnAddModalClose.click();

    } catch (err: any) {
      this.alert.errorHandler(err, true);
    }
  }
}
