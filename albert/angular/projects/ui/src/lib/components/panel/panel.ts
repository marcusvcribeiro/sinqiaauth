import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef, ElementRef } from '@angular/core';
import { Observable } from 'rxjs';
import { PanelComponent } from './panel.component';

export class Panel {
  component: any;
  anchorPoint: ElementRef<any>;
  module?: any;
  componentProps?: Record<string, any>;
}

export class PanelRef {
  component: ComponentRef<any>;
  panelComponent: ComponentRef<PanelComponent>;
  overlay: OverlayRef;
  anchorPoint?: ElementRef<any>;
  panels$: Observable<ComponentRef<PanelComponent>[]>;
  toggleOpen: () => {};
}
