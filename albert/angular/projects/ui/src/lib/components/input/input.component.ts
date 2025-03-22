import {
  Component,
  Input,
  forwardRef,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
  ChangeDetectorRef,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import IMask from 'imask';

enum Types {
  FILE = 'file',
  TEXT = 'text',
  PASSWORD = 'password',
  VIEW = 'view'
}

@Component({
  selector: 'alb-input',
  templateUrl: './input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  host: {
    class: 'alb-input',
    '[class.has-value]': '(value && value !== "") || (type === types.FILE)',
    '[class.has-placeholder]':
    'placeholder !== "" && placeholder !== null && placeholder !== undefined',
    '[attr.disabled]': 'disabled',
  },
})
export class InputComponent<MaskOpts extends IMask.AnyMaskedOptions>
  implements AfterViewInit, OnChanges, ControlValueAccessor {
  /**
   *
   * @Description
   *
   * Tipo do input Text ou Password
   *
   */
  @Input() type: 'text' | 'password' | 'file' = Types.TEXT;

  /**
   *
   * @description
   *
   * Valor do input
   *
   */
  @Input() value: any = '';

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
   * Máscara do input
   *
   */
  @Input() mask?: MaskOpts;

  /**
   *
   * @description
   *
   * Validação se o input é obrigatório
   *
   */
  _required: boolean;
  @Input()
  set required(required: boolean) {
    this._required = coerceBooleanProperty(required);
  }

  get required() {
    return this._required;
  }

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
   * Define se é readonly ou não
   *
   */
  _readonly: boolean;
  @Input()
  set readonly(readonly: boolean) {
    this._readonly = coerceBooleanProperty(readonly);
  }

  get readonly() {
    return this._readonly;
  }

  /**
   *
   * @description
   *
   * Define a quantidade máxima de caracteres
   *
   */
  _maxLength = 524288;
  @Input()
  set maxLength(maxLength: number) {
    this._maxLength = maxLength;
  }

  get maxLength() {
    return this._maxLength;
  }

  /**
   *
   * @description
   *
   * Referencia do input
   *
   */
  @ViewChild('inputRef') inputRef: ElementRef;

  /**
   *
   * @description
   *
   * Referencia da máscara
   *
   */
  maskRef: IMask.InputMask<MaskOpts>;

  /**
   *
   * @description
   *
   * Output para emitir valor do alb input, se utilizar so 'change' ele acaba capturando o evento do html implicando em erros
   *
   */
  @Output() changeValue = new EventEmitter<string>();

  /**
   *
   * @description
   *
   * Enum com tipos de input
   *
   */
  types = Types;

  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.type !== this.types.PASSWORD) {
      this.createMask(this.inputRef.nativeElement, this.mask);
    }

    this.checkIfHasMaskAndUpdateValue(this.value);
  }

  ngOnChanges(change: SimpleChanges) {
    const { value, mask } = change;

    if (mask && this.maskRef) {
      this.mask = mask.currentValue;
      this.maskRef.updateOptions(this.mask);
    }

    if (value) {
      this.checkIfHasMaskAndUpdateValue(
        value.currentValue,
        value.previousValue
      );
    }
  }

  createMask(element: HTMLElement, config: MaskOpts) {
    if (config) {
      this.maskRef = IMask(element, config);
    }
  }

  checkIfHasMaskAndUpdateValue(currentValue, previousValue?) {
    if (this.maskRef && currentValue && currentValue !== previousValue) {
      this.cd.detectChanges();
      this.maskRef.value = currentValue.toString();
    }
  }

  onInput(value: string) {
    if (this.type !== this.types.FILE) {
      this.value = value;
    }
    if (this.maskRef) {
      setTimeout(() => {
        this.onChangeControlValueAcessor(this.maskRef.value);
        this.changeValue.emit(this.maskRef.value);
      });
    } else {
      this.onChangeControlValueAcessor(value);
      this.changeValue.emit(value);
    }
  }

  /* Métodos do Control Value Accessor */
  writeValue(value: string) {
    this.checkIfHasMaskAndUpdateValue(value, this.value);
    this.value = value;
  }

  registerOnChange(fn: (rating: string) => void) {
    this.onChangeControlValueAcessor = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouchControlValueAcessor = fn;
  }

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onTouchControlValueAcessor = () => {};
  onChangeControlValueAcessor = (value: string) => {};
}
