import { DrawerService } from '@albert/ui';
import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { AgrupadorMensagemTarifada } from 'src/app/shared/model/enum/agrupador-mensagem-tarifada';
import { GrupoComposicaoOperacao } from 'src/app/shared/model/enum/grupo-composicao-operacao';
import { MensagemTarifadaFiltroDTO } from 'src/app/shared/model/mensagem-tarifada-filtro';
import { MensagemTarifadaGrupoDTO } from 'src/app/shared/model/mensagem-tarifada-grupo';
import { MensagemTarifadaItemDTO } from 'src/app/shared/model/mensagem-tarifada-item';
import Seg from '../../model/seg';
import { ConciliacaoMensagemService } from '../../service/conciliacao-mensagem.service';

@Component({
  selector: 'app-conciliacao-mensagens-tarifadas',
  templateUrl: './conciliacao-mensagens-tarifadas.component.html',
  styleUrls: ['./conciliacao-mensagens-tarifadas.component.scss']
})
export class ConciliacaoMensagensTarifadasComponent implements OnInit {
  @Input() dataInicio: Date;
  @Input() dataFim: Date;
  @Input() grupoMensagemTarifada: MensagemTarifadaGrupoDTO;
  @Input() dadosTreeNode: TreeNode[];

  seg: Seg = new Seg();
  public treeTableLoading = false;

  private unsubscribe$ = new Subject();
  private mensagemTarifadaFiltro: MensagemTarifadaFiltroDTO = new MensagemTarifadaFiltroDTO();

  constructor(private conciliacaoMensagensService: ConciliacaoMensagemService,
    private drawerService: DrawerService) { }

  ngOnInit() {
  }

  collapseAll() {
    this.dadosTreeNode.forEach(linha => {
      this.expandRecursive(linha, false);
    });
  }

  private expandRecursive(linha: TreeNode, isExpand: boolean) {
    linha.expanded = isExpand;

    if (linha.children) {
      linha.children.forEach(linhaFilha => {
        this.expandRecursive(linhaFilha, isExpand);
      });
    }
  }

  expandir(rowNode: any) {
    this.adicionarFiltro(rowNode.node.data);
    if (Object.keys(rowNode.node.children[0].data).length === 0) {
      this.buscarItensMensagemTarifada(rowNode.node);
    }
  }

  buscarItensMensagemTarifada(node) {
    this.treeTableLoading = true;
    this.conciliacaoMensagensService
      .listarItemMensagenTarifada(this.dataInicio, this.dataFim, this.mensagemTarifadaFiltro)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(mensagensPaginadas => {
        node.children = mensagensPaginadas.content.map(m => ({ data: m }));
        this.treeTableLoading = false;
        this.dadosTreeNode = [...this.dadosTreeNode];
      });
  }

  onVisualizarTransacao(mensagem: MensagemTarifadaItemDTO) {
    const transacao = new BoletagemConsulta({
      dataReferencia: mensagem.dataReferencia,
      numeroSequenciaTransacao: mensagem.sequenciaTransacao,
      idMensagem: mensagem.idEventoMensagem,
      idTipoMensagem: mensagem.idTipoMensagem,
      codigoSistemaParticipante: mensagem.codigoSistemaParticipante,
      codigoOperacaoBancariaParticipante: mensagem.codigoOperacaoBancariaParticipante,
      numeroOperacao: mensagem.numeroOperacao
    });
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacao }
    });
  }


  private adicionarFiltro(data: any) {
    if (data.agrupador === AgrupadorMensagemTarifada.QUANTIDADE) {
      this.mensagemTarifadaFiltro.tipoAgrupador = GrupoComposicaoOperacao.CONTROLE_GESTAO_CONTA_PI;
      return;
    }
    if (data.agrupador === AgrupadorMensagemTarifada.TAMANHO) {
      this.mensagemTarifadaFiltro.tipoAgrupador = GrupoComposicaoOperacao.TESTE_TARIFACAO;
      return;
    }
  }
}
