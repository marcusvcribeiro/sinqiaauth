import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardModule } from '../card/card.module';
import { ButtonModule } from '../button/button.module';
import { ModalComponent, ModalFooterDirective } from './modal.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    CardModule,
    ButtonModule
  ],
  declarations: [
    ModalComponent,
    ModalFooterDirective
  ],
  exports: [
    ModalComponent,
    ModalFooterDirective
  ],
})
export class ModalModule { }

