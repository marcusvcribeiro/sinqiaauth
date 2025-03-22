import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    CommonModule,
    PortalModule,
    OverlayModule,
  ],
  declarations: [
    CalendarComponent
  ],
  exports: [
    CalendarComponent
  ]
})
export class CalendarModule { }
