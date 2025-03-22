import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SmartPanelComponentDirective } from './smart-panel-component.directive';
import { SmartPanelComponentpropsDirective } from './smart-panel-props.directive';
import { SmartPanelComponent } from './smart-panel.component';


@NgModule({

  imports: [
    CommonModule,
  ],
  declarations: [
    SmartPanelComponent,
    SmartPanelComponentDirective,
    SmartPanelComponentpropsDirective
  ],
  exports: [
    SmartPanelComponent,
    SmartPanelComponentDirective,
    SmartPanelComponentpropsDirective
  ],
})
export class SmartPanelModule { }
