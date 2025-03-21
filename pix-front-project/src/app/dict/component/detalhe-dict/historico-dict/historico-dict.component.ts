import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng';
import { Observable } from 'rxjs';
import { ChaveDict } from '../../../model/chave-dict';
import { DetalheChaveDict } from '../../../model/detalhe-chave-dict';
import { DictService } from '../../../service/dict.service';

@Component({
  selector: 'app-historico-dict',
  templateUrl: './historico-dict.component.html',
})
export class HistoricoDictComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: ChaveDict;

  rows$: Observable<DetalheChaveDict[]>;

  constructor(
    private dictService: DictService) {
  }

  ngOnInit(): void {
    this.listarDetalheDict();
  }

  ngOnChanges() {
    this.listarDetalheDict();
  }

  listarDetalheDict() {
    this.rows$ = this.dictService.listarDetalheDict({ idChaveDict: this.filtro.idChaveDict});
  }

}
