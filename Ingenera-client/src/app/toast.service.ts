import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrManager) {

  }

  presentToast(msg) {
    this.toastr.successToastr(msg, 'Ingenera', {
      position: 'bottom-right',
      toastTimeout: 5000,
      dismiss: 'dismissed',
      showCloseButton: true,
      maxShown: 1,
      animate: 'slideFromRight'
    });
  }

  showErorr(msg) {
    this.toastr.errorToastr(msg, 'Ingenera', {
      position: 'bottom-right',
      toastTimeout: 5000,
      dismiss: 'dismissed',
      showCloseButton: true,
      maxShown: 1,
      animate: 'slideFromRight'
    });
  }

}
