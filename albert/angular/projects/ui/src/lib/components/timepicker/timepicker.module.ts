import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClockModule } from '../clock/clock.module';
import { InputModule } from '../input/input.module';
import { TimepickerComponent } from './timepicker.component';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ClockModule,
  ],
  declarations: [
    TimepickerComponent
  ],
  exports: [
    TimepickerComponent
  ]
})
export class TimepickerModule { }
