import { OverlayRef } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ToastRef {

  constructor(readonly overlay: OverlayRef) {}

  close() {
    this.overlay.dispose();
  }

  getPosition() {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
