import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Dialog, DialogCustom, DialogRef } from './dialog';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private overlay: Overlay) { }

  /**
   * @description
   * Método para chamar a dialog aonde o usuário desejar. Ele é responsável por criar o overlay e
   * referenciar o DialogComponent pelo portal, recebendo o objeto que usuário passou, a fim de montar
   * a dialog de acordo com as especificações.
   *
   */
  create(dialog: Dialog | DialogCustom): Promise<DialogRef> {
    return new Promise(resolve => {

      const overlayRef = this.overlay.create({
        hasBackdrop: true,
        scrollStrategy: this.overlay.scrollStrategies.block(),
        positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally()
      });

      const componentPortal = new ComponentPortal(DialogComponent);

      const dialogComponent = overlayRef.attach(componentPortal);

      dialogComponent.instance.dialog = dialog;

      dialogComponent.instance.close
        .pipe(first())
        .subscribe(() => {
          overlayRef.dispose();
        });

      dialogComponent.instance.created.pipe(first()).subscribe(() => {
        resolve({
          component: dialogComponent.instance.componentRef,
          dialogComponent,
        });
      });

    });
  }

}
