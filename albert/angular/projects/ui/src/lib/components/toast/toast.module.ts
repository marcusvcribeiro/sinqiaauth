import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastComponent } from './toast.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    ToastComponent,
  ],
  exports: [
    ToastComponent,
  ]
})
export class ToastModule {}
