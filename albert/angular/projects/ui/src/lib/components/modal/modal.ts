import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';
import { ModalComponent } from './modal.component';

export class Modal {
  component: any;
  componentProps?: { [key: string]: any };
  title?: string;
  size?: 'large' | 'medium' | 'small' ;
}

export class ModalRef {
  component: ComponentRef<any>;
  modalComponent: ComponentRef<ModalComponent>;
  overlay: OverlayRef;
}
