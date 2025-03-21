import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CertificadoDigitalService } from 'src/app/certificado-digital/service/certificado-digital.service';
import { KeyValue } from '../../model/key-value';
import { SituacaoCertificadoDigital } from '../../model/situacao-certificado-digital';

@Component({
  selector: 'app-situacao-certificado-dropdown',
  templateUrl: './situacao-certificado-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SituacaoCertificadoDropdownComponent),
      multi: true
    }
  ]
})
export class SituacaoCertificadoDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private certificadoDigitalService: CertificadoDigitalService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.certificadoDigitalService.listarSituacoesCertificados().pipe(
      map((values: SituacaoCertificadoDigital[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.idSituacaoCertificadoDigital, descricao: element.descricaoSituacaoCertificadoDigital
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
