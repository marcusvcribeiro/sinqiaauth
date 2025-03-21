import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultaService } from './../../service/consulta.service';
import { map } from 'rxjs/operators';
import { KeyValue } from '../../model/key-value';
import { SituacaoMensagem } from '../../model/situacao-mensagem';

@Component({
  selector: 'app-situacao-mensagem-dropdown',
  templateUrl: './situacao-mensagem-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SituacaoMensagemDropdownComponent),
      multi: true
    }
  ]
})
export class SituacaoMensagemDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.consultaService.listarSituacaoMensagem().pipe(
      map((values: SituacaoMensagem[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element =>
          keyValue.push(new KeyValue({ id: element.idSituacaoMensagem, descricao: element.descricaoSituacaoMensagem })));
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
