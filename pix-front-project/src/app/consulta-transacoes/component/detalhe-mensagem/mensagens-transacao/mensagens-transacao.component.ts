import { DrawerService } from '@albert/ui';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng';
import { Observable } from 'rxjs';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';

@Component({
  selector: 'app-mensagem-transacao-tran',
  templateUrl: './mensagens-transacao.component.html',
})
export class MensagemTransacaoComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows$: Observable<MensagemTransacao[]>;

  constructor(
    private boletagemService: ConsultaTransacaoManualService,
    private drawerService: DrawerService) {
  }

  ngOnInit(): void {
    this.listarMensagensTransacao();
  }

  ngOnChanges() {
    this.listarMensagensTransacao();
  }

  listarMensagensTransacao() {
    if (this.filtroCompleto()) {
      this.rows$ = this.boletagemService
        .listarMensagemTransacao(this.filtro);
    }
  }

  onVisualizarTransacao(transacaoRelacionada: MensagemTransacao) {
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacaoRelacionada }
    });
  }

  filtroCompleto(): boolean {
    return !!this.filtro
      && !!this.filtro.dataReferencia
      && !!this.filtro.numeroSequenciaTransacao;
  }
}
