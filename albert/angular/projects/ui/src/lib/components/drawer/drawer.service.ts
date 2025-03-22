import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Drawer, DrawerRef } from './drawer';
import { DrawerComponent } from './drawer.component';


@Injectable({
  providedIn: 'root'
})
export class DrawerService {
  private drawers$: BehaviorSubject<ComponentRef<DrawerComponent>[]> = new BehaviorSubject([]);

  constructor(private overlay: Overlay) { }

  create(props: Drawer): Promise<DrawerRef> {
    return new Promise(resolve => {
      const overlayRef = this.createOverlay();
      const componentPortal = new ComponentPortal(DrawerComponent);
      const drawerComponent = this.bindProps(overlayRef.attach(componentPortal), props);

      const { length } = this.drawers$.getValue();

      if (length) {
        const drawers = this.drawers$.getValue();
        this.updatePostionWhenAddDrawer(drawers);
      }

      this.subscribeOnDrawerCreated(drawerComponent, overlayRef, resolve);
      this.subscribeOnDrawerClosed(drawerComponent, overlayRef);
      this.drawers$.next([...this.drawers$.getValue(), drawerComponent]);
    });
  }


  closeAll() {
    const drawers = this.drawers$.getValue();
    drawers.forEach(drawer => {
      drawer.instance.onClose();
    });
  }

  close() {
    const drawers = this.drawers$.getValue();
    drawers.forEach(drawer => {
      if (drawers.indexOf(drawer) === drawers.length - 1) {
        drawer.instance.onClose();
      }
    });
  }

  private createOverlay(): OverlayRef {
    return this.overlay.create({
      width: '100%',
      height: '100%',
      hasBackdrop: true,
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }

  private bindProps(componentRef: ComponentRef<DrawerComponent>, props: Drawer): ComponentRef<DrawerComponent> {
    const { component, module, title, size, componentProps } = props;

    componentRef.instance.component = component;
    componentRef.instance.title = title;
    componentRef.instance.size = size;
    componentRef.instance.componentProps = componentProps;

    return componentRef;
  }

  private subscribeOnDrawerCreated(drawerComponent: ComponentRef<DrawerComponent>, overlayRef: OverlayRef, resolve) {
    drawerComponent.instance.created.pipe(first()).subscribe(() => {
      resolve({
        component: drawerComponent.instance.componentRef,
        drawerComponent,
        overlay: overlayRef,
        drawers$: this.drawers$.asObservable(),
      });
    });
  }

  private subscribeOnDrawerClosed(drawerComponent: ComponentRef<DrawerComponent>, overlayRef: OverlayRef) {
    drawerComponent.instance.close.pipe(first()).subscribe(() => {
      overlayRef.dispose();
      this.drawers$.next(this.drawers$.getValue().filter(drawer => drawer !== drawerComponent));
      this.updatePositionWhenRemoveDrawer(this.drawers$.getValue());
    });
  }

  private updatePostionWhenAddDrawer(drawers: ComponentRef<DrawerComponent>[]) {
    const { length } = drawers;

    drawers.forEach((drawer, i) => {
      drawer.instance.lastPosition = 5 * (length - i);
    });
  }

  private updatePositionWhenRemoveDrawer(drawers: ComponentRef<DrawerComponent>[]) {
    drawers.forEach((drawer, i) => {
      drawer.instance.lastPosition = drawer.instance.lastPosition - 5;
    });
  }
}
