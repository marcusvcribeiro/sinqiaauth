import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { SidenavModule } from '../sidenav/sidenav.module';
import { NavbarSimpleModule } from '../navbar-simple/navbar-simple.module';
import { NavbarFullModule } from '../navbar-full/navbar-full.module';
import { NavigationService } from './navigation.service';

@NgModule({
  imports: [
    CommonModule,
    SidenavModule,
    NavbarSimpleModule,
    NavbarFullModule,
  ],
  declarations: [NavigationComponent],
  exports: [NavigationComponent],
  providers: [NavigationService]
})
export class NavigationModule { }
