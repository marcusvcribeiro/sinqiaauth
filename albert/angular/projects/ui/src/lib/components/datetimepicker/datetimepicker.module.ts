import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatetimeModule } from '../datetime/datetime.module';
import { InputModule } from '../input/input.module';
import { DatetimepickerComponent } from './datetimepicker.component';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    DatetimeModule
  ],
  declarations: [
    DatetimepickerComponent
  ],
  exports: [
    DatetimepickerComponent
  ]
})
export class DatetimepickerModule { }
