import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PanelActionsDirective, PanelComponent } from './panel.component';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    PanelComponent,
    PanelActionsDirective
  ],
  exports: [
    PanelComponent,
    PanelActionsDirective
  ],
  entryComponents: [
    PanelComponent
  ]
})
export class PanelModule { }

