import { Component, OnInit } from '@angular/core';
import { DialogService } from '@albert/ui';

@Component({
  selector: 'doc-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogDocComponent {

  constructor(private dialogService: DialogService) { }

  showDialogInfo() {
    this.dialogService.create({
      type: 'info',
      title: 'Hello world',
      message: 'Olá mundo!!',
      btnPrimaryText: 'Okay',
    });
  }

  showDialogError() {
    this.dialogService.create({
      type: 'error',
      title: 'Erro',
      message: 'Você não pode realizar esta ação!',
      btnPrimaryText: 'Okay'
    });
  }

  showDialogConfirm() {
    this.dialogService.create({
      type: 'confirm',
      title: 'Confirm',
      message: 'Você quer realizar isso?',
      btnPrimaryText: 'Sim',
      btnSecondaryText: 'Não',
      callback: () => { console.log('Confirmado'); }
    });
  }

  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/dialog');
  }
}
