import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BoxIconModule } from '../box-icon/box-icon.module';
import { ChipsModule } from '../chips/chips.module';
import { PanelModule } from '../panel/panel.module';
import { SearchPanelChipDirective } from './search-panel-chip.directive';
import { SearchPanelClearChipsDirective, SearchPanelComponent, SearchPanelCreateChipDirective } from './search-panel.component';


@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
    ChipsModule,
    PanelModule,
    BoxIconModule
  ],
  declarations: [
    SearchPanelComponent,
    SearchPanelChipDirective,
    SearchPanelCreateChipDirective,
    SearchPanelClearChipsDirective
  ],
  exports: [
    SearchPanelComponent,
    SearchPanelChipDirective,
    SearchPanelCreateChipDirective,
    SearchPanelClearChipsDirective
  ],
})
export class SearchPanelModule { }

