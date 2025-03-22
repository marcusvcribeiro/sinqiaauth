import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef } from '@angular/core';
import { Observable } from 'rxjs';
import { DrawerComponent } from './drawer.component';

export class Drawer {
  component: any;
  module?: any;
  title?: string;
  componentProps?: { [key: string]: any };
  size?: 'extra-large'| 'extra-small' | 'large' | 'medium' | 'small' ;
}

export class DrawerRef {
  component: ComponentRef<any>;
  drawerComponent: ComponentRef<DrawerComponent>;
  overlay: OverlayRef;
  drawers$: Observable<ComponentRef<DrawerComponent>[]>;
}
