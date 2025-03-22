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
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

const sizes = {
  EXTRA_SMALL: '30vw',
  SMALL: '40vw',
  MEDIUM: '60vw',
  LARGE: '80vw',
  EXTRA_LARGE: '90vw'
};

/**
 * @description
 * Diretiva utilizada apenas para identificar um título no componente instanciado
 */
@Directive({
  selector: '[alb-drawer-title]',
})
export class DrawerTitleDirective { }

/**
 * @description
 * Diretiva utilizada apenas para identificar os botões de ações no componente instanciado
 */
@Directive({
  selector: '[alb-drawer-actions]',
})
export class DrawerActionsDirective { }

/**
 * @description
 * Diretiva utilizada apenas para identificar o footer no componente instanciado
 */
@Directive({
  selector: '[alb-drawer-footer]',
})
export class DrawerFooterDirective { }


@Component({
  selector: 'alb-drawer',
  templateUrl: './drawer.component.html',
  host: {
    'class': 'alb-drawer',
  },
  animations: [
    trigger('openCloseAnimation', [
      state('open', style({
        transform: 'translateX(0)'
      }), { params: { size: sizes.MEDIUM } }),
      state('closed', style({
        transform: 'translateX({{ size }})'
      }), { params: { size: sizes.MEDIUM } }),
      transition('open <=> closed', [
        animate('0.2s'),
      ]),
      transition(':enter', [
        style({ transform: 'translateX({{ size }})' }),
        animate('0.2s', style({ transform: 'translateX(0)' }))
      ], { params: { size: sizes.MEDIUM } }),
    ]),
    trigger('fanAnimation', [
      state('execute', style({
        transform: 'translateX(-{{ lastPosition }}vw)'
      }), { params: { lastPosition: 0 } }),
      transition('execute <=> *', [
        animate('0.2s'),
      ]),
    ]),
  ]
})
export class DrawerComponent implements OnInit, AfterViewInit {
  /**
   * Referencia do componente instanciado pelo Drawer
   */
  componentRef: ComponentRef<any>;

  /**
   * @description
   * Váriavel utilizada apenas para executar o estado da animação
   */
  isOpen = false;

  /**
   * @description
   * Componente de entrada e instanciado no Drawer
   */
  @Input() component;

  /**
   * @description
   * Titulo do Drawer
   */
  @Input() title?: string;

  /**
   * @description
   * Tamanho do Drawer
   */
  @Input() size?: 'extra-large' | 'extra-small' | 'small' | 'medium' | 'large';

  @Input() componentProps?: { [key: string]: any };

  /**
   * @description
   * Ultima posição do Drawer instanciado, para realizar a animação de "leque (fanAnimation)"
   */
  @Input() lastPosition?: number;

  /**
   * Evento emitido quando o componente do Drawer é instanciado e realizado todas modificações na DOM
   */
  @Output() created = new EventEmitter();

  /**
   * @description
   * Evento emitido quando um Drawer é fechado
   */
  @Output() close = new EventEmitter();

  @ViewChild('body', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  cardFooter: HTMLElement;
  drawerFooter: HTMLElement;

  constructor(
    private changeDetection: ChangeDetectorRef,
    private elementRef: ElementRef,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.createComponent();
    this.bindProps();
    this.isOpen = true;
  }

  ngAfterViewInit() {
    this.checkIfHasActionsOrTitleAndChangeNodes();
  }

  createComponent() {
    const factory = this.resolver.resolveComponentFactory(this.component);

    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  bindProps() {
    if (this.componentProps) {
      Object.keys(this.componentProps).forEach(key => {
        this.componentRef.instance[key] = this.componentProps[key];
      });
    }
  }

  checkIfHasActionsOrTitleAndChangeNodes() {
    this.drawerFooter = this.elementRef.nativeElement.querySelector('[alb-drawer-footer]');
    this.changeDetection.detectChanges();
    this.cardFooter = this.elementRef.nativeElement.querySelector('alb-card-footer');
    const actionAttribute: HTMLElement = this.elementRef.nativeElement.querySelector('[alb-drawer-actions]');
    const actionContainer: HTMLElement = this.elementRef.nativeElement.querySelector('alb-card-aside');

    const titleAttribute: HTMLElement = this.elementRef.nativeElement.querySelector('[alb-drawer-title]');

    if (actionAttribute) {
      const actionElements: ChildNode[] = Array.from(actionAttribute.childNodes);
      actionElements.forEach(action => actionContainer.appendChild(action));
    }

    if (titleAttribute) {
      this.title = titleAttribute.innerText;
    }

    if (this.drawerFooter) {
      this.cardFooter.appendChild(this.drawerFooter);
    }

    this.created.emit();
  }

  getSize() {
    switch (this.size) {
      case 'extra-large':
        return sizes.EXTRA_LARGE;
      case 'extra-small':
        return sizes.EXTRA_SMALL;
      case 'small':
        return sizes.SMALL;
      case 'medium':
        return sizes.MEDIUM;
      case 'large':
        return sizes.LARGE;
      default:
        return sizes.MEDIUM;
    }
  }

  onClose() {
    this.isOpen = false;
  }

  onAnimationEvent(event) {
    if (event.toState === 'closed') {
      this.close.emit();
    }
  }
}
