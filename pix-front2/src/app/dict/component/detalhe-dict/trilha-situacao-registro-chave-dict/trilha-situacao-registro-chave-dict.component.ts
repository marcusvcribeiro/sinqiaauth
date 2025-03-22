import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng';
import { Observable } from 'rxjs';
import { ChaveDict } from '../../../model/chave-dict';
import { TrilhaSituacaoRegistroChaveDict } from '../../../model/trilha-situacao-registro-chave-dict';
import { DictService } from '../../../service/dict.service';

@Component({
  selector: 'app-trilha-situacao-registro-chave-dict',
  templateUrl: './trilha-situacao-registro-chave-dict.component.html'
})
export class TrilhaSituacaoRegistroChaveDictComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: ChaveDict;

  rows$: Observable<TrilhaSituacaoRegistroChaveDict[]>;

  constructor(
    private dictService: DictService) {
  }

  ngOnInit(): void {
    this.listarTrilhatReivindicacaoDict();
  }

  ngOnChanges() {
    this.listarTrilhatReivindicacaoDict();
  }

  listarTrilhatReivindicacaoDict() {
    this.rows$ = this.dictService.listarTrilhaReivindicacao(this.filtro.idChaveDict);
  }

}
