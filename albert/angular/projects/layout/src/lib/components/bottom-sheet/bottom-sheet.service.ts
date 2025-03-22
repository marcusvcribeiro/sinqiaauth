import { Injectable, ComponentRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { BottomSheet, BottomSheetRef } from './bottom-sheet';
import { BottomSheetComponent } from './bottom-sheet.component';
import { first } from 'rxjs/operators';


/**
 * Service para a criação ou fechamento de um Bottom Sheet
 */
@Injectable({
  providedIn: 'root'
})
export class BottomSheetService {

  /**
   * Referência do overlay para fechar o componente
   */
  private overlayRef: OverlayRef;

  /**
   * Variável para verificar a existência do alb-container
   */
  private hasContainer = false;

  constructor(private overlay: Overlay) { }

  /**
   * @description
   * Cria um Bottom Sheet na aplicação
   */
  create(props: BottomSheet): Promise<BottomSheetRef> {
    return new Promise(resolve => {

      if (this.overlayRef) {
        this.overlayRef.dispose();
      }

      if (document.querySelector('alb-container')) {
        this.hasContainer = true;
      }

      this.overlayRef = this.overlay.create();
      const componentPortal = new ComponentPortal(BottomSheetComponent);
      const bottomSheetRef = this.bindProps(this.overlayRef.attach(componentPortal), props);
      bottomSheetRef.instance.close.pipe(first()).subscribe(() => {
        this.close();
      });
      bottomSheetRef.instance.created.pipe(first()).subscribe(() => {
        resolve({
          component: bottomSheetRef.instance.componentRef,
          bottomSheetComponent: bottomSheetRef
        });
      });
    });
  }

  /**
   * @description
   * Remove um Bottom Sheet da aplicação
   */
  close() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  /**
   * @description
   * Adiciona as propriedades de entrada no componente Bottom Sheet
   */
  private bindProps(componentRef: ComponentRef<BottomSheetComponent>, props: BottomSheet): ComponentRef<BottomSheetComponent> {
    const { component, module, title, componentProps } = props;

    componentRef.instance.component = component;
    componentRef.instance.title = title;
    componentRef.instance.componentProps = componentProps;
    componentRef.instance.hasContainer = this.hasContainer;

    return componentRef;
  }

}
