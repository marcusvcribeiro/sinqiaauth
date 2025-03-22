
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderGroupComponent } from './alb-group-content.component';
import { HeaderComponent, HeaderGroupDirective } from './header.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HeaderComponent,
    HeaderGroupDirective,
    HeaderGroupComponent
  ],
  exports: [
    HeaderComponent,
    HeaderGroupDirective,
    HeaderGroupComponent
  ]
})
export class HeaderModule { }
