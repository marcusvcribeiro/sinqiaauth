import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
  TemplateRef,
  Input,
  ElementRef,
  OnChanges
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AnimationEvent, trigger, transition, style, animate, state } from '@angular/animations';

enum TYPE_TIME {
  HOUR = 1,
  MINUTE = 2,
  SECOND = 3
}

@Component({
  selector: 'alb-clock',
  templateUrl: './clock.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class ClockComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('clockTemplate') clockTemplate: TemplateRef<any>;

  /**
   * @description
   *
   * Hora inserida.
   */
  @Input() hour: number;

  /**
   * @description
   *
   * Minuto inserido.
   */
  @Input() minute: number;

  /**
   * @description
   *
   * Segundo inserido.
   */
  @Input() second: number;

  /**
   * @description
   *
   * Hora exibida no componente.
   */
  @Input() hourDisplay: string;

  /**
   * @description
   *
   * Minuto exibido no componente.
   */
  @Input() minuteDisplay: string;

  /**
   * @description
   *
   * Segundo exibido no componente.
   */
  @Input() secondDisplay: string;

  /**
   * @description
   *
   * Data inserida.
   */
  @Input() date: Date;

  /**
   * @description
   *
   *  Disabled do input.
   */
  _disabled: boolean;
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * @description
   *
   * Tipo de layout.
   */
  _onlyIcon;
  @Input()
  get onlyIcon(): boolean {
    return coerceBooleanProperty(this._onlyIcon);
  }
  set onlyIcon(value: boolean) {
    this._onlyIcon = value;
  }

  /**
   * @description
   *
   * Elemento a qual pode ser passado para o relógio ser vinculado.
   */
  @Input() append?: ElementRef| HTMLElement;

  /**
   * @description
   *
   * Evento emitido quando a data é selecionada.
   */
  @Output() change: EventEmitter<Date> = new EventEmitter();

  /**
   * @description
   *
   * Array de números que exibirão as horas no relógio.
   */
  clockHours: number[];

  /**
   * @description
   *
   * Array de números que exibirão os minutos e os segundos no relógio.
   */
  clockMinutesSeconds: number[];

  /**
   * @description
   *
   * Enum com tipos de tempo.
   */
  TypeTime = TYPE_TIME;

  /**
   * @description
   *
   * Tipo de tempo ativo (hora, minuto ou segundo).
   */
  timeTypeActive = TYPE_TIME.HOUR;

  /**
   * @description
   *
   * Tempo atual de referência.
   */
  now = new Date();

  /**
   * @description
   *
   * Template do portal.
   */
  templatePortal: TemplatePortal<any>;

  /**
   * @description
   *
   * Overlay que cobrirá o relógio quando ele for aberto.
   */
  overlayRef: OverlayRef;

  /**
   * @description
   *
   * Flag para checar se o relógio está aberto.
   */
  isClockOpen: boolean;

  /**
   * @description
   *
   * Data que será retornada com o horário atualizado.
   */
  outputDate: Date;

  constructor(
    private overlay: Overlay,
    private vc: ViewContainerRef
  ) {}

  /**
   * @description
   *
   * Ao iniciar o componente, os seguintes métodos são chamados para:
   * Define arrays que serão iterados para que as horas, os minutos e os segundos sejam exibidos no relógio.
   * Define a hora inicial que será mostrada no relógio.
   * Atualiza data que será emitida pelo componente.
   */
  ngOnInit() {
    this.defineClock();
    this.defineInitialTime();
    this.updateTime();
  }

  /**
   * @description
   *
   * Atualiza tempo que será emitido pelo componente ao detectar mudanças de alguma propriedade.
   */
  ngOnChanges() {
    this.updateTime();
  }

  /**
   * @description
   *
   * Cria um template de Portal para que o relógio possa ser exibido.
   */
  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(this.clockTemplate, this.vc);
  }

  /**
   * @description
   *
   * Define arrays que serão iterados para que as horas, os minutos e os segundos sejam exibidos no relógio.
   */
  private defineClock() {
    this.clockHours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    const minutesAndSeconds = Array(45).fill(15).map((fixedNumber, index) => fixedNumber + index);
    this.clockMinutesSeconds = minutesAndSeconds.concat(Array(15).fill(0).map((fixedNumber, index) => fixedNumber + index));
  }

  /**
   * @description
   *
   * Define a hora inicial do relógio baseado nos parâmetros que foram inputados.
   */
  private defineInitialTime() {
    if (!(this.hour && this.minute && this.second && this.date)) {
      this.defineTimeFromDate(this.now);
      return;
    }

    if (this.hour && this.minute && this.second && this.date) {
      const datetime = new Date(this.date);

      datetime.setHours(this.hour);
      datetime.setMinutes(this.minute);
      datetime.setSeconds(this.second);

      this.defineTimeFromDate(datetime);
      return;
    }

    if (this.date) {
      this.convertDate();
      this.defineTimeFromDate(this.date);
      return;
    }

    const date = new Date();
    date.setHours(this.hour);
    date.setMinutes(this.minute);
    date.setSeconds(this.second);

    this.defineTimeFromDate(date);
  }

  /**
   * @description
   *
   * Define a data, a hora, o minuto e o segundo do relócio baseado na data recebida como parâmetro.
   */
  defineTimeFromDate(date: Date) {
    this.date = date;

    this.hour = date.getHours();
    this.hourDisplay = date.getHours().toString().padStart(2, '0');

    this.minute = date.getMinutes();
    this.minuteDisplay = date.getMinutes().toString().padStart(2, '0');

    this.second = date.getSeconds();
    this.secondDisplay = date.getSeconds().toString().padStart(2, '0');
  }

  /**
   * @description
   *
   * Converte a data, se ela estiver em formato numérico.
   */
  private convertDate() {
    if (typeof this.date === 'number') {
      this.date = new Date(this.date);
    }
  }

  /**
   * @description
   *
   * Define o tipo de tempo que está ativo.
   */
  setTimeType(typeTime: TYPE_TIME) {
    this.timeTypeActive = typeTime;
  }

  /**
   * @description
   *
   * Atualiza a hora do componente.
   */
  updateHour(hour: number) {
    this.hour = hour;
    this.hourDisplay = hour.toString().padStart(2, '0');

    this.timeTypeActive = TYPE_TIME.MINUTE;

    this.updateTime();
  }

  /**
   * @description
   *
   * Atualiza o minuto do componente.
   */
  updateMinute(minute: number) {
    this.minute = minute;
    this.minuteDisplay = minute.toString().padStart(2, '0');

    this.timeTypeActive = TYPE_TIME.SECOND;

    this.updateTime();
  }

  /**
   * @description
   *
   * Atualiza o segundo do componente.
   */
  updateSecond(second: number) {
    this.second = second;
    this.secondDisplay = second.toString().padStart(2, '0');

    this.updateTime();
  }

  /**
   * @description
   *
   * Atualiza data que será emitida pelo componente.
   */
  private updateTime() {
    this.outputDate = this.date ? this.date : this.now;
    this.outputDate.setHours(this.hour);
    this.outputDate.setMinutes(this.minute);
    this.outputDate.setSeconds(this.second);
  }

  private createOverlay(element: HTMLElement) {
    const htmlElement = this.append ? this.append : element;

    this.overlayRef = this.overlay.create({
      panelClass: 'alb-clock-overlay',
      hasBackdrop: true,
      backdropClass: 'alb-clock-backdrop',
      positionStrategy: this.getPositionStrategy(htmlElement),
    });

    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });

    this.overlayRef.attach(this.templatePortal);
  }

  private getPositionStrategy(element: ElementRef | HTMLElement) {
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

  private subscribeOnBackdropClick() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.isClockOpen = false;
    });
  }

  onOpenClock(element: HTMLElement) {
    this.createOverlay(element);
    this.subscribeOnBackdropClick();
    this.isClockOpen = true;
  }

  private onAnimationDone(event: AnimationEvent) {
    const { fromState, toState } = event;

    if (fromState === 'open' && toState === 'close') {
      this.close();
    }
  }

  /**
   * @description
   *
   * Atualiza data que será emitida pelo componente e fecha relógio.
   */
  private close() {
    this.updateTime();
    this.overlayRef.dispose();
    this.change.emit(this.outputDate);
  }
}
