import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoxComponent } from './box.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BoxComponent
  ],
  exports: [
    BoxComponent
  ]
})
export class BoxModule { }
