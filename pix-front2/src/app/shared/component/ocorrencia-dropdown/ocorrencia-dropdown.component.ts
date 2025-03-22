import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValue } from '../../model/key-value';
import { LogOcorrenciaService } from 'src/app/consulta-log-ocorrencia/service/log-ocorrencia.service';
import { Ocorrencia } from '../../model/ocorrencia';

@Component({
  selector: 'app-ocorrencia-dropdown',
  templateUrl: './ocorrencia-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => OcorrenciaDropdownComponent),
      multi: true
    }
  ]
})
export class OcorrenciaDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private logOcorrenciaService: LogOcorrenciaService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.logOcorrenciaService.listarOcorrencias().pipe(
      map((values: Ocorrencia[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idOcorrencia, descricao: element.ocorrencia
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
