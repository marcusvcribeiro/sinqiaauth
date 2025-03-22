import { ToastService } from '@albert/ui';
import { Timepicker } from '@albert/ui/lib/components/timepicker/timepicker';
import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { BoletoTag } from 'src/app/shared/model/boleto';
import { BoletoTipoCampo } from 'src/app/shared/model/enum/boleto-tipo-campo';

const CUSTOM_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => BoletoCampoComponent),
  multi: true
};

@Component({
  selector: 'app-boleto-campo',
  templateUrl: './boleto-campo.component.html',
  providers: [CUSTOM_VALUE_ACCESSOR]
})
export class BoletoCampoComponent implements ControlValueAccessor {
  @Input() tag: BoletoTag;

  @Input() erro: boolean;

  @Output() valueChanged = new EventEmitter();

  _filled = new BehaviorSubject<boolean>(false);

  tipoCampo = BoletoTipoCampo;
  value = null;
  disabled;

  onChange;
  onTouched;
  
  list = [];
  
  get filled(): Observable<boolean> {
    return this._filled.asObservable();
  }

  constructor(private ngSelectConfig: NgSelectConfig, private translateService: TranslateService, private toastService: ToastService) {
    this.ngSelectConfig.notFoundText = this.translateService.instant('validacoes.naoEncontrado');
  }

  writeValue(obj: any) {
    if (obj) {
      if (this.tag.tipoCampo === BoletoTipoCampo.DATE || this.tag.tipoCampo === BoletoTipoCampo.DATETIME) {
        this.value = new Date(obj.replace('Z', ''));
      } else {
        this.value = obj;
      }
      this._filled.next(!!this.value);
    }

    if(this.tag.dominioTags.length > 0){
      this.tag.dominioTags.forEach(x => {
        this.list.push({
          label: x.id +' - '+ x.descricao,
          key: x.id
        })
      })
    }
  }

  verificaCampoSelect() {
    this.tag.tipoCampo = this.isSelect() ? BoletoTipoCampo.SELECT : this.tag.tipoCampo;
  }

  isSelect(): boolean {
    return this.tag.dominioTags.length > 0;
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

  change(v) {
    if(v.length < this.tag.qtdMinimaCaracter){
      this.toastService.create({
        type: 'error',
        text: this.translateService.instant('validacoes.minimoCaracteresInvalido') + this.translateService.instant(' O tamanho mínimo do campo '+ this.tag.labelCampo+ ' é '+ this.tag.qtdMinimaCaracter)
      });
      this.erro = true;
    }
    this._filled.next(!!v);
    this.onChange(v);
    this.valueChanged.emit(v);
  }

  onChangeDate(date: any) {
    if (!date || !date.date) { return; }
    const v = DateFormatHelper.toUrlDate(date.date);
    this._filled.next(!!v);
    this.onChange(v);
    this.valueChanged.emit(v);
  }

  onChangeDateTime(date: any) {
    if (!date || !date.datetime) { return; }
    const v = DateFormatHelper.toUrlDateTime(date.datetime);
    this._filled.next(!!v);
    this.onChange(v);
    this.valueChanged.emit(v);
  }

  onChangeTime(time: Timepicker) {
    let v = null;
    if (time) {
      v = time.string + '.000Z';
    }
    this.onChange(v);
    this.valueChanged.emit(v);
  }

  onChangeSelect(event) {
    this.change(event ? event.key : null);
  }

  keyPress(event: any) {
    if( this.tag.dscMascara!==undefined && this.tag.dscMascara!==null){
      const pattern =  new RegExp(this.tag.dscMascara);
      let inputChar = String.fromCharCode(event.charCode);
        if (event.keyCode != 8 && !pattern.test(inputChar)) {
          event.preventDefault();
        }
    }
    else {
        const pattern = /[0-9\+\-\ ]/;
        let inputChar = String.fromCharCode(event.charCode);
        event.preventDefault();
        }
  }

  keyPressMaskFromTag(event: any) {
    if( this.tag.dscMascara!==undefined && this.tag.dscMascara!==null){
      const pattern =  new RegExp(this.tag.dscMascara);
      let inputChar = String.fromCharCode(event.charCode);
      if (event.keyCode != 8 && !pattern.test(inputChar)) {
        event.preventDefault();
      }
    }
  }


}
