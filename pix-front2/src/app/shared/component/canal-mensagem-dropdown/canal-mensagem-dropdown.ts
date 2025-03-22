import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { KeyValue } from '../../model/key-value';
@Component({
  selector: 'app-canal-mensagem-dropdown',
  templateUrl: './canal-mensagem-dropdown.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CanalMensagemDropdownComponent ),
      multi: true
    }
  ]
})
export class CanalMensagemDropdownComponent implements OnInit {
  keyValues: KeyValue[];
  @Input() clearable: boolean = false;
  @Input() placeholder: string;
  @Input() idSelecionado: number;
  onChange = (value) => { };
  constructor(private translateService: TranslateService) {
  }
  ngOnInit(): void {
    this.keyValues = [
      {
        id: 1,
        descricao: this.translateService.instant('campo.canalMensagemPrimario')
      },
      {
        id: 2,
        descricao: this.translateService.instant('campo.canalMensagemSecundario')
      },
      {
        id: -1,
        descricao: this.translateService.instant('campo.canalMensagemTodos')
      },
    ]
  }
  onValorSelecionado(event: KeyValue) {
    console.log(event);
    if (event && event.id !== -1) {
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