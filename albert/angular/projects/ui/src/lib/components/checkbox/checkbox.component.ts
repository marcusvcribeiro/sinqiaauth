import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'alb-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckBoxCompoent),
    multi: true
  }],
  host: {
    'class': 'alb-checkbox-container'
  }
})
export class CheckBoxCompoent implements ControlValueAccessor, AfterViewInit {

  @ViewChild('checkbox') public inputCheckbox: ElementRef;

  /**
   *
   * @description
   *
   * Valor do input
   */
  @Input() value = false;

  /**
   *
   * @description
   *
   * Label do input
   */
  @Input() label: string;

  /**
   *
   * @description
   *
   * Habilita / Desabilita um input
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
   * Seta o checkbox como indeterminate
   */
  _indeterminate: boolean;
  @Input()
  set indeterminate(indeterminate: boolean) {
    if (this.inputCheckbox) {
      this.inputCheckbox.nativeElement.indeterminate = indeterminate;
    }
    this._indeterminate = coerceBooleanProperty(indeterminate);
  }

  get indeterminate() {
    return this._indeterminate;
  }

  ngAfterViewInit(): void {
    this.inputCheckbox.nativeElement.indeterminate = this.indeterminate;
  }

  // override
  writeValue(obj: boolean): void {
    this.value = obj;
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
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTouched = () => { };
  onChange = (value: boolean) => { };

  onChangeValue(value) {
    this.value = value.currentTarget.checked;
    this.onChange(this.value);
  }
}
