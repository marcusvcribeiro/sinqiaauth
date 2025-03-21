import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { BoletagemTrilhaMensagemTransacao } from 'src/app/shared/model/boletagem-trilha-mensagem-transacao';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';

@Component({
  selector: 'app-trilha-mensagem-transacao',
  templateUrl: './trilha-mensagem-transacao.component.html'
})
export class TrilhaMensagemTransacaoComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows: Observable<BoletagemTrilhaMensagemTransacao[]>;

  constructor(private boletagemService: BoletagemConsultaService) { }

  ngOnInit() { }

  ngOnChanges() {
    this.listarTrilhaMensagemTransacao();
  }

  listarTrilhaMensagemTransacao() {
    if (this.filtroCompleto()) {
      this.rows = this.boletagemService.listarTrilhaMensagemTransacao(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }
}
