import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { Panel, PanelRef } from './panel';
import { PanelComponent } from './panel.component';


@Injectable({
  providedIn: 'root'
})
export class PanelService {
  private panels$: BehaviorSubject<ComponentRef<PanelComponent>[]> = new BehaviorSubject([]);
  private mapAnchor: Map<ElementRef<any>, PanelRef> = new Map();

  constructor(private overlay: Overlay) { }

  create(props: Panel): Promise<PanelRef> {
    return new Promise(resolve => {
      const overlayRef = this.createOverlay(props.anchorPoint);
      const componentPortal = new ComponentPortal(PanelComponent);
      const panelComponent = this.bindProps(overlayRef.attach(componentPortal), props, overlayRef);
      this.subscribeOnPanelCreated(panelComponent, overlayRef, resolve);
      this.subscribeOnPanelClosed(panelComponent, overlayRef);
      this.panels$.next([...this.panels$.getValue(), panelComponent]);
    });
  }

  async togglePanel(props: Panel): Promise<PanelRef> {
    let panelRef: PanelRef;
    if (!this.mapAnchor.has(props.anchorPoint)) {
      panelRef = await this.create(props);
      this.mapAnchor.set(props.anchorPoint, panelRef);
    } else {
      panelRef = this.mapAnchor.get(props.anchorPoint);
      panelRef.panelComponent.instance.toggleOpen();
    }
    return panelRef;
  }

  closeAll() {
    const panels = this.panels$.getValue();
    panels.forEach(panel => {
      panel.instance.onClose();
    });
  }

  close() {
    const panels = this.panels$.getValue();
    panels.forEach(panel => {
      if (panels.indexOf(panel) === panels.length - 1) {
        panel.instance.onClose();
      }
    });
  }

  private createOverlay(anchorRef: ElementRef<any> = null): OverlayRef {
    return this.overlay.create({
      hasBackdrop: false,
      maxHeight: '270px',
      positionStrategy: this.overlay.position().flexibleConnectedTo(anchorRef).withPositions([{
        // here, top-left of the overlay is connected to bottom-left of the origin;
        // of course, you can change this object or generate it dynamically;
        // moreover, you can specify multiple objects in this array for CDK to find the most suitable option
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top'
      }]),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });
  }

  private bindProps(componentRef: ComponentRef<PanelComponent>, props: Panel, overlayRef: OverlayRef): ComponentRef<PanelComponent> {
    const { component, module, componentProps } = props;
    componentRef.instance.component = component;
    componentRef.instance.componentProps = componentProps;
    componentRef.instance.overlayRef = overlayRef;
    componentRef.instance.anchorRef = props.anchorPoint;
    return componentRef;
  }

  private subscribeOnPanelCreated(panelComponent: ComponentRef<PanelComponent>, overlayRef: OverlayRef, resolve) {
    panelComponent.instance.created.pipe(first()).subscribe(() => {
      resolve({
        component: panelComponent.instance.componentRef,
        panelComponent,
        overlay: overlayRef,
        panels$: this.panels$.asObservable(),
        toggleOpen: () => {
          panelComponent.instance.toggleOpen();
        }
      });
    });
  }

  private subscribeOnPanelClosed(panelComponent: ComponentRef<PanelComponent>, overlayRef: OverlayRef) {
    panelComponent.instance.close.pipe(first()).subscribe(() => {
      overlayRef.dispose();
      this.panels$.next(this.panels$.getValue().filter(panel => panel !== panelComponent));
    });
  }

}
