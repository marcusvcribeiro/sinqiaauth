import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DisplayComponent } from './display.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    DisplayComponent
  ],
  exports: [
    DisplayComponent
  ]
})
export class DisplayModule { }
