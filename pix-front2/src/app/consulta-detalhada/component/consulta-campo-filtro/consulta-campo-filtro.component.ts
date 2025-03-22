import { Timepicker } from '@albert/ui/lib/components/timepicker/timepicker';
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as _parseDecimalNumber from 'parse-decimal-number';
import { DateFormatHelper } from '../../../shared/helper/date-format-helper';
import { BoletoTipoCampo } from '../../../shared/model/enum/boleto-tipo-campo';
import { FiltroMensagem } from '../../../shared/model/filtro-mensagem';

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ConsultaCampoFiltroComponent),
  multi: true
};

@Component({
  selector: 'app-consulta-campo-filtro',
  templateUrl: './consulta-campo-filtro.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class ConsultaCampoFiltroComponent implements OnInit, ControlValueAccessor {
  @Input() campo: FiltroMensagem;

  tipoCampo = BoletoTipoCampo;
  value = '';
  disabled;
  onChange;
  onTouched;

  constructor() { }

  ngOnInit() { }

  writeValue(obj: any) {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChangeNumber(value: string) {
    const v = _parseDecimalNumber(value);
    if (Number.isNaN(v)) {
      this.onChange(null);
    } else {
      this.onChange(v.toString().replace('.', ','));
    }
  }

  onChangeDate(date: any) {
    if (!date) { return; }
    date = DateFormatHelper.toUrlDate(date);
    this.onChange(date);
  }

  onChangeDateTime(date: any) {
    if (!date || !date.datetime) { return; }
    const v = DateFormatHelper.toUrlDateTime(date.datetime);
    this.onChange(v);
  }

  onChangeTime(time: Timepicker) {
    this.onChange(time.date);
  }
}
