import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClockComponent } from './clock.component';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
  ],
  declarations: [
    ClockComponent
  ],
  exports: [
    ClockComponent
  ]
})
export class ClockModule { }
