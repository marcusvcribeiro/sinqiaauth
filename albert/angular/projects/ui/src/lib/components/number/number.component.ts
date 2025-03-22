import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'alb-number',
  templateUrl: './number.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberComponent),
    multi: true
  }],
  host: {
    'class': 'alb-number',
  },
})
export class NumberComponent implements ControlValueAccessor, OnChanges, OnInit {

  @ViewChild('inputRef') inputRef;

  @Output() focusOut = new EventEmitter<void>();
  /**
   *
   * @description
   *
   * Valor do input
   *
   */
  @Input() value: number;

  /**
   *
   * @description
   *
   * Length da Máscara
   *
   */
  @Input() length = 7;

  /**
   *
   * @description
   *
   * Separador de milhar
   *
   */
  @Input() thousandsSeparator = '.';

  /**
   *
   * @description
   *
   * Caso é um número decimal, adiciona a quantidade de zeros de acordo com a a prop 'decimalLength'
   *
   */
  @Input() decimal = false;

  /**
   *
   * @description
   *
   * Desabilita o separador de casas de milhar
   *
   */
  @Input() disableThousandsSeparator = false;

  /**
   *
   * @description
   *
   * Quantidade de digitos decimais
   *
   */
  @Input() decimalLength = 2;

  /**
   *
   * @description
   *
   * Separador de decimal
   *
   */
  @Input() decimalSeparator = ',';

  /**
   *
   * @description
   *
   * Label do input
   *
   */
  @Input() placeholder: string;


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
   *
   * @description
   *
   * Alinhamento do input
   *
   */
  @Input() textAlign: 'left' | 'center' | 'right' = 'left';

  /**
   *
   * @description
   *
   * Habilita / Desabilita um input
   *
   */
  _disabled: boolean;
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  get disabled() {
    return this._disabled;
  }

  /**
   *
   * @description
   *
   * Habilita / Desabilita número negativo
   *
   */
  _allowNegative: boolean;
  @Input()
  set allowNegative(disabled: boolean) {
    this._allowNegative = coerceBooleanProperty(disabled);
  }

  get allowNegative() {
    return this._allowNegative;
  }

  /**
   *
   * @description
   *
   * Evento emitido após o valor do input ser alterado
   *
   */
  @Output() changeValue = new EventEmitter();

  stringValue = '';

  mask: any;

  ngOnInit() {
    this.mask = this.createMask();
  }

  ngOnChanges() {
    this.writeMask();
  }

  createMask() {
    return {
      mask: Number,
      max: Number('9'.repeat(this.length)),
      scale: this.decimalLength,
      signed: this.allowNegative,
      thousandsSeparator: this.disableThousandsSeparator ? '' : this.thousandsSeparator,
      padFractionalZeros: this.decimal,
      radix: this.decimalSeparator
    };
  }

  writeMask() {
    if (this.value && typeof this.value === 'number') {
      this.stringValue = this.value.toString();
    } else if (this.value) {
      const type = typeof this.value;
      this.stringValue = '';
      throw Error('alb-number só aceita números. Valor digitado é do tipo ' + type);
    }
  }

  convertStringToNumber(value, mask = this.mask) {
    let numberValue = null;
    if (value && value !== 0) {
      numberValue = Number(value.split(mask.thousandsSeparator).join('').split(mask.radix).join('.'));
    }
    return numberValue;
  }

  onChange(value: string) {
    // Necessidadae de utilizar o setTimeout por conta de que como o metodo esta sendo chamado toda vez
    // em que o usuario digita algo, é necessario o tempo até o valor do mask ser atualizado (so uma chama assincrona sem time).
    setTimeout(() => {
    // O typedValue sempre retorna um valor numérico mesmo que o input tenha sido limpado.
    // Por essa questão está sendo utilizado o value para verificar se o campo foi limpo ou não.
      let numberValue: number = this.inputRef.maskRef.typedValue;
      if (numberValue === undefined || numberValue === null) {
        numberValue = null;

      }
      this.changeValue.emit(numberValue);
      this.onChangeControlValueAccessor(numberValue);
      this.writeValue(numberValue);
    });
  }

  /* Métodos do Control Value Accessor */
  writeValue(value: any) {
    this.value = value;
    this.stringValue = value;
    this.writeMask();
  }

  registerOnChange(fn: () => void) {
    this.onChangeControlValueAccessor = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchControlValueAccessor = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onTouchControlValueAccessor = () => { };
  onChangeControlValueAccessor = (value: number) => { };
}
