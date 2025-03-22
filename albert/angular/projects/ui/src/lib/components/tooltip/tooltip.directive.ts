import { Directive, Input, HostListener, OnInit, ComponentRef, ElementRef } from '@angular/core';
import { OverlayRef, Overlay, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TooltipComponent } from './tooltip.component';

@Directive({ selector: '[albertTooltip]' })
export class AlbertTooltipDirective implements OnInit {

  /**
   *
   * @description
   *
   * Texto do tooltip
   *
   */
  @Input('albertTooltip') text = '';

  private overlayRef: OverlayRef;

  constructor(private overlayPositionBuilder: OverlayPositionBuilder,
              private elementRef: ElementRef,
              private overlay: Overlay) {}

  ngOnInit(): void {
    const positionStrategy = this.getPosition();
    this.overlayRef = this.overlay.create({ positionStrategy });
  }

  /**
   *
   * @description
   *
   * Método para mostrar o tooltip no evento de mouseenter
   *
   */
  @HostListener('mouseenter')
  show() {
    // Cria tooltip portal
    const tooltipPortal = new ComponentPortal(TooltipComponent);

    // Liga o tooltip portal ao overlay
    const tooltipRef: ComponentRef<TooltipComponent> = this.overlayRef.attach(tooltipPortal);

    // Passa o texto para a instancia do componente TooltipComponent
    tooltipRef.instance.text = this.text;
  }

  /**
   *
   * @description
   *
   * Retira o tooltip da tela
   *
   */
  @HostListener('mouseout')
  hide() {
    this.overlayRef.detach();
  }

  /**
   *
   * @description
   *
   * Pega a posição do evento do mouseenter
   *
   */
  getPosition() {
    return this.overlayPositionBuilder
      .flexibleConnectedTo(this.elementRef)
      .withPositions([{
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom',
      }]);
  }
}
