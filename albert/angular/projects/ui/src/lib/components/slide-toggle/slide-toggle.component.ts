import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'alb-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  host: {
    'class': 'alb-slide-toggle',
    '[class.--disabled]': 'disabled'
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true
    }
  ],
})

export class SlideToggleComponent implements ControlValueAccessor {

  /**
   *
   * @description
   *
   * Name do input
   */
  @Input() name = '';

  /**
   *
   * @description
   *
   * Rótulo do toggle
   */
  @Input() label = '';

  /**
   *
   * @description
   *
   * Aria-label do input
   */
  @Input() ariaLabel = '';

  /**
   *
   * @description
   *
   * Aria-labelled-by do input
   */
  @Input() ariaLabelledBy = '';

  /**
   *
   * @description
   *
   * Valor se o toggle está checked ou unchecked
   */
  _checked = false;

  @Input()
  set checked(checked: boolean) {
    this._checked = coerceBooleanProperty(checked);
  }

  get checked() {
    return this._checked;
  }

  /**
   *
   * @description
   *
   * Habilita / Desabilita o toggle
   */
  _disabled = false;
  @Input()
  set disabled(disabled: boolean) {
    this._disabled = coerceBooleanProperty(disabled);
  }

  get disabled() {
    return this._disabled;
  }

  // override
  writeValue(isChecked: boolean): void {
    this.checked = isChecked;
  }

  // override
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // override
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // override
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChangeValue(checked: boolean) {
    this.onChange(checked);
  }

  onChange = (value: boolean) => { };
  onTouched = () => { };
}
