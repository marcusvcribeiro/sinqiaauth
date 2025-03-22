import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { format } from 'date-fns';
import { Timepicker } from './timepicker';

@Component({
  selector: 'alb-timepicker',
  templateUrl: './timepicker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimepickerComponent),
    multi: true
  }],
  host: {
    'class': 'alb-timepicker',
  }
})
export class TimepickerComponent implements OnInit, OnChanges {

  /**
   * @description
   *
   *  Elemento vinculado ao calendário
   */
  elementAppend: ElementRef | HTMLElement;

  /**
   * @description
   *
   *  Valor da data do alb-clock
   */
  @Input() date = new Date();

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
  @Input() mask = '00:00:00';

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
   *  Emite valor do timepicker
   */
  @Output() changeValue = new EventEmitter<Timepicker>();

  /**
   * @description
   *
   * Referência do input do componente.
   */
  @ViewChild('inputRef', { read: ElementRef, static: true }) inputRef: ElementRef;

  /**
   * @description
   *
   *  Tamanho da string formatada. Por exemplo '12:50:30' possui tamanho igual a 8
   */
  private formattedStringLength = 8;

  ngOnInit() {
    this.elementAppend = this.inputRef;
  }

  ngOnChanges() {
    this.updateTime(this.value);
  }

  onTimeChange(date: Date) {
    this.textValue = this.formatDateToString(date);

    const result: Timepicker = this.convertToTimepickerValue(date);

    this.onTouchControlValueAccessor();
    this.onChangeControlValueAccessor(result.string);
    this.changeValue.emit(result);
  }

  onInputChange(value: string) {
    if (value && value.length === this.formattedStringLength) {
      const date = value;
      if (this.isValidISO(date)) {
        // criando data atual e setando o horario.
        this.setHours(date);
        this.changeValue.emit(this.convertToTimepickerValue(this.date));
        this.textValue = value;
        this.onChangeControlValueAccessor(date);
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
    this.updateTime(value);
  }

  registerOnChange(fn: (rating: string) => void) {
    this.onChangeControlValueAccessor = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchControlValueAccessor = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onTouchControlValueAccessor = () => { };
  onChangeControlValueAccessor = (value: string | Date) => { };

  private updateTime(value: Date | string) {
    if (value instanceof Date) {
      this.date = value;
      this.textValue = this.formatDateToString(value);
      return;
    }

    if (this.isValidISO(value)) {
      this.setHours(value);
      this.textValue = this.formatDateToString(this.date);
      return;
    }

    this.date = new Date();
    this.textValue = '';
  }

  private formatDateToString(date: Date | string): string {
    if (date instanceof Date) {
      return format(date, 'HH:mm:ss');
    }
    return format(new Date(date), 'HH:mm:ss');
  }

  private isValidISO(value) {
    return /^((?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$)/g.test(value);
  }

  private convertToTimepickerValue(date: Date): Timepicker {
    return { date, string: format(date, 'HH:mm:ss') };
  }

  private clearValue() {
    this.date = null;
    this.changeValue.emit(null);
    this.textValue = null;
    this.onChangeControlValueAccessor(null);
  }

  private setHours(value: string) {
    const [hour, minute, second] = value.split(':');
    this.date = new Date();
    this.hour = Number(hour);
    this.minute = Number(minute);
    this.second = Number(second);
    this.date.setHours(this.hour);
    this.date.setMinutes(this.minute);
    this.date.setSeconds(this.second);
  }
}
