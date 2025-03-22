import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CheckBoxCompoent } from './checkbox.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CheckBoxCompoent
  ],
  exports: [
    CheckBoxCompoent
  ]
})
export class CheckBoxModule {}
