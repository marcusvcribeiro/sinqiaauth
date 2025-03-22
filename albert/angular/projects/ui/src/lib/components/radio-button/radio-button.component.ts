
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  QueryList
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioButton } from './radio-button';

/* Adiciona inteiro para gerar ids unicos para os radio components */
let nextUniqueId = 0;

@Component({
  selector: 'alb-radio-button',
  templateUrl: './radio-button.component.html',
  host: {
    'class': 'alb-radio',
    '[class.--checked]': 'checked',
    '[class.--disabled]': 'disabled'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonComponent implements OnInit {
  /**
   *
   * @description
   *
   * Input boolean que seta como valor `checked`
   *
   */
  private _checked: boolean;
  @Input()
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    this._checked = coerceBooleanProperty(value);
  }

  /**
   *
   * @description
   *
   * Input boolean que desativa um radio
   *
   */
  private _disabled: boolean;
  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  /**
   *
   * @description
   *
   * Atributo HTML name do grupo
   *
   */

  @Input() name: string;

  /**
   *
   * @description
   *
   * Input que acrescenta um value ao radio
   *
   */
  @Input() value: any;

  constructor(
    private radioGroup: RadioGroupDirective,
  ) {
  }

  ngOnInit() {
    const radioGroupIsDisabled = this.radioGroup.disabled;
    if (radioGroupIsDisabled) {
      this.disabled = radioGroupIsDisabled;
    }
  }

  onChange(element: HTMLInputElement) {
    const { value, checked } = element;
    this.radioGroup.radioSelected = { value, checked, element, component: this };
    this.checked = element.checked;
  }
}

@Directive({
  selector: 'alb-radio-group',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupDirective),
    multi: true
  }],
  host: {
    'class': 'alb-radio-group'
  }
})
export class RadioGroupDirective implements AfterContentInit, ControlValueAccessor {

  @ContentChildren(RadioButtonComponent) radios: QueryList<RadioButtonComponent>;

  /**
   *
   * @description
   *
   * O atributo name do HTML aplicado no radio button neste grupo
   *
   */
  private _name = `alb-radio-group-${nextUniqueId++}`;
  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
  }

  /**
   *
   * @description
   *
   * Input boolean que desativa um radio
   *
   */
  private _disabled: boolean;
  get disabled(): boolean {
    return this._disabled;
  }
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  /**
   *
   * @description
   *
   * Selecioa um radio button
   *
   */
  private _value: any;
  @Input()
  get value(): string {
    return this._value;
  }
  set value(value: string) {
    if (this._value !== value) {
      this._value = value;
      this.updateSelectedRadioFromValue();
    }
  }

  /**
   *
   * @description
   *
   * Emite um output quando realizado um mudança no botão clicado
   *
   */
  @Output() readonly changeValue: EventEmitter<RadioButton> = new EventEmitter<RadioButton>();

  private _radioSelected: RadioButton;
  get radioSelected(): RadioButton {
    return this._radioSelected;
  }

  set radioSelected(value: RadioButton) {
    this._radioSelected = value;
    this.clearAllRadiosButSelectedOne(this.radios.toArray(), value.component);
    this.changeValue.emit(value);
    this.onTouchControlValueAcessor();
    this.onChangeControlValueAcessor(this._radioSelected.value);
  }


  ngAfterContentInit() {
    this.updateRadioNames();
    this.updateSelectedRadioFromValue();
  }

  updateRadioNames() {
    this.radios.forEach(radio => {
      radio.name = this.name;
    });
  }

  clearAllRadiosButSelectedOne(radioButtons: RadioButtonComponent[], radioButtonSelected: RadioButtonComponent) {
    radioButtons.forEach(radio => {
      if (radio !== radioButtonSelected) {
        radio.checked = false;
      }
    });
  }

  updateSelectedRadioFromValue() {
    const isAlreadySelected = this.value === (this.radioSelected && this.radioSelected.value);

    if (this.radios && !isAlreadySelected) {
      this.radios.forEach(radio =>
        radio.checked = this.value === radio.value
      );
    }
  }

  /* Métodos do Control Value Accessor */
  writeValue(value: string) {
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

  onTouchControlValueAcessor = () => { };
  onChangeControlValueAcessor = (value: string) => { };
}
