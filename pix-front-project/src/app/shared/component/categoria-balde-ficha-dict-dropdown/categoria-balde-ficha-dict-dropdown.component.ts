import { Component, forwardRef, OnInit, Input , LOCALE_ID, Inject} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConsultaService } from 'src/app/shared/service/consulta.service';
import { CategoriaBaldeFichaDict } from '../../model/categoria-balde-ficha-dict';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-categoria-balde-ficha-dict-dropdown',
  templateUrl: './categoria-balde-ficha-dict.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CategoriaBaldeFichaDictDropdownComponent),
      multi: true
    }
  ]
})
export class CategoriaBaldeFichaDictDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  @Input() idSelecionado: string;
  @Input() erro: boolean;
  keyValues$: Observable<KeyValue[]>;

  onTouched;

  onChange = (value) => { };

  constructor(@Inject(LOCALE_ID) public locale: string, private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    var internationalNumberFormat = new Intl.NumberFormat(this.locale);
    this.keyValues$ = this.consultaService.listarCategoriaParticipanteDict().pipe(
      map((values: CategoriaBaldeFichaDict[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.id,
          descricao: `${element.id} - tamanho ${internationalNumberFormat.format(element.tamanho)}`
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

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
  }

}
