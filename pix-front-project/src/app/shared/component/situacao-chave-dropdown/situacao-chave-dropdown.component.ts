import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValue } from '../../model/key-value';
import { DictService } from 'src/app/dict/service/dict.service';
import { SituacaoChaveDict } from 'src/app/dict/model/situacao-chave-dict';

@Component({
  selector: 'app-situacao-chave-dropdown',
  templateUrl: './situacao-chave-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SituacaoChaveDropdownComponent),
      multi: true
    }
  ]
})
export class SituacaoChaveDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;
  @Input() idSelecionado: number;

  onChange = (value) => { };

  constructor(private dictService: DictService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.dictService.listarSituacoes().pipe(
      map((values: SituacaoChaveDict[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idTipoSituacaoDict, descricao: element.descricaoTipoSituacaoDict
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
