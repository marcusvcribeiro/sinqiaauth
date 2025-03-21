import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { KeyValue } from '../../model/key-value';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-canal-mensagem-dropdown',
  templateUrl: './canal-mensagem-dropdown.component.html',
  styleUrls: ['./canal-mensagem-dropdown.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CanalMensagemDropdownComponent),
    multi: true
  }]
})
export class CanalMensagemDropdownComponent implements OnInit {
  
  keyValues: KeyValue[];

  @Input() clearable: boolean = false;
  @Input() placeholder: string;
  @Input() idSelecionado: number;
  @Input() mostrarOpcaoTodos: boolean = true;

  onChange = (value) => { };
  constructor(private translateService: TranslateService) { }

  ngOnInit(): void {
    this.keyValues = [
      {
        id: 1,
        descricao: this.translateService.instant('campo.canalMensagemPrimario')
      },
      {
        id: 2,
        descricao: this.translateService.instant('campo.canalMensagemSecundario')
      }
    ]
  }

  onValorSelecionado(event: KeyValue) {
    this.onChange(event?.id);
  }

  writeValue(obj: any): void { }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }
}
