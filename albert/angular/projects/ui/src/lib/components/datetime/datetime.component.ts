import { animate, AnimationEvent, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns';


enum TYPE_TIME {
  HOUR = 1,
  MINUTE = 2,
  SECOND = 3
}

@Component({
  selector: 'alb-datetime',
  templateUrl: './datetime.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class DatetimeComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('datetimeTemplate') scheduleTemplate: TemplateRef<any>;

  /**
   * @description
   *
   * Data inserida
   */
  private _date: Date = new Date();
  @Input()
  set date(date: Date) {
    this._date = date ? date : this.defaultDate;
    this.previousDate = date ? date : this.defaultDate;
    this.updateCalendar();
  }

  get date(): Date {
    return this._date;
  }

  defaultDate: Date = new Date();
  previousDate: Date = new Date();

  /**
   * @description
   *
   * Hora exibida no componente.
   */
  hourDisplay: string;

  /**
   * @description
   *
   * Minuto exibido no componente.
   */
  minuteDisplay: string;

  /**
   * @description
   *
   * Segundo exibido no componente.
   */
  secondDisplay: string;

  /**
   * @description
   *
   * Hora inserida.
   */
  _hour: number;
  @Input()
  set hour(value: number) {
    this._hour = value;

    if (typeof value === 'number') {
      this.hourDisplay = value.toString().padStart(2, '0');
    }
  }

  get hour(): number {
    return this._hour;
  }

  defaultHour: number;

  /**
   * @description
   *
   * Minuto inserido.
   */
  _minute: number;
  @Input()
  set minute(value: number) {
    this._minute = value;

    if (typeof value === 'number') {
      this.minuteDisplay = value.toString().padStart(2, '0');
    }
  }

  get minute(): number {
    return this._minute;
  }

  defaultMinute: number;

  /**
   * @description
   *
   * Segundo inserido.
   */
  _second: number;
  @Input()
  set second(value: number) {
    this._second = value;

    if (typeof value === 'number') {
      this.secondDisplay = value.toString().padStart(2, '0');
    }
  }

  get second(): number {
    return this._second;
  }

  defaultSecond: number;

  /**
   * @description
   *
   *  Disabled do input
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
   * Tipo de layout
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
   * Elemento a qual pode ser passado para o calendário ser vinculado
   */
  @Input() append?: ElementRef | HTMLElement;

  /**
   * @description
   *
   * Evento emitido quando a data é selecionada
   */
  @Output() change: EventEmitter<Date> = new EventEmitter();

  /**
   * @description
   *
   * Referência à data corrente.
   */
  today = new Date();

  /**
   * @description
   *
   * Array com os dias da semana corrente.
   */
  weekDays: Date[] = [];

  /**
   * @description
   *
   * Array com os dias do mês corrente.
   */
  schedule: Date[] = [];

  /**
   * @description
   *
   * Referência do overlay que é criado.
   */
  templatePortal: TemplatePortal<any>;

  /**
   * @description
   *
   * Referência do overlay que é criado.
   */
  overlayRef: OverlayRef;

  /**
   * @description
   *
   * Boolean que define se o componente está aberto ou não.
   */
  isDatetimeOpen: boolean;

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
   * Data atualizada com hora que será retornada.
   */
  outputDatetime: Date;

  constructor(
    private overlay: Overlay,
    private vc: ViewContainerRef
  ) { }

  ngOnInit() {
    this.updateCalendar();
    this.defineClock();
    this.defineInitialTime();
    this.updateDatetime();
  }

  ngOnChanges(changes: SimpleChanges) {
    const { date } = changes;
    if (date) {
      this.dateChanged(date);
    }
  }

  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(this.scheduleTemplate, this.vc);
  }

  formatWeek(date: Date) {
    return format(date, 'eeeee');
  }

  onOpenSchedule(element: HTMLElement) {
    this.createOverlay(element);
    this.subscribeOnBackdropClick();
    this.isDatetimeOpen = true;
  }

  onNextMonth() {
    if (this.date) {
      this._date = addMonths(this.date, 1);
    } else {
      this.defaultDate = addMonths(this.defaultDate, 1);
    }
    this.updateCalendar();
  }

  onPrevMonth() {
    if (this.date) {
      this._date = subMonths(this.date, 1);
    } else {
      this.defaultDate = subMonths(this.defaultDate, 1);
    }
    this.updateCalendar();
  }

  onDateSelected(date: Date) {
    this._date = date;
    this.updateDatetime();
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

    this.timeTypeActive = TYPE_TIME.MINUTE;

    this.updateDatetime();
  }

  /**
   * @description
   *
   * Atualiza o minuto do componente.
   */
  updateMinute(minute: number) {
    this.minute = minute;

    this.timeTypeActive = TYPE_TIME.SECOND;

    this.updateDatetime();
  }

  /**
   * @description
   *
   * Atualiza o segundo do componente.
   */
  updateSecond(second: number) {
    this.second = second;

    this.updateDatetime();
  }

  onAnimationDone(event: AnimationEvent) {
    const { fromState, toState } = event;

    if (fromState === 'open' && toState === 'close') {
      this.overlayRef.dispose();
      this.defaultDate = new Date();
      this._date = this.previousDate;
      this.hour = this.previousDate.getHours();
      this.minute = this.previousDate.getMinutes();
      this.second = this.previousDate.getSeconds();

      this.updateCalendar();
    }
  }

  confirm() {
    this.previousDate = this.outputDatetime;
    this.isDatetimeOpen = false;
    this.change.emit(this.outputDatetime);
  }

  private updateCalendar() {
    if (!this.date) {
      this.defaultDate.setHours(0, 0, 0, 0);
    }
    this.today.setHours(0, 0, 0, 0);

    this.weekDays = this.getWeek();
    this.schedule = this.updateSchedule();
  }

  private getWeek(): Date[] {
    return eachDayOfInterval({
      start: startOfWeek(this.date ? this.date : this.defaultDate),
      end: endOfWeek(this.date ? this.date : this.defaultDate)
    });
  }

  private updateSchedule() {
    const startMonth = startOfMonth(this.date ? this.date : this.defaultDate);
    const endMonth = endOfMonth(this.date ? this.date : this.defaultDate);
    const startDate = startOfWeek(startMonth);
    const endDate = endOfWeek(endMonth);

    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }

  private defineClock() {
    this.clockHours = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1, 2];

    const minutesAndSeconds = Array(45).fill(15).map((fixedNumber, index) => fixedNumber + index);
    this.clockMinutesSeconds = minutesAndSeconds.concat(Array(15).fill(0).map((fixedNumber, index) => fixedNumber + index));
  }

  private defineInitialTime() {
    const date = new Date();
    if (typeof this.hour === 'undefined' || this.hour === null) {
      this.hour = date.getHours();
      this.defaultHour = this.hour;
    }

    if (typeof this.minute === 'undefined' || this.minute === null) {
      this.minute = date.getMinutes();
      this.defaultMinute = this.minute;
    }

    if (typeof this.second === 'undefined' || this.second === null) {
      this.second = date.getSeconds();
      this.defaultSecond = this.second;
    }
  }

  /**
   * @description
   *
   * Atualiza data que será emitida pelo componente.
   */
  private updateDatetime() {
    this.outputDatetime = new Date(this.date);
    this.outputDatetime.setHours(this.hour, this.minute, this.second);
  }

  private createOverlay(element: HTMLElement) {
    const htmlElement = this.append ? this.append : element;

    this.overlayRef = this.overlay.create({
      panelClass: 'alb-datetime-overlay',
      hasBackdrop: true,
      backdropClass: 'alb-datetime-backdrop',
      positionStrategy: this.getPositionStrategy(htmlElement),
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
      this.isDatetimeOpen = false;
    });
  }

  private dateChanged(date: SimpleChange) {
    if (date.currentValue && date.currentValue !== date.previousValue) {
      this.hour = date.currentValue.getHours();
      this.minute = date.currentValue.getMinutes();
      this.second = date.currentValue.getSeconds();

      this.updateCalendar();
      this.updateDatetime();
      return;
    }
    if (!date.currentValue && date.currentValue !== date.previousValue) {
      this.hour = this.defaultHour;
      this.minute = this.defaultMinute;
      this.second = this.defaultSecond;

      this.updateCalendar();
      this.updateDatetime();
      return;
    }
  }
}
