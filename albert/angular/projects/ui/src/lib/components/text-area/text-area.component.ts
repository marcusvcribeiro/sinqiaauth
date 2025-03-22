import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TextAreaComponent),
  multi: true
};
const noop = () => { };

@Component({
  selector: 'alb-textarea',
  templateUrl: './text-area.component.html',
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
  host: {
    'class': 'alb-text-area',
    '[class.has-value]': 'textArea !== "" && textArea !== null && textArea !== undefined',
    '[class.has-placeholder]': 'placeholder !== "" && placeholder !== null && placeholder !== undefined'
  }
})
export class TextAreaComponent implements ControlValueAccessor, AfterViewInit {

  /**
   *
   * @description
   *
   * Valor do text-area.
   *
   */
  textArea = '';

  /**
   *
   * @description
   *
   * Propriedade que controla se o text-area está ou não desabilitado.
   *
   */
  _disabled = false;

  /**
   *
   * @description
   *
   * Número de rows que o text-area vai ter por default.
   *
   */
  @Input()
  rows = 10;

  /**
   *
   * @description
   *
   * Placeholder do text-area (texto exibido quando não existe nem valor inputado).
   *
   */
  @Input()
  placeholder = '';

  /**
   *
   * @description
   *
   * Input para escrever o valor do text-area.
   *
   */
  @Input()
  set value(val: string) {
    this.writeValue(val);
  }

  /**
   *
   * @description
   *
   * Input para setar o estado de disabled do text-area.
   *
   */
  @Input()
  set disabled(val: any) {
    this._disabled = coerceBooleanProperty(val);
  }

  /**
   *
   * @description
   *
   * Referência do elemento html do text-area.
   *
   */
  @ViewChild('textAreaElement', { read: ElementRef }) textAreaElement: ElementRef;

  /**
   *
   * @description
   *
   * Quantidade máxima de caracteres que o text-area pode ter, default de 500.
   *
   */
  @Input() length = 500;

  /**
   *
   * @description
   *
   * Quantidade de caracteres atualmente digitados no text-area.
   *
   */
  textAreaLength = 0;

  /**
   *
   * @description
   *
   * Altura default que o componente do text-area vai ter.
   * Utilizada por conta de existir a opção de resize no componente.
   *
   */
  defaultHeight: number;

  /**
   *
   * @description
   *
   * Evento emitido após o valor do input ser alterado.
   *
   */
  @Output() changeValue: EventEmitter<string> = new EventEmitter();

  // override
  private onTouched: () => void = noop;

  // override
  private onChange: (_: any) => void = noop;

  // override
  ngAfterViewInit(): void {
    this.defaultHeight = this.textAreaElement.nativeElement.offsetHeight;
    this.textAreaElement.nativeElement.style.minHeight = this.defaultHeight + 'px';
  }

  // override
  writeValue(value: string) {
    if (value) {
      this.textArea = value;
      this.updateTextAreaLength(value);
    }
  }

  // override
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  // override
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  // override
  setDisabledState(isDisabled: boolean) {
    this._disabled = isDisabled;
  }

  /**
   *
   * @description
   *
   * Seta o componente como sendo touched após ocorrer evento de blur.
   *
   */
  onBlur() {
    this.onTouched();
  }

  /**
   *
   * @description
   *
   * Atualiza o valor do text-area depois que algum valor for inputado e o usuário sair do campo.
   *
   */
  onChangeTextArea(textArea: string) {
    if (textArea) {
      this.textArea = textArea;
      this.onChange(textArea);
      this.changeValue.emit(textArea);
    } else {
      this.textArea = null;
      this.onChange(null);
      this.changeValue.emit(textArea);
    }
  }

  /**
   *
   * @description
   *
   * Atualiza a quantidade atual de caracteres inputados e a altura do componente toda vez que alguma tecla é digitada dentro do text-area.
   *
   */
  keyUp(e) {
    const value = e.target.value;
    this.updateTextAreaLength(value);
    this.updateTextAreaHeight(value);
    this.onChangeTextArea(value);
  }

  /**
   *
   * @description
   *
   * Atualiza a altura do componente com base no valor atual do text-area.
   * Para isso pega-se o valor e da um split nas quebras de linhas para ver quantas linhas existem.
   * Após, caso o número de linhas seja maior do que o número mínimo atualiza a altura para a atura do componente interno.
   * Caso contrário atualiza a altura para a altura default do compoenent.
   *
   */
  private updateTextAreaHeight(value: string) {
    const lines = value.split(/\r|\r\n|\n/);
    const count = lines.length;

    const textArea = this.textAreaElement.nativeElement;
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';

    if (count > this.rows) {
      textArea.style.height = textArea.scrollHeight + 'px';
    } else {
      textArea.style.height = this.defaultHeight + 'px';
    }
  }

  /**
   *
   * @description
   *
   * Atualiza a quantidade de caracteres inputadas com base no valor atual.
   *
   */
  private updateTextAreaLength(value: string) {
    this.textAreaLength = value.length;
  }
}
