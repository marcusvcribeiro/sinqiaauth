import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { BoletagemTrilhaTransacao } from '../../../../shared/model/boletagem-trilha-transacao';


@Component({
  selector: 'app-trilha-transacao-manual',
  templateUrl: './trilha-transacao.component.html'
})
export class TrilhaTransacaoComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows$: Observable<BoletagemTrilhaTransacao[]>;

  constructor(private boletagemService: ConsultaTransacaoManualService) { }

  ngOnInit() { }

  ngOnChanges() {
    this.obterTrilhaTransacao();
  }

  obterTrilhaTransacao() {
    if (this.filtroCompleto()) {
      this.rows$ = this.boletagemService.listarTrilhaTransacao(this.filtro);
    }
  }

  filtroCompleto(): boolean {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }
}
