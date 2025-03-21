import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultaService } from './../../service/consulta.service';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-sistema-dropdown',
  templateUrl: './sistema-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SistemaDropdownComponent),
      multi: true
    }
  ]
})
export class SistemaDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.consultaService.listarSistemaInterno();
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
