import { DrawerService } from '@albert/ui';
import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng';
import { Observable } from 'rxjs';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { PixNaoCreditadoCCO } from 'src/app/shared/model/pix-nao-creditado-cco';
import { PixRecebidoNaoCreditadoService } from '../../service/pix-recebido-nao-creditado.service';
import { PixNaoCreditadoFiltroTransacao } from 'src/app/shared/model/pix-nao-creditado-filtro-transacao';

@Component({
  selector: 'app-detalhe-mensagem-transacao',
  templateUrl: './detalhe-mensagem-transacao.component.html',
  styleUrls: ['./detalhe-mensagem-transacao.component.scss']
})
export class DetalheMensagemTransacaoComponent implements OnInit, OnChanges {
  @ViewChild(Table) pTable: Table;
  @Input() filtro: PixNaoCreditadoFiltroTransacao;
  @Input() mensagem : PixNaoCreditadoCCO;

  rows$: Observable<MensagemTransacao[]>;

  constructor(
    private service: PixRecebidoNaoCreditadoService,
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
      this.rows$ = this.service
        .listarMensagemTransacao(this.converter(this.mensagem));
    }
  }
  converter(dados: PixNaoCreditadoCCO): PixNaoCreditadoFiltroTransacao {
    if (dados) {
      return {
        dataRefTra: dados.dataRefTra,
        numSeqTra: dados.numSeqTra
        
      };
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
    return !!this.mensagem
      && !!this.mensagem.dataRefTra
      && !!this.mensagem.numSeqTra;
  }
}
