import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyValue } from '../../model/key-value';
import { ComposicaoOperacaoService } from '../../service/composicao-operacao.service';
import { map } from 'rxjs/operators';
import { ComposicaoOperacao } from '../../model/composicao-operacao';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-composicao-operacao-dropdown',
  templateUrl: './composicao-operacao-dropdown.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ComposicaoOperacaoDropdownComponent ),
      multi: true
    }
  ]
})
export class ComposicaoOperacaoDropdownComponent implements OnInit {
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };
  constructor(private composicaoOperacaoService: ComposicaoOperacaoService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.composicaoOperacaoService.listarComposicaoOperacoes(null)
    .pipe(map((values: ComposicaoOperacao[]) => {
      const keyValue: KeyValue[] = [];
      values
        .forEach(element => keyValue.push(new KeyValue({ id: element.numeroOperacao, descricao: element.descricaoResumida })));
      return keyValue;
    }));
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
