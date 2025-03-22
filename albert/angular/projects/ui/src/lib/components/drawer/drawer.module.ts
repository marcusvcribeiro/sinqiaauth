import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DrawerActionsDirective, DrawerComponent, DrawerFooterDirective, DrawerTitleDirective } from './drawer.component';
import { CardModule } from '../card/card.module';
import { ButtonModule } from '../button/button.module';



@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    CardModule,
    ButtonModule
  ],
  declarations: [
    DrawerComponent,
    DrawerActionsDirective,
    DrawerTitleDirective,
    DrawerFooterDirective
  ],
  exports: [
    DrawerComponent,
    DrawerActionsDirective,
    DrawerTitleDirective,
    DrawerFooterDirective
  ],
})
export class DrawerModule { }

