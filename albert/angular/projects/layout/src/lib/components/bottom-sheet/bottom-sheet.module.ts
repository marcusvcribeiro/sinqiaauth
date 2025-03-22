import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { BottomSheetComponent } from './bottom-sheet.component';
import { BottomSheetTitleDirective } from './bottom-sheet-title.directive';
import { BottomSheetActionsDirective } from './bottom-sheet-actions.directive';
@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    BottomSheetComponent,
    BottomSheetActionsDirective,
    BottomSheetTitleDirective,
  ],
  exports: [
    BottomSheetComponent,
    BottomSheetActionsDirective,
    BottomSheetTitleDirective,
  ],
})
export class BottomSheetModule { }

