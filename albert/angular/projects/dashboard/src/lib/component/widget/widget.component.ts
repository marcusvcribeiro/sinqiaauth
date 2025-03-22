
import {
  ChangeDetectorRef,
  Component,
  ComponentRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  OnDestroy
} from '@angular/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { Widget } from '../../model/widget';
import { DynamicLoaderConfigService } from '../../service/dynamic-loader-config.service';
import { takeUntil } from 'rxjs/operators';


/**
 * @description
 * Componente de Widget.
 * Contem um elemento do Gridster, dentro do qual sera renderizado o Widget.
 * Cuidado ao utilizar essa classe como Inject em outra para não sobreescrever coisas indevidas.
 */
@Component({
  selector: 'alb-widget',
  templateUrl: './widget.component.html'
})
export class WidgetComponent implements OnInit, OnDestroy {

  /**
   * @description
   * Widget que sera criado.
   */
  @Input() widget: Widget;

  /**
   * @description
   * Evento que emite Widget para ser removido.
   */
  @Output() widgetRemoved = new EventEmitter<Widget>();

  /**
   * @description
   * Evento que emite Widget quando ele sofrer alguma alteração de 'config'.
   */
  @Output() widgetConfigChanged = new EventEmitter<Widget>();

  /**
   * @description
   * Referencia ao container no qual o Widget sera criado de forma dinâmica.
   */
  @ViewChild('anchor', { read: ViewContainerRef, static: false }) anchor: ViewContainerRef;

  /**
   * @description
   * Item do Gridster.
   */
  item: any;

  /**
   * @description
   * Titulo do Widget.
   */
  titleWidget: string;

  /**
   * @description
   * Subscribe para indicar quando a propriedade 'customData' do Widget esta carregada.
   * Utilizando ReplaySubject por conta de existir o risco de o primeiro subscribe ocorrer após a
   * emissão do primeiro valor.
   */
  private customDataLoaded$: ReplaySubject<any> = new ReplaySubject(1);

  /**
   * @description
   * Subscribe para indicar quando o botão de 'config' for clicado.
   */
  private configButtonClicked$: Subject<any> = new Subject();

  /**
   * @description
   * propriedade que indica se o botão de 'config' deve ou nõa ser exibido.
   */
  private _hasConfigButton = false;

  /**
   * @description
   * Referência ao componente criado dinâmicamente e que sera usado no Widget.
   */
  private _component: ComponentRef<any>;

  /**
   * @description
   * Referência ao unsubscribes da classe
   */
  private unsubscribe$ = new Subject();

  /**
   * @description
   * Get - retorna valor da propriedade '_hasConfigButton'
   * indicando se o Widget deve ou não exibir o botão de 'config'.
   */
  get hasConfigButton(): boolean {
    return this._hasConfigButton;
  }

  /**
   * @description
   * Get - retorna observable que emite valor da propriedade 'customData' do Widget, toda vez que ela é modificada.
   */
  get customDataLoaded(): Observable<any> {
    return this.customDataLoaded$.asObservable();
  }

  /**
   * @description
   * Get - retorna observable que emite um valor todas as vezes em que o usuário clica no botão 'config'.
   */
  get configButtonClicked(): Observable<any> {
    this._hasConfigButton = true;
    this.cdr.detectChanges();
    return this.configButtonClicked$.asObservable();
  }

  constructor(
    private dynamicLoaderLoaderConfigService: DynamicLoaderConfigService,
    private cdr: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
  ) {
  }

  ngOnInit(): void {
    this.createItem();
    // setTimeout utilizado para esperar o gridster ser criado no método do createItem()
    // caso ele seja chamado direto, corre o risco de tentar criar o componente antes do gridster, o ocasiona erros.
    setTimeout(() => this.createComponent(), 1000);

    this.emitWidgetCustomData();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * @description
   * Método que emite o Widget para indicar sua remoção.
   */
  onRemoveWidget() {
    this.widgetRemoved.emit(this.widget);
  }

  /**
   * @description
   * Método que emite valor em observable para quando o botão de 'config'
   * é clicado, passado como valor o 'customData' do Widget.
   */
  onConfigClick() {
    if (this.hasConfigButton) {
      this.configButtonClicked$.next(this.widget.customData);
    }
  }

  /**
   * @description
   * Método que modifica valor atual da propriedade 'customData' do Widget
   * e em sequencia chama métodos que realizam a parte de eventos.
   */
  setCustomData(customData: any) {
    this.widget.customData = customData;
    this.updateTitleWidget();
    this.emitWidgetCustomData();
    this.widgetConfigChanged.emit();
  }

  /**
   * @description
   * Método que atualiza o título do Widget para utilizar o atributo de título do componete criado (caso tenha).
   */
  updateTitleWidget() {
    // SetTimeout implementado por causa de um problema com o ciclo de vida.
    // Sem ele, o element não carrega o value do h1 a tempo por causa do primeiro setTimeout na criação do component.
    setTimeout(() => {
      const element: HTMLElement = this._component.location.nativeElement;
      const title = element.querySelector('h1');
      if (title) {
        this.titleWidget = title.innerText;
        title.style.display = 'none';
        title.style.visibility = 'hidden';
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * @description
   * Método que cria um item do Gridster.
   */
  private createItem() {
    this.item = {
      cols: this.widget.width,
      rows: this.widget.height,
      y: this.widget.column,
      x: this.widget.line,
      minItemRows: 1,
      minItemCols: 1,
      widget: this.widget
    };
  }

  /**
   * @description
   * Método que cria o componente do Widget de forma dinâmica com o uso do DynamicLoaderConfigService.
   */
  private createComponent() {
    if (this.anchor) {
      this.dynamicLoaderLoaderConfigService.components
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({ next: this.create.bind(this) });
    }
  }

  /**
   * @description
   * Método que busca, valida e cria componentes registrados
   */
  private create(components) {
    const component = components.find(v => v.key === this.widget.component);
    if (!component) {
      console.error('Component não registrado: ' + this.widget.component);
      return;
    }

    const factory = this.resolver.resolveComponentFactory(component.component);
    this.anchor.clear();
    if (factory) {
      this._component = this.anchor.createComponent(factory);
      this.updateTitleWidget();
    }
  }

  /**
   * @description
   * Método que emite novo valor no Observable do customData enviando valor atual da propriedade 'customData'
   * do Widget.
   */
  private emitWidgetCustomData() {
    this.customDataLoaded$.next(this.widget.customData);
  }

}
