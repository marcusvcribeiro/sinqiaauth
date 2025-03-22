import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardAsideDirective, CardComponent, CardFooterDirective } from './card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CardComponent,
    CardAsideDirective,
    CardFooterDirective
  ],
  exports: [
    CardComponent,
    CardAsideDirective,
    CardFooterDirective
  ]
})
export class CardModule { }
