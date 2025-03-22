
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarFullComponent, NavbarFullAsideComponent, NavbarFullItemComponent } from './navbar-full.component';
import { NavbarFullService } from './navbar-full.service';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  imports: [
    CommonModule,
    NgSelectModule
  ],
  declarations: [
    NavbarFullComponent,
    NavbarFullAsideComponent,
    NavbarFullItemComponent
  ],
  providers: [
    NavbarFullService,
  ],
  exports: [
    NavbarFullComponent,
  ]
})
export class NavbarFullModule { }
