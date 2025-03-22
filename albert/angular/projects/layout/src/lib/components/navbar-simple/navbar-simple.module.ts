import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarSimpleComponent } from './navbar-simple.component';
import { NavbarSimpleItemComponent } from './navbar-simple-item.component';
import { NavbarSimpleService } from './navbar-simple.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NavbarSimpleComponent,
    NavbarSimpleItemComponent
  ],
  exports: [
    NavbarSimpleComponent,
    NavbarSimpleItemComponent
  ],
  providers: [
    NavbarSimpleService
  ]
})
export class NavbarSimpleModule { }
