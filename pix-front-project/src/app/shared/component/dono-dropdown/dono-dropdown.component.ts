import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { KeyValue } from '../../model/key-value';
import { DictService } from 'src/app/dict/service/dict.service';
import { TipoDonoDict } from 'src/app/dict/model/tipo-dono-dict';

@Component({
  selector: 'app-dono-dropdown',
  templateUrl: './dono-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DonoDropdownComponent),
      multi: true
    }
  ]
})
export class DonoDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private dictService: DictService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.dictService.listarTipoDono().pipe(
      map((values: TipoDonoDict[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idTipoDonoDict, descricao: element.descricaoTipoDonoDict
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
