
import { NgModule } from '@angular/core';
import { ButtonToggleComponent, ButtonToggleGroupDirective } from './button-toggle.component';

@NgModule({
  declarations: [
    ButtonToggleGroupDirective,
    ButtonToggleComponent
  ],
  exports: [
    ButtonToggleGroupDirective,
    ButtonToggleComponent
  ]
})
export class ButtonToggleModule { }
