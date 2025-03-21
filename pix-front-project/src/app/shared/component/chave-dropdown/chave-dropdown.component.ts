import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CertificadoDigitalService } from 'src/app/certificado-digital/service/certificado-digital.service';
import { KeyValue } from '../../model/key-value';
import { FinalidadeCertificadoDigital } from '../../model/finalidade-certificado-digital';
import { DictService } from 'src/app/dict/service/dict.service';
import { TipoChaveDict } from 'src/app/dict/model/tipo-chave-dict';

@Component({
  selector: 'app-chave-dropdown',
  templateUrl: './chave-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChaveDropdownComponent),
      multi: true
    }
  ]
})
export class ChaveDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private dictService: DictService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.dictService.listarTipoChave().pipe(
      map((values: TipoChaveDict[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idTipoChaveDict, descricao: element.descricaoTipoChaveDict
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
