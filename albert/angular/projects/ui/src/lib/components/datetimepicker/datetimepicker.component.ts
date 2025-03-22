import { animate, state, style, transition, trigger } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format } from 'date-fns';
import { Datetimepicker } from './datetimepicker';

@Component({
  selector: 'alb-datetimepicker',
  templateUrl: './datetimepicker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatetimepickerComponent),
    multi: true
  }],
  host: {
    'class': 'alb-datetimepicker',
  },
  animations: [
    trigger('openClose', [
      state('open', style({ opacity: 1, height: '100%' })),
      state('close', style({ opacity: 0, height: '30%' })),
      transition('open => close', [animate('0.1s')]),
      transition('close => open', [animate('0.1s')])
    ])
  ]
})
export class DatetimepickerComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  @ViewChild('datetimeTemplate') datetimeTemplate: TemplateRef<any>;

  /**
   * @description
   *
   *  Elemento vinculado ao calendário
   */
  elementAppend;

  /**
   * @description
   *
   *  Valor da data do alb-calendar
   */
  date = new Date();

  /**
   * @description
   *
   *  Valor de texto do alb-input
   */
  textValue = '';

  /**
   * @description
   *
   *  Máscara iniciada como default
   */
  @Input() mask = '00/00/0000 00:00:00';

  /**
   * @description
   *
   *  Data de entrada, pode ser uma instancia de Date ou uma data no padrão ISO 8601
   */
  @Input() value: string | Date = '';

  /**
   * @description
   *
   *  Placeholder do input
   */
  @Input() placeholder = '';

  /**
   *
   * @description
   *
   * Error do input
   *
   */
  @Input() error: string;

  /**
   *
   * @description
   *
   * Hint do input
   *
   */
  @Input() hint: string;

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
   *  Emite valor do datepicker
   */
  @Output() changeValue = new EventEmitter<Datetimepicker>();

  @ViewChild('inputRef', { read: ElementRef, static: true }) inputRef: ElementRef;

  /**
   * @description
   *
   *  Tamanho da string formatada. Por exemplo '20/02/2020 12:50:30' possui tamanho igual a 19
   */
  private formattedStringLength = 19;

  templatePortal: TemplatePortal<any>;
  isCalendarOpen: boolean;

  constructor(
    private vc: ViewContainerRef
  ) { }

  ngOnInit() {
    this.elementAppend = this.inputRef;
  }

  ngOnChanges() {
    this.updateDatetime(this.value);
  }

  ngAfterViewInit() {
    this.templatePortal = new TemplatePortal(this.datetimeTemplate, this.vc);
  }

  onDateChange(date: Date) {
    this.updateDatetime(date);
    const result: Datetimepicker = this.convertToDatepickerValue(date);

    this.onTouchControlValueAccessor();
    this.onChangeControlValueAccessor(result.string);
    this.changeValue.emit(result);
  }

  onInputChange(value: string) {
    if (value && value.length === this.formattedStringLength) {
      const date = this.parseISO(value);

      if (this.isValidISO(date)) {
        this.date = new Date(`${date}`);
        const result = this.convertToDatepickerValue(this.date);
        this.changeValue.emit(result);
        this.textValue = value;
        this.onChangeControlValueAccessor(result.string);
        return;
      }
    }

    if (value && value.length > 0 && value.length < this.formattedStringLength) {
      this.textValue = value;
      return;
    }

    this.clearValue();
  }

  focusOut() {
    this.onTouchControlValueAccessor();
    if (this.textValue && this.textValue.length < this.formattedStringLength) {
      this.clearValue();
    }
  }

  /* Métodos do Control Value Accessor */
  writeValue(value: string) {
    this.updateDatetime(value);
  }

  // override
  registerOnChange(fn: (rating: string) => void) {
    this.onChangeControlValueAccessor = fn;
  }

  // override
  registerOnTouched(fn: () => void) {
    this.onTouchControlValueAccessor = fn;
  }

  // override
  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  // override
  onTouchControlValueAccessor = () => { };

  // override
  onChangeControlValueAccessor = (value: string | Date) => { };

  private formatDatetimeToString(date: Date | string): string {
    if (date instanceof Date) {
      return format(date, 'dd/MM/yyyy HH:mm:ss');
    }
    return format(new Date(date), 'dd/MM/yyyy HH:mm:ss');
  }

  private isValidISO(value) {
    return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])) ((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/g.test(value);
  }

  private parseISO(value: string) {
    const [day, month, yearHourComplete] = value.split('/');

    if (yearHourComplete) {
      const [year, hourComplete] = yearHourComplete.split(' ');

      if (hourComplete) {
        const [hour, minute, second] = hourComplete.split(':');

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
      }
    }
    return '';
  }

  private convertToDatepickerValue(datetime: Date): Datetimepicker {
    return { datetime, string: format(datetime, 'yyyy-MM-dd\'T\'HH:mm:ss') };
  }

  private updateDatetime(value: Date | string) {
    if (value instanceof Date) {
      this.date = value;
      this.textValue = this.formatDatetimeToString(value);
      return;
    }

    if (this.isValidISO(value)) {
      this.date = new Date(`${value}`);
      this.textValue = this.formatDatetimeToString(this.date);
      return;
    }

    this.date = null;
    this.textValue = '';
  }

  private clearValue() {
    this.date = null;
    this.changeValue.emit(null);
    this.textValue = null;
    this.onChangeControlValueAccessor(null);
  }
}
