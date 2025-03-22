import { Component, OnInit } from '@angular/core';
import { ToastService } from '@albert/ui';

@Component({
  selector: 'doc-toast',
  templateUrl: './toast.component.html'
})
export class ToastDocComponent {

  constructor(private toastService: ToastService) { }

  showToast() {
    this.toastService.create({
      text: 'Hello, World!',
    });
  }

  showToastInfo() {
    this.toastService.create({
      type: 'info',
      text: 'Hello, World!',
    });
  }

  showToastError() {
    this.toastService.create({
      type: 'error',
      text: 'Erro encontrado!',
    });
  }

  showToastSuccess() {
    this.toastService.create({
      type: 'success',
      text: 'Transação realizada com sucesso!',
    });
  }

  showToastAlert() {
    this.toastService.create({
      type: 'alert',
      text: 'Cuidado!',
    });
  }

}
