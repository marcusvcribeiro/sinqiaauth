import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { Modal, ModalRef } from './modal';
import { ModalComponent } from './modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private overlay: Overlay) { }

  create(props: Modal): Promise<ModalRef> {
    return new Promise(resolve => {
      const overlayRef = this.createOverlay();
      const componentPortal = new ComponentPortal(ModalComponent);
      const modalComponent = this.bindProps(overlayRef.attach(componentPortal), props);

      modalComponent.instance.close
        .pipe(first())
        .subscribe(() => {
          overlayRef.dispose();
        });
    });
  }

  private bindProps(componentRef: ComponentRef<ModalComponent>, props: Modal): ComponentRef<ModalComponent> {
    const {
      component,
      title,
      size
    } = props;

    componentRef.instance.component = component;
    componentRef.instance.title = title;
    componentRef.instance.size = size;

    return componentRef;
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlay.position().global().centerVertically().centerHorizontally(),
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }
}
