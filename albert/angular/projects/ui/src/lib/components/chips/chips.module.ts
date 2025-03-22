import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChipsComponent } from './chips.component';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
  ],
  declarations: [
    ChipsComponent,
  ],
  exports: [
    ChipsComponent
  ]
})
export class ChipsModule { }
