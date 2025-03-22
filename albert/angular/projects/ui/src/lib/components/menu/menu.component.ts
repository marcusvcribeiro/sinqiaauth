import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MenuItemComponent } from './menu-item.component';

/**
 *
 * @description
 *
 * Componente de Menu.
 * Dentro dele deve ser passado uma lista de alb-menu-item que é referente aos itens que irão aparecer.
 */
@Component({
  selector: 'alb-menu',
  templateUrl: './menu.component.html',
  host: {
    'class': 'alb-menu'
  },
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class MenuComponent implements AfterViewInit {
  /**
   *
   * @description
   *
   * Propriedade para desabilitar o menu inteiro.
   */
  @Input() disabled: boolean;

  /**
   *
   * @description
   *
   * Propriedade para definir o icone do componente.
   */
  @Input() icon = 'more_vert';

  /**
   *
   * @description
   *
   * Referência para o ng-template menuTemplate.
   */
  @ViewChild('menuTemplate') menuTemplate: TemplateRef<any>;

  /**
   *
   * @description
   *
   * Itens de menu que serão renderizados em formato de lista.
   */
  items: MenuItemComponent[] = [];

  /**
   *
   * @description
   *
   * Boolean que retorna se o menu está aberto ou não.
   */
  isMenuOpen: false | true;

  /**
   *
   * @description
   *
   * Portal responsável por renderizar a lista de itens do menu.
   */
  templatePortal: TemplatePortal<any>;

  /**
   *
   * @description
   *
   * Overlay responsável para que o menu seja renderizado em cima com o templatePortal.
   */
  overlayRef: OverlayRef;

  /**
   *
   * @description
   *
   * Referência do item selecionado.
   */
  itemSelected: MenuItemComponent;

  constructor(
    private overlay: Overlay,
    private viewContainer: ViewContainerRef
  ) {
  }

  // override
  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(this.menuTemplate, this.viewContainer);
  }

  /**
   *
   * @description
   *
   * Cria um overlay a partir de um elemento html.
   */
  createOverlay(element: HTMLElement) {
    this.overlayRef = this.overlay.create({
      panelClass: 'alb-menu-overlay',
      hasBackdrop: true,
      backdropClass: 'alb-menu-overlay-backdrop',
      positionStrategy: this.getPositionStrategy(element),
    });

    this.overlayRef.attach(this.templatePortal);
  }

  /**
   *
   * @description
   *
   * Retorna objeto com as possíveis posições de abertura do overlay.
   */
  getPositionStrategy(element: HTMLElement) {
    return this.overlay.position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        },
        {
          originX: 'end',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top'
        },
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom'
        }
      ]);
  }

  /**
   *
   * @description
   *
   * Ao clicar para abrir o menu, cria um overlay e abre ele na tela.
   */
  onOpenMenu(element: HTMLElement) {
    this.createOverlay(element);
    this.overlayRef.backdropClick().subscribe(() => this.isMenuOpen = false);

    if (this.items.length > 0) {
      this.isMenuOpen = true;
    }
  }

  /**
   *
   * @description
   *
   * Método executado ao selecionar um item na lista de menu-item.
   * Basicamente atualiza o item selecionado e chama o método onClick do item.
   */
  onItemSelected(item: MenuItemComponent) {
    this.itemSelected = item;
    this.isMenuOpen = false;

    setTimeout(() => {
      if (item.onClick) {
        item.onClick();
      }
    });

  }

  /**
   *
   * @description
   *
   * Quando termina animação de abertura para fechamento, fecha o overlay.
   */
  onAnimationDone(event: AnimationEvent) {
    const { fromState, toState } = event;

    if (fromState === 'open' && toState === 'close') {
      this.overlayRef.dispose();
    }
  }

  /**
   *
   * @description
   *
   * Adiciona menu-item na lista de menus
   */
  addMenuItem(menu: MenuItemComponent) {
    this.items.push(menu);
  }
}
