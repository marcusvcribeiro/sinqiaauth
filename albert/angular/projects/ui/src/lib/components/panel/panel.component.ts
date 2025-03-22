import {
  Component,
  Directive,
  Input,
  ViewChild,
  OnInit,
  ViewContainerRef,
  Output,
  EventEmitter,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  ComponentRef,
  ComponentFactoryResolver,
  HostBinding,
  HostListener,
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OverlayRef } from '@angular/cdk/overlay';

/**
 * @description
 * Diretiva utilizada apenas para identificar os botões de ações no componente instanciado
 */
@Directive({
  selector: '[alb-panel-actions]',
})
export class PanelActionsDirective { }


@Component({
  selector: 'alb-panel',
  templateUrl: './panel.component.html',
  host: {
    'class': 'alb-panel',
  },
  animations: [
    trigger('openCloseAnimation', [
      state('open', style({
        maxHeight: '{{ size }}',
        opacity: '1'
      }), { params: { size: '270px' } }),
      state('closed', style({
        maxHeight: '{{ size }}',
        opacity: '0'
      }), { params: { size: '0px' } }),
      transition('open <=> closed', [
        animate('0.2s'),
      ])
    ]),
  ],
})
export class PanelComponent implements OnInit, AfterViewInit {

  @HostBinding('@openCloseAnimation') get getToggleDrawer(): string {
    return this.isOpen ? 'open' : 'closed';
  }

  /**
   * Referencia do componente instanciado pelo Panel
   */
  componentRef: ComponentRef<any>;

  /**
   *
   */
  anchorRef: ElementRef<any>;

  /**
   *
   */
  overlayRef: OverlayRef;

  /**
   * @description
   * Váriavel utilizada apenas para executar o estado da animação
   */
  isOpen = false;

  /**
   * @description
   * Componente de entrada e instanciado no Panel
   */
  @Input() component;

  @Input() componentProps?: { [key: string]: any };

  /**
   * Evento emitido quando o componente do Panel é instanciado e realizado todas modificações na DOM
   */
  @Output() created = new EventEmitter();

  /**
   * @description
   * Evento emitido quando um Panel é fechado
   */
  @Output() close = new EventEmitter();

  @ViewChild('body', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  constructor(
    private changeDetection: ChangeDetectorRef,
    public elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.createComponent();
    this.bindProps();
    this.isOpen = true;
  }

  /**
   * @description
   *
   *  Seta se o panel está aberto ou fechado
   */
  setOpen(val: boolean) {
    this.isOpen = val;
    this.changeDetection.detectChanges();
  }

  /**
   * @description
   *
   *  Alterna se o panel ta aberto ou fechado
   */
  toggleOpen() {
    this.isOpen = !this.isOpen;
    this.changeDetection.detectChanges();
  }

  ngAfterViewInit() {
    this.checkIfHasActionsAndChangeNodes();
  }

  /**
   * @description
   *
   *  Seta se o panel está aberto ou fechado
   */
  createComponent() {
    const factory = this.resolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(factory);
    this.syncWidth();
  }

  bindProps() {
    if (this.componentProps) {
      Object.keys(this.componentProps).forEach(key => {
        this.componentRef.instance[key] = this.componentProps[key];
      });
    }
  }

  checkIfHasActionsAndChangeNodes() {
    this.changeDetection.detectChanges();
    const actionAttribute: HTMLElement = this.elementRef.nativeElement.querySelector('[alb-panel-actions]');
    const actionContainer: HTMLElement = this.elementRef.nativeElement.querySelector('.alb-panel-actions');

    if (actionAttribute) {
      const actionElements: ChildNode[] = Array.from(actionAttribute.childNodes);
      actionElements.forEach(action => actionContainer.appendChild(action));
    } else {
      actionContainer.parentNode.removeChild(actionContainer);
    }

    this.created.emit();
  }

  onClose() {
    this.isOpen = false;
  }


  @HostListener('window:resize')
  public onWinResize() {
    this.syncWidth();
  }

  private syncWidth() {
    if (!this.overlayRef) {
      return;
    }
    const refRect = this.anchorRef.nativeElement.getBoundingClientRect();
    this.overlayRef.updateSize({ width: refRect.width });
  }
}
