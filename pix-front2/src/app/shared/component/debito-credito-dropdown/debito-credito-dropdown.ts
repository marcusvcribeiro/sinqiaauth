import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-debito-credito-dropdown',
  templateUrl: './debito-credito-dropdown.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DebitoCreditoDropdownComponent ),
      multi: true
    }
  ]
})
export class DebitoCreditoDropdownComponent implements OnInit {
  keyValues: KeyValue[];
  @Input() clearable: boolean = false;

  onChange = (value) => { };
  constructor(private translateService: TranslateService) {
  }

  ngOnInit(): void {
    this.keyValues = [
      {
        id: 'D',
        descricao: 'D'//this.translateService.instant('campo.debito')
      },
      {
        id: 'C',
        descricao: 'C'//this.translateService.instant('campo.credito')
      }
    ]
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
