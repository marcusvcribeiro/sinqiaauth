import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsultaMensagemService } from 'src/app/consulta-mensagem/service/consulta-mensagem.service';
import { EntidadeParticipante } from '../../model/entidade-participante';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-entidade-dropdown',
  templateUrl: './entidade-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EntidadeDropdownComponent),
      multi: true
    }
  ]
})
export class EntidadeDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  @Input() idSelecionado: number;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private consultaMensagemService: ConsultaMensagemService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.consultaMensagemService.listarEntidades().pipe(
      map((values: EntidadeParticipante[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idEntidadeParticipante, descricao: element.nomeEntidadeParticipante
        })));
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
