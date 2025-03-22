import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { KeyValue } from '../../model/key-value';
import { ComposicaoOperacaoService } from '../../service/composicao-operacao.service';

@Component({
  selector: 'app-sistema-composicao-dropdown',
  templateUrl: './sistema-composicao-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SistemaComposicaoDropdownComponent),
      multi: true
    }
  ]
})
export class SistemaComposicaoDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  keyValues$: Observable<KeyValue[]>;
  @Input() clearable: boolean = false;
  @Input() idSelecionado: number;

  onChange = (value) => { };

  constructor(private composicaoOperacaoService: ComposicaoOperacaoService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.composicaoOperacaoService.listarSistema();
  }

  onValorSelecionado(event: KeyValue) {
    if (event) {
      this.onChange(event.id);
    } else {
      this.onChange(null);
    }
  }

  writeValue(obj: any): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
