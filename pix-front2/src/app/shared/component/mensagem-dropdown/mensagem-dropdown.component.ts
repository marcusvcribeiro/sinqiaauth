import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValue } from '../../model/key-value';
import { Mensagem } from '../../model/mensagem';
import { ComposicaoOperacaoService } from '../../service/composicao-operacao.service';

@Component({
  selector: 'app-mensagem-dropdown',
  templateUrl: './mensagem-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MensagemDropdownComponent),
      multi: true
    }
  ]
})
export class MensagemDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder;
  @Input() clearable: boolean = false;
  @Input() groupMensagem: boolean = false;
  keyValues$: Observable<KeyValue[]>;
  value: KeyValue;

  constructor(private composicaoOperacaoService: ComposicaoOperacaoService) {
  }

  ngOnInit() {
    this.keyValues$ = this.composicaoOperacaoService.listarMensagens().pipe(
      map((values: Mensagem[]) => {
        const keyValue: KeyValue[] = [];
        if(!this.groupMensagem){
          values.forEach(element => keyValue.push(new KeyValue({
            id: element.codigoMensagem, descricao: element.codigoMensagem + ' - ' + element.descricao
          })));          
        } else {
          values.forEach(element => {
            const duplicated = keyValue.findIndex(redItem => {
              return element.codigoMensagem.substring(0, 4) === redItem.id;
            }) > -1;

            if (!duplicated) {
              keyValue.push(new KeyValue({
                id: element.codigoMensagem.substring(0, 4), descricao: element.codigoMensagem.substring(0, 4)
              }))
            }
          });
        }        
        return keyValue;  
        
      })
    );
  }

  onValorSelecionado(event: KeyValue) {
    if (event) {
      this.onChange(event.id);
    } else {
      this.onChange(null);
    }
  }

  onChange = (value) => { };

  writeValue(obj: any): void {
    this.value = new KeyValue({ id: obj, descricao: null });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
  }
}
