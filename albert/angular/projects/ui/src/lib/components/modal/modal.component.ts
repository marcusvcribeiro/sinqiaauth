import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

enum Sizes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

/**
 * @description
 * Diretiva utilizada apenas para identificar o footer no componente instanciado
 */
@Directive({
  selector: '[alb-modal-footer]',
})
export class ModalFooterDirective { }

@Component({
  selector: 'alb-modal',
  templateUrl: './modal.component.html',
  host: {
    'class': 'alb-modal',
    '[class.small]': 'size === sizes.SMALL',
    '[class.medium]': 'size === sizes.MEDIUM',
    '[class.large]': 'size === sizes.LARGE'
  }
})
export class ModalComponent implements OnInit, AfterViewInit {

  /**
   * @description
   * Referência do componente instanciado
   */
  componentRef: ComponentRef<any>;

  /**
   * @description
   * Componente que entra e é instanciado pela Modal
   */
  @Input() component;

  /**
   * @description
   * Evento emitido quando fecha a Modal
   */
  @Output() close = new EventEmitter();

  /**
   * @description
   * Aceita uma `string` que define o título do modal
   */
  @Input() title?: string;

  /**
   * @description
   * Aceita uma `string` que define o tamanho do modal
   */
  @Input() size?: string = Sizes.LARGE;

  /**
   * @description
   * Aceita um `object` que define as propriedades do input do componente a ser instanciado (caso existir)
   */
  @Input() componentProps?: { [key: string]: any };

  @ViewChild('content', {
    read: ViewContainerRef,
    static: true
  }) viewContainerRef: ViewContainerRef;

  sizes = Sizes;
  footerContent: HTMLElement;
  footer: HTMLElement;

  constructor(
    private resolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private changeDetection: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.createComponent();
  }

  ngAfterViewInit() {
    this.checkFooter();
  }

  createComponent() {
    const factory = this.resolver.resolveComponentFactory(this.component);

    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  onClose() {
    this.close.emit();
  }

  checkFooter() {
    this.footerContent = this.elementRef.nativeElement.querySelector('[alb-modal-footer]');
    this.changeDetection.detectChanges();
    this.footer = this.elementRef.nativeElement.querySelector('alb-card-footer');

    if (this.footerContent) {
      this.footer.appendChild(this.footerContent);
    }
  }

}
