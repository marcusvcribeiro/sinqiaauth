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
  OnChanges,
  ElementRef
} from '@angular/core';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AnimationEvent, trigger, transition, style, animate, state } from '@angular/animations';

import {
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  format,
} from 'date-fns';

@Component({
  selector: 'alb-calendar',
  templateUrl: './calendar.component.html',
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class CalendarComponent implements OnInit, AfterViewInit, OnChanges {

  /**
   * @description
   *
   * Template reference de onde sera exibido o calendar
   */
  @ViewChild('scheduleTemplate') scheduleTemplate: TemplateRef<any>;

  /**
   * @description
   *
   * Data inserida
   */
  @Input()
  set date(date: Date) {
    this._date = date ? date : null;
    this.previousDate = date ? date : this.defaultDate;
    this.updateCalendar();
  }

  get date(): Date {
    return this._date;
  }

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
   * Variavel que armazena valor da data utilizada
   */
  private _date: Date;

  /**
   * @description
   *
   * Data default do calendar (data atual)
   */
  defaultDate: Date = new Date();

  /**
   * @description
   *
   * Variavel que armazena a data previamente selecionada para permitir resetar a data toda vez que o calendar for fechado.
   */
  previousDate: Date = new Date();
  today = new Date();
  weekDays: Date[] = [];
  schedule: Date[] = [];
  templatePortal: TemplatePortal<any>;
  overlayRef: OverlayRef;
  isCalendarOpen: boolean;

  constructor(
    private overlay: Overlay,
    private vc: ViewContainerRef
  ) { }

  // override
  ngOnInit() {
    this.updateCalendar();
  }

  // override
  ngOnChanges() {
    this.updateCalendar();
  }

  // override
  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(this.scheduleTemplate, this.vc);
  }

  /**
   * @description
   *
   *  Método que atualiza o valor do calendário
   */
  updateCalendar() {
    if (this.date) {
      this.date.setHours(0, 0, 0, 0);
    } else {
      this.defaultDate.setHours(0, 0, 0, 0);
    }
    this.today.setHours(0, 0, 0, 0);
    this.weekDays = this.getWeek();
    this.schedule = this.updateSchedule();
  }

  /**
   * @description
   *
   *  Método que retorna os dias de uma semana
   *  No caso ele considera para pegar esses valores o date do componente ou o defaultDate caso o date seja invalido
   */
  getWeek(): Date[] {
    return eachDayOfInterval({
      start: startOfWeek(this.date ? this.date : this.defaultDate),
      end: endOfWeek(this.date ? this.date : this.defaultDate)
    });
  }

  /**
   * @description
   *
   *  Método que retorna os dias do Mês considerando a data do componente ou o defaultDate caso o date esteja invalido
   */
  updateSchedule(): Date[] {
    const startMonth = startOfMonth(this.date ? this.date : this.defaultDate);
    const endMonth = endOfMonth(this.date ? this.date : this.defaultDate);
    const startDate = startOfWeek(startMonth);
    const endDate = endOfWeek(endMonth);

    return eachDayOfInterval({
      start: startDate,
      end: endDate,
    });
  }

  /**
   * @description
   *
   *  Método que cria o overlay aonde sera exibido o calendário
   */
  createOverlay(element: HTMLElement) {
    const htmlElement = this.append ? this.append : element;

    this.overlayRef = this.overlay.create({
      panelClass: 'alb-calendar-overlay',
      hasBackdrop: true,
      backdropClass: 'alb-calendar-backdrop',
      positionStrategy: this.getPositionStrategy(htmlElement),
    });

    this.overlayRef.attach(this.templatePortal);
  }

  /**
   * @description
   *
   *  Método que obtem a posição aonde sera exibido o calendar
   */
  getPositionStrategy(element: ElementRef | HTMLElement) {
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
   * @description
   *
   *  Método para pegar os nomes dos dias da semana (segunda, terça ....)
   */
  formatWeek(date: Date) {
    if (date) {
      return format(date, 'eeeee');
    }
  }

  /**
   * @description
   *
   *  Método que cria subscribe para quando o calendar é clicado
   */
  subscribeOnBackdropClick() {
    this.overlayRef.backdropClick().subscribe(() => {
      this.isCalendarOpen = false;
    });
  }

  /**
   * @description
   *
   *  Método para abrir o calendar
   */
  onOpenSchedule(element: HTMLElement) {
    this.createOverlay(element);
    this.subscribeOnBackdropClick();
    this.isCalendarOpen = true;
  }

  /**
   * @description
   *
   *  Método para atualizar o calendar para o proximo mês
   */
  onNextMonth() {
    if (this.date) {
      this._date = addMonths(this.date, 1);
    } else {
      this.defaultDate = addMonths(this.defaultDate, 1);
    }
    this.updateCalendar();
  }

  /**
   * @description
   *
   *  Método para atualizar o calendário para mês anterior
   */
  onPrevMonth() {
    if (this.date) {
      this._date = subMonths(this.date, 1);
    } else {
      this.defaultDate = subMonths(this.defaultDate, 1);
    }
    this.updateCalendar();
  }

  /**
   * @description
   *
   *  Método que atualiza datas quando um valor é clicado no calendário
   */
  onDateSelected(date: Date) {
    this._date = date;
    this.previousDate = date;
    this.isCalendarOpen = false;
    this.change.emit(this.date);
  }

  /**
   * @description
   *
   *  Método para tratar comportamento para quando ocorre alguma atualização nas animações do calendário
   */
  onAnimationDone(event: AnimationEvent) {
    const { fromState, toState } = event;

    // caso o calendário esteja indo da posição de aberto para fechado ele atualiza a data default,
    // a data do componente e atualiza o calendário
    if (fromState === 'open' && toState === 'close') {
      this.overlayRef.dispose();
      this.defaultDate = new Date();
      this._date = this.previousDate;
      this.updateCalendar();
    }
  }
}
