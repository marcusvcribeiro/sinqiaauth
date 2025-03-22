import {
  Component, OnInit, Input, ViewContainerRef, ViewChild, ComponentRef, ComponentFactoryResolver,
  ElementRef, AfterViewInit, ChangeDetectorRef, Output, OnDestroy, EventEmitter
} from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'alb-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  animations: [
    trigger('openCloseAnimation', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateY(35vw)' })),
      transition('open <=> closed', [animate('0.2s')]),
      transition(':enter', [
        style({ transform: 'translateY(35vw)' }),
        animate('0.2s', style({ transform: 'translateY(0)' }))
      ]),
    ]),
  ]
})
export class BottomSheetComponent implements OnInit, AfterViewInit, OnDestroy {

  /**
   * Referência para inserir o componente instanciado no conteúdo do bottom sheet
   */
  @ViewChild('bottomSheetContent', { read: ViewContainerRef, static: true }) viewContainerRef: ViewContainerRef;

  /**
   * Referencia do componente instanciado pelo Bottom Sheet
   */
  componentRef: ComponentRef<any>;

  /**
   * Booleano para identificar se o bottom-sheet estão aberto/fechado
   */
  isOpen = false;

  /**
   * @description
   * Componente de entrada e instanciado no Bottom-Sheet
   */
  @Input() component: any;

  /**
   * @description
   * Titulo do Bottom-Sheet
   */
  @Input() title?: string;

  /**
   * @description
   * Parâmetro para identificação do alb-container
   */
  @Input() hasContainer: boolean;

  /**
   * @description
   * Propriedades de input do componente a ser instanciado
   */
  @Input() componentProps?: { [key: string]: any };

  /**
   * Evento emitido quando o componente do Drawer é instanciado e realizado todas modificações na DOM
   */
  @Output() created = new EventEmitter();

  /**
   * @description
   * Evento emitido quando o Bottom-Sheet é fechado
   */
  @Output() close = new EventEmitter();



  constructor(
    private resolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
  ) { }


  ngOnInit() {
    this.createComponent();
    this.bindProps();
    this.addBottomSheetContainer();
    this.isOpen = true;
  }

  ngAfterViewInit() {
    this.updateTitleAndAside();
    this.created.emit();
  }

  /**
   * @description
   * cria componente para instanciar no componente
   */
  createComponent() {
    const factory = this.resolver.resolveComponentFactory(this.component);
    this.viewContainerRef.clear();
    this.componentRef = this.viewContainerRef.createComponent(factory);
  }

  /**
   * @description
   * Adiciona propriedades de entrada no componente instanciado
   */
  bindProps() {
    if (this.componentProps) {
      Object.keys(this.componentProps).forEach(key => {
        this.componentRef.instance[key] = this.componentProps[key];
      });
    }
  }

  /**
   * @description
   * Ação do botão fechar do bottom sheet
   */
  onClose() {
    this.isOpen = false;
  }

  /**
   * @description
   * Método utilizado quando uma animação finaliza
   */
  onAnimationEvent(event) {
    if (event.toState === 'closed') {
      this.removeBottomSheetContainer();
      this.close.emit();
    }
  }

  ngOnDestroy() {
    this.componentRef.destroy();
  }

  /**
   * @description
   * Verifica a existência das diretivas para adicionar um título e área de ações
   */
  private updateTitleAndAside() {
    const actionAttribute: HTMLElement = this.elementRef.nativeElement.querySelector('[alb-bottom-sheet-actions]');
    const actionContainer: HTMLElement = this.elementRef.nativeElement.querySelector('.alb-bottom-sheet-actions');

    const titleAttribute: HTMLElement = this.elementRef.nativeElement.querySelector('[alb-bottom-sheet-title]');
    const titleContainer: HTMLElement = this.elementRef.nativeElement.querySelector('.alb-bottom-sheet-title');

    if (actionAttribute) {
      const actionElements: ChildNode[] = Array.from(actionAttribute.childNodes);
      actionElements.forEach(action => actionContainer.appendChild(action));
    }

    if (titleAttribute) {
      titleContainer.innerHTML = titleAttribute.innerHTML;
      titleAttribute.parentElement.removeChild(titleAttribute);
    }
    this.cdr.detectChanges();
  }

  /**
   * @description
   * Adiciona o componente no alb-container caso exista
   */
  private addBottomSheetContainer() {
    if (this.hasContainer) {
      const bottomSheet = document.querySelector('alb-bottom-sheet');
      document.querySelector('alb-container').appendChild(bottomSheet);
      setTimeout(() => {
        bottomSheet.dispatchEvent(new CustomEvent('bottomSheetAdded', { bubbles: true, detail: { hasBottomSheet: true } }));
      });
    }
  }

  /**
   * @description
   * Remove o componente do alb-contaienr caso exista
   */
  private removeBottomSheetContainer() {
    if (this.hasContainer) {
      const bottomSheet = document.querySelector('alb-bottom-sheet');
      bottomSheet.dispatchEvent(new CustomEvent('bottomSheetAdded', { bubbles: true, detail: { hasBottomSheet: false } }));
    }
  }

}
