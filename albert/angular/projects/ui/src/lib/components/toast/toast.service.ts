import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { first } from 'rxjs/operators';
import { Toast } from './toast';
import { ToastComponent } from './toast.component';
import { ToastRef } from './toastRef';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  lastToast: ToastRef;

  position: number;
  height: number;

  create(toast: Toast) {
    const positionStrategy = this.overlay.position().global().right().bottom(this.getPosition());
    const overlayRef = this.overlay.create({
      positionStrategy
    });


    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(toast, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    const toastComponent = overlayRef.attach(toastPortal);

    toastComponent.instance.toast = toast;

    toastComponent.instance.closed
      .pipe(first())
      .subscribe(() => {
        this.lastToast = undefined;
      });

    return toastRef;
  }

  getInjector(toast: Toast, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(Toast, toast);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }

  getPosition() {
    if (this.lastToast) {
      this.height = this.lastToast.getPosition().height;
      if (this.position === 0) {
        this.position = this.height;
      } else if (this.position >= this.height) {
        this.position += this.height;
      }
      return this.position + 'px';
    } else {
      this.position = 0;
      return this.position + 'px';
    }
  }
}
