import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';

@Component({
  selector: 'app-trilha-mensagem-tran',
  templateUrl: './trilha-mensagem.component.html'
})
export class TrilhaMensagemComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows: Observable<any>;

  constructor(private boletagemService: ConsultaTransacaoManualService) { }

  ngOnInit() { }

  ngOnChanges() {
    this.listarTrilhaMensagem();
  }

  listarTrilhaMensagem() {
    if (this.filtroCompleto()) {
      this.rows = this.boletagemService.listarTrilhaMensagem(this.filtro);
    }
  }

  filtroCompleto() {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }
}
