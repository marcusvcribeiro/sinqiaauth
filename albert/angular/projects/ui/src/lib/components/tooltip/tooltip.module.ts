import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

import { TooltipComponent } from './tooltip.component';
import { AlbertTooltipDirective } from './tooltip.directive';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule
  ],
  declarations: [
    TooltipComponent,
    AlbertTooltipDirective
  ],
  exports: [
    TooltipComponent,
    AlbertTooltipDirective
  ]
})
export class TooltipModule { }
