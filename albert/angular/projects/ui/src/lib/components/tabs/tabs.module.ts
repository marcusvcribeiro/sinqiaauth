import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabBodyWrapperDirective } from './tab-body.directive';
import { TabGroupComponent } from './tab-group.component';
import { TabHeaderWrapperDirective } from './tab-header.directive';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [
    CommonModule,
    PortalModule
  ],
  declarations: [
    TabComponent,
    TabGroupComponent,
    TabBodyWrapperDirective,
    TabHeaderWrapperDirective,
  ],
  exports: [
    TabComponent,
    TabGroupComponent,
    TabBodyWrapperDirective,
    TabHeaderWrapperDirective,
  ]
})
export class TabsModule { }
