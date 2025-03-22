import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { KeyValue } from '../../model/key-value';
import { ApuracaoDadosInformesBacenService } from 'src/app/apuracao-dados-informes-bacen/service/apuracao-dados-informes-bacen.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-indicador-dropdown',
  templateUrl: './indicador-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IndicadorDropdownComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: IndicadorDropdownComponent,
      multi: true
    }
  ]
})
export class IndicadorDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() idSelecionado: number;
  @Input() clearable: boolean = false;
  indicadores$: Observable<KeyValue[]>;
  required: boolean;

  onChange = (value) => { };

  constructor(private apuracaoDadosInformesBacenService: ApuracaoDadosInformesBacenService) {
  }

  ngOnInit(): void {
    this.listarIndicador();
  }

  private listarIndicador() {
    this.indicadores$ = this.apuracaoDadosInformesBacenService.listarIndicador().pipe(
      map((values: any[]) => {
        const keyValue: KeyValue[] = [];
        values.forEach(element => keyValue.push(new KeyValue({
          id: element.key, descricao: element.value
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

  validate(control: FormControl) {
    this.required = control.errors.required;
  }
}
