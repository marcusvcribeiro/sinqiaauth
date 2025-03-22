import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MenuTemplateDirective } from './menu-item-template.directive';
import { MenuItemComponent } from './menu-item.component';
import { MenuComponent } from './menu.component';

@NgModule({
  declarations: [
    MenuComponent,
    MenuItemComponent,
    MenuTemplateDirective
  ],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  exports: [
    MenuComponent,
    MenuItemComponent,
    MenuTemplateDirective
  ]
})
export class MenuModule { }
