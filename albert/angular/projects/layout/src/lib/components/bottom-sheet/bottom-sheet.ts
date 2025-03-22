import { ComponentRef } from '@angular/core';
import { BottomSheetComponent } from './bottom-sheet.component';

export class BottomSheet {
  component: any;
  module?: any;
  title?: string;
  componentProps?: { [key: string]: any };
}
export class BottomSheetRef {
  component: ComponentRef<any>;
  bottomSheetComponent: ComponentRef<BottomSheetComponent>;
}
