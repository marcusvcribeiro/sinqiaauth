import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarModule } from '../calendar/calendar.module';
import { InputModule } from '../input/input.module';
import { DatepickerComponent } from './datepicker.component';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule,
    InputModule,
  ],
  declarations: [
    DatepickerComponent
  ],
  exports: [
    DatepickerComponent
  ]
})
export class DatepickerModule { }
