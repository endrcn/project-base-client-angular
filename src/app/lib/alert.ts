import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';


declare var $: any;
@Injectable()
export class Alert {

  constructor(private toastr: ToastrService, private translate: TranslateService, public auth: AuthService) {
  }

  errorHandler(err: { status: number; error: { error: any; }; }, showAlert = false) {
    if (err?.status == 401) {
      this.toastr.error(this.translate.instant('COMMON.UNAUTH_ERROR_INFO'), this.translate.instant('COMMON.UNAUTH_ERROR_TITLE'));
      this.auth.logout();
    } else if (showAlert) {
      let error = err?.error?.error || err?.error || err;
      this.toastr.error(error.description, error.message);
    }
  }

  success(title: any, text: any) {
    this.toastr.success(title, text);
  }

  error(title: any, text: any) {
    this.toastr.error(title, text);
  }

  warning(title: any, text: any) {
    this.toastr.warning(title, text);
  }

  async dialog(title: any, text: any, icon: any, confirmButtonText = this.translate.instant('COMMON.YES'), cancelButtonText = this.translate.instant('COMMON.CANCEL')) {
    return await Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText
    });
  }


}
