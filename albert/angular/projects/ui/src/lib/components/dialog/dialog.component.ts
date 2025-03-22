import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'alb-dialog',
  templateUrl: './dialog.component.html'
})

export class DialogComponent implements OnInit, AfterViewInit {

  /**
   * Evento emitido quando o componente do Dialog é instanciado e realizado todas modificações na DOM
   */
  @Output() created = new EventEmitter();

  /**
   * @description
   * Referencia do componente instanciado pela Dialog
   */
  componentRef: ComponentRef<any>;

  /**
   * @description
   * Output que emite um evento para que o service consiga fechar o overlay a partir do botão, sem que haja interação
   * circular entre esses dois arquivos.
   *
   */
  @Output() close = new EventEmitter();

  /**
   * @description
   * O Input dialog recebe um objeto do tipo Dialog para que o componente crie uma instância de
   * alb-dialog de acordo com os parâmetros inseridos pelo usuário.
   * Este input pode receber objetos do tipo Dialog e DialogCustom.
   */
  @Input() dialog;

  /**
   * @description
   * O objeto icon é utilizado para setar o ícone dependendo do tipo de dialog que o usuário quer.
   *
   */
  icon = {
    info: 'info',
    error: 'cancel',
    confirm: ''
  };

  /**
   * @description
   * É a referência do componente customizado
   *
   */
  @ViewChild('body', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    if (this.dialog?.type === 'custom') {
      this.createComponent();
      this.bindProps();
    }
  }

  ngAfterViewInit(): void {
    this.created.emit();
  }

  /**
   * @description
   * Método responsável por criar o componente customizado.
   *
   */
  private createComponent() {
    const factory = this.resolver.resolveComponentFactory(this.dialog.component);

    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  /**
   * @description
   * Método responsável por fazer os binds necessários na instância do componente customizado.
   *
   */
  private bindProps() {
    if (this.dialog.componentProps) {
      Object.keys(this.dialog.componentProps).forEach(key => {
        this.componentRef.instance[key] = this.dialog.componentProps[key];
      });
    }
    this.componentRef.instance.close = this.close;
  }

  /**
   * @description
   * Método responsável por emitir o evento de fechar.
   *
   */
  onClose() {
    this.close.emit();
  }

  /**
   * @description
   * Método que retorna a cor do ícone, dependendo do tipo da dialog.
   *
   */
  getIconColor() {
    return this.dialog && this.dialog.type === 'info' ? 'alb-dialog-info' : 'alb-dialog-error';
  }

  /**
   * @description
   * Método que faz a verificação se o callback passado pelo usuário é uma função válida. Apenas utilizado no dialog tipo confirm.
   *
   */
  verifyCallback() {
    if (this.dialog.callback && this.dialog.callback instanceof Function) {
      this.dialog.callback(this);
    }
    this.onClose();
  }
}
