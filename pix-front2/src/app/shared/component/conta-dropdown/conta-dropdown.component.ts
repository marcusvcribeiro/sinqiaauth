import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValue } from '../../model/key-value';
import { DictService } from 'src/app/dict/service/dict.service';
import { TipoDonoDict } from 'src/app/dict/model/tipo-dono-dict';
import { TipoContaDict } from 'src/app/dict/model/tipo-conta-dict';

@Component({
  selector: 'app-conta-dropdown',
  templateUrl: './conta-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContaDropdownComponent),
      multi: true
    }
  ]
})
export class ContaDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private dictService: DictService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.dictService.listarTipoConta().pipe(
      map((values: TipoContaDict[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idTipoConta, descricao: element.descricaoTipoConta
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
