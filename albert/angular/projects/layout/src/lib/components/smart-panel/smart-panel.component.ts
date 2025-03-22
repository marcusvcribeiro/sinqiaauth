import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'alb-smart-panel',
  templateUrl: './smart-panel.component.html',
  host: {
    class: 'alb-smart-panel',
  },
})
export class SmartPanelComponent implements OnInit, OnChanges {
  /**
   * Referencia do componente instanciado pelo Panel
   */
  componentRef: ComponentRef<any>;

  /**
   * @description
   * Componente instanciado no Panel
   */
  @Input() component;

  /**
   * @description
   * Título do Panel
   */
  @Input() title: string;

  /**
   * @description
   * Propriedades carregadas no componente instanciado no Panel
   */
  @Input() componentProps?: { [key: string]: any };

  /**
   * @description
   * Evento para resposta do componente carregado pelo panel.
   */
  @Output() componentResponse: EventEmitter<any> = new EventEmitter();

  @ViewChild('body', { read: ViewContainerRef, static: true })
  viewContainerRef: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.createComponent();
    this.bindProps();
  }

  ngOnInit() {}

  createComponent() {
    const factory = this.resolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(factory);
    if (this.componentRef.instance.itemEmitter) {
      this.componentRef.instance.itemEmitter.subscribe(this.componentResponse);
    }
  }

  bindProps() {
    if (this.componentProps) {
      Object.keys(this.componentProps).forEach((key) => {
        this.componentRef.instance[key] = this.componentProps[key];
      });
    }
  }
}
