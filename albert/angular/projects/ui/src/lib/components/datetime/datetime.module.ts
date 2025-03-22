import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from '../input/input.module';
import { DatetimeComponent } from './datetime.component';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    PortalModule,
    OverlayModule
  ],
  declarations: [
    DatetimeComponent
  ],
  exports: [
    DatetimeComponent
  ]
})
export class DatetimeModule { }
