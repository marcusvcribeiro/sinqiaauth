import { InputComponent } from '@albert/ui/lib/components/input/input.component';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'sq-cpf-cnpj-input',
  templateUrl: './cpf-cnpj-input.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CpfCnpjInputComponent),
    multi: true
  }],
})
export class CpfCnpjInputComponent implements ControlValueAccessor {


  /**
   *
   * @description
   *
   * Valor do input
   *
   */
  private _value: any = '';

  @Input()
  set value(v: any) {
    const valorProcessado = this.processarValor(v);
    this.selecionarMascara(valorProcessado);
    this._value = valorProcessado;
  }

  get value() {
    return this._value;
  }

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
   * Verifica se existe algum erro
   *
   */
  @Input() erro: boolean;

  /**
   * @description tamanho maximo do input
   */
  @Input() maxLength: number;

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
   * Output para emitir valor do alb input, se utilizar so 'change' ele acaba capturando o evento do html implicando em erros
   *
   */
  @Output() changeValue = new EventEmitter<string>();


  private cpfMask = { mask: '000.000.000-00' };
  private cnpjMask = { mask: '00.000.000/0000-00' };
  mask = this.cpfMask;

  readonly tamanhoMaximoComMascara = 18;

  change(value) {
    const valorProcessado = this.processarValor(value);
    this.selecionarMascara(valorProcessado);
    this.onChangeControlValueAcessor(valorProcessado);
    this.changeValue.emit(valorProcessado);
    this.onTouchControlValueAcessor();
  }

  private processarValor(valor: string): string {
    if (valor == null) { return null; }
    let valorProcessado = valor.replace(/\D/g, '');

    if (valorProcessado.length > this.maxLength) {
      valorProcessado = valorProcessado.substring(0, this.maxLength);
    }

    return valorProcessado
  }

  private selecionarMascara(valor: string) {
    if (valor) {
      if (valor.trim().length > 11 && this.mask === this.cpfMask) {
        this.mask = this.cnpjMask;
      } else if (valor.trim().length <= 11 && this.mask === this.cnpjMask) {
        this.mask = this.cpfMask;
      }
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
