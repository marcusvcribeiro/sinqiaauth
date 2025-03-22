
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonIconModule } from '../button-icon/button-icon.module';
import { AccordionComponent, AccordionHeaderDirective } from './accordion.component';

@NgModule({
  imports: [
    CommonModule,
    ButtonIconModule
  ],
  declarations: [
    AccordionComponent,
    AccordionHeaderDirective,
  ],
  exports: [
    AccordionComponent,
    AccordionHeaderDirective,
  ],
})
export class AccordionModule { }
