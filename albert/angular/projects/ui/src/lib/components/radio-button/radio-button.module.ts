import { NgModule } from '@angular/core';
import { RadioButtonComponent, RadioGroupDirective } from './radio-button.component';

@NgModule({
  declarations: [
    RadioButtonComponent,
    RadioGroupDirective
  ],
  exports: [
    RadioButtonComponent,
    RadioGroupDirective
  ]
})
export class RadioButtonModule { }
