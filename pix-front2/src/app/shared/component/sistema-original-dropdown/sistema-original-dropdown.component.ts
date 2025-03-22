import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { KeyValue } from '../../model/key-value';
import { ConsultaService } from '../../service/consulta.service';

@Component({
  selector: 'app-sistema-original-dropdown',
  templateUrl: './sistema-original-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SistemaOriginalDropdownComponent),
      multi: true
    }
  ]
})
export class SistemaOriginalDropdownComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() clearable: boolean = false;
  keyValues$: Observable<KeyValue[]>;

  onChange = (value) => { };

  constructor(private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.consultaService.listarSistemaOrigem();
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
