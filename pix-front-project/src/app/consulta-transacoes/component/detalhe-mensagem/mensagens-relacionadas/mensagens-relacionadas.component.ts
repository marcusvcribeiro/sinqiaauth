import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { BoletagemMensagensRelacionadas, TransacaoMensagensRelacionadasFiltro } from '../../../../shared/model/mensagens-relacionadas';
import { DrawerService } from '@albert/ui';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';

@Component({
  selector: 'app-mensagem-relacionada-tran',
  templateUrl: './mensagens-relacionadas.component.html'
})
export class MensagemRelacionadaComponent implements OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows$: Observable<BoletagemMensagensRelacionadas[]>;

  constructor(private boletagemService: ConsultaTransacaoManualService, private drawerService: DrawerService) { }

  ngOnChanges() {
    this.listarMensagensRelacionadas();
  }

  listarMensagensRelacionadas() {

    if (this.filtroCompleto()) {
      this.rows$ = this.boletagemService.listarMensagensRelacionadas(
        this.filtro.numeroUnicoOperacao,
        this.filtro.numeroUnicoOperacaoOriginal
      );
      
    }
  }

  onVisualizarTransacao(transacao: BoletagemMensagensRelacionadas) {    
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacao }
    });
  }

  filtroCompleto() {
    return this.filtro
      && this.filtro.dataReferencia
      && this.filtro.numeroSequenciaTransacao
      && (this.filtro.numeroUnicoOperacao
      || this.filtro.numeroUnicoOperacaoOriginal);
  }

}
