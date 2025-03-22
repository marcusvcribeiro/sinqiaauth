
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from '../input/input.module';
import { NumberComponent } from './number.component';


@NgModule({
  imports: [
    CommonModule,
    InputModule
  ],
  declarations: [
    NumberComponent
  ],
  exports: [
    NumberComponent
  ],
})
export class NumberModule { }
