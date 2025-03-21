import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { BoletagemConsultaService } from '../../../../boletagem-consulta/service/boletagem.service';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { BoletagemMensagensRelacionadas, TransacaoMensagensRelacionadasFiltro } from '../../../../shared/model/mensagens-relacionadas';
import { DrawerService } from '@albert/ui';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';

@Component({
  selector: 'app-mensagem-relacionada',
  templateUrl: './mensagens-relacionadas.component.html'
})
export class MensagemRelacionadaComponent implements OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  rows$: Observable<BoletagemMensagensRelacionadas[]>;

  constructor(private boletagemService: BoletagemConsultaService, private drawerService: DrawerService) { }

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
