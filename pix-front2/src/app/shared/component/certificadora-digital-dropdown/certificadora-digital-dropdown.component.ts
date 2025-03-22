import { Component, forwardRef, OnInit, Input} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfiguracaoService } from '../../../configuracao/service/configuracao.service';
import { CertificadoraDigital } from '../../model/certificadora-digital';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-certificadora-digital-dropdown',
  templateUrl: './certificadora-digital-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CertificadoraDigitalDropdownComponent),
      multi: true
    }
  ]
})
export class CertificadoraDigitalDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  @Input() idSelecionado: number;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private configuracaoService: ConfiguracaoService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.configuracaoService.listarCertificadoraDigital().pipe(
      map((values: CertificadoraDigital[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.id, descricao: element.nome
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

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }


}
