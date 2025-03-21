import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConsultaService } from './../../service/consulta.service';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-tipo-entrada-mensagem-dropdown',
  templateUrl: './tipo-entrada-mensagem-dropdown.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TipoEntradaMensagemDropdownComponent),
      multi: true
    }
  ]
})
export class TipoEntradaMensagemDropdownComponent implements OnInit, ControlValueAccessor {
  keyValues$: Observable<KeyValue[]>;
  @Input() clearable: boolean = false;
  
  onChange = (value) => { };

  constructor(private consultaService: ConsultaService) {
  }

  ngOnInit(): void {
    this.keyValues$ = this.consultaService.listarTipoEntradaMensagem();
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
