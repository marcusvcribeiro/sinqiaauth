import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { KeyValue } from '../../model/key-value';

@Component({
  selector: 'app-generic-dropdown',
  templateUrl: './generic-dropdown.component.html'
})
export class GenericDropdownComponent implements OnChanges, OnInit {
  @Input() valores: KeyValue[];
  @Input() placeholder: string;
  @Input() required = false;
  @Input() idSelected: any;
  @Input() clearable: boolean = false;
  @Output() valorSelecionado: EventEmitter<KeyValue> = new EventEmitter();
  @Input() disabled = false;

  value: number | string;
  lista$: Observable<KeyValue[]>;

  constructor(private ngSelectConfig: NgSelectConfig, private translateService: TranslateService) {
    this.ngSelectConfig.notFoundText = this.translateService.instant('validacoes.naoEncontrado');
  }

  ngOnInit(): void {
    this.itemFixo();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.disabled) {
      this.itemFixo();
    } else {
      const { idSelected } = changes;
      if (idSelected && idSelected.currentValue && idSelected.previousValue !== idSelected.currentValue) {
        const valorSelectionado = idSelected.currentValue.id ? idSelected.currentValue.id : idSelected.currentValue;
        this.value = valorSelectionado;
      }
    }

  }

  private itemFixo() {
    if (this.idSelected && this.valores) {
      const valorSelectionado = this.valores.find(v => v.id === this.idSelected);
      this.value = valorSelectionado.id;
    }
  }

  onChange(event) {
    this.valorSelecionado.emit(event);
  }
}
