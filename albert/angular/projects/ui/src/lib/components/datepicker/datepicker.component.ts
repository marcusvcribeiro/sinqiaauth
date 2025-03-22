import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { format } from 'date-fns';
import { Datepicker } from './datepicker';

@Component({
  selector: 'alb-datepicker',
  templateUrl: './datepicker.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerComponent),
    multi: true
  }],
  host: {
    'class': 'alb-datepicker',
  }
})
export class DatepickerComponent implements OnInit, OnChanges, ControlValueAccessor {

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
  @Input() mask = '00/00/0000';

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
  @Output() changeValue = new EventEmitter<Datepicker>();

  @ViewChild('inputRef', { read: ElementRef, static: true }) inputRef: ElementRef;

  /**
   * @description
   *
   *  Tamanho da string formatada. Por exemplo '20/02/2020' possui tamanho igual a 10
   */
  private formattedStringLength = 10;

  ngOnInit() {
    this.elementAppend = this.inputRef;
  }

  // override
  ngOnChanges() {
    this.updateDate(this.value);
  }

  /**
   * @description
   *
   *  Método para atualizar o valor da data e do texto de data formatado que sera exibido no input
   */
  updateDate(value: Date | string) {
    if (value instanceof Date) {
      this.date = value;
      this.textValue = this.formatDateToString(value);
    } else if (this.isValidISO(value)) {
      this.date = new Date(`${value} 00:00:00`);
      this.textValue = this.formatDateToString(this.date);
    } else {
      this.date = new Date();
      this.textValue = '';
    }
  }

  /**
   * @description
   *
   *  Método para data em formato String
   */
  formatDateToString(date: Date | string): string {
    if (date && date instanceof Date) {
      return format(date, 'dd/MM/yyyy');
    }
    if (date) {
      return format(new Date(date), 'dd/MM/yyyy');
    }
    return '';
  }

  /**
   * @description
   *
   *  Método para verificar se o valor é em formato ISO
   */
  isValidISO(value): boolean {
    return /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/g.test(value);
  }

  /**
   * @description
   *
   *  Método para converter data para padrão ISO
   *  No caso o valor de entrada tem que estar no padrão 'dd/mm/yyyy'
   */
  parseISO(value: string): string {
    const [day, month, year] = value.split('/');
    return `${year}-${month}-${day}`;
  }

  /**
   * @description
   *
   *  Método para converter data para padrão do Datepicker
   */
  convertToDatepickerValue(date: Date): Datepicker {
    return { date, string: format(date, 'yyyy-MM-dd') };
  }

  /**
   * @description
   *
   *  Método para quando existe alteração de valor vindo do calendar
   */
  onDateChange(date: Date) {

    this.updateDate(date);
    const result: Datepicker = this.convertToDatepickerValue(date);

    this.onTouchControlValueAccessor();
    this.onChangeControlValueAccessor(result.string);
    this.changeValue.emit(result);
  }

  /**
   * @description
   *
   *  Método para quando existe alteração de valor vindo do input
   */
  onInputChange(value: string) {
    if (value && value.length === this.formattedStringLength) {
      const date = this.parseISO(value);
      if (this.isValidISO(date)) {
        this.date = new Date(`${date} 00:00:00`);
        this.changeValue.emit(this.convertToDatepickerValue(this.date));
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

  private clearValue() {
    this.date = null;
    this.changeValue.emit(null);
    this.textValue = null;
    this.onChangeControlValueAccessor(null);
  }

  /* Métodos do Control Value Accessor */
  // override
  writeValue(value: string) {
    this.updateDate(value);
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

}
