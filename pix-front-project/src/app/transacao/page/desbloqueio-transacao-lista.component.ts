import { DrawerService } from '@albert/ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Transacao, TransacaoSomaValoresSelecionados } from 'src/app/shared/model/transacao';
import { TransacaoErro } from 'src/app/shared/model/transacao-erro';
import { SinqiaDataSource } from '../../shared/helper/sinqia-data-source';
import { TransacaoService } from '../service/transacao.service';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { AvisoLiberacaoBloqueioDrawerComponent } from '../component/aviso-liberacao-bloqueio-drawer/aviso-liberacao-bloqueio-drawer.component';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { Seg } from '../model/seg';

@Component({
  selector: 'app-desbloqueio-transacao-lista',
  templateUrl: './desbloqueio-transacao-lista.component.html',
  styleUrls: ['desbloqueio-transacao-lista.component.scss']
})
export class DesbloqueioTransacaoListaComponent implements OnInit, OnDestroy {

  public ds: SinqiaDataSource<Transacao>;

  private unsubscribe$ = new Subject();

  total = 0;
  selecionadosTransacao$: Observable<Transacao[]>;

  public readonly somarValoresSelecionados$ = new Subject<TransacaoSomaValoresSelecionados>();

  seg: Seg = new Seg();

  constructor(private transacaoService: TransacaoService,
    private drawerService: DrawerService) { }

  ngOnInit() {
    this.criarDataSource();
    this.somarValoresSelecionados$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(valoresTransacao => {
        if (valoresTransacao.selecionado) {
          this.total += valoresTransacao.valor;
        } else if (this.total > 0) {
          this.total -= valoresTransacao.valor;
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  criarDataSource() {
    this.ds = SinqiaDataSource.of<Transacao>()
      .fromNonPageableService((d) => {
        return this.transacaoService.listarTransacaoBloqueada();
      })
      .multiSelectable()
      .build();
  }

  selecionado(transacao: Transacao) {
    this.ds.selection.toggle(transacao);
    this.somarValoresSelecionados$.next({ valor: transacao.valor, selecionado: this.ds.selection.isSelected(transacao) });
  }

  allSelecionados(transacao: Transacao[]) {
    this.ds.selectAllToggle(transacao);
    this.total = 0;
    for (let i = 0; i < transacao.length; i++) {
      this.somarValoresSelecionados$.next({
        valor: transacao[i].valor,
        selecionado: this.ds.selection.isSelected(transacao[i])
      });
    }
  }

  desbloquearTransacao() {
    const detalheReserva = this.ds.selection.selected;
    const transacoesBloqueadas: Transacao[] = [];
    detalheReserva.forEach((transacao) => {
      const idtransacao = new Transacao({
        numeroSequenciaTransacao: transacao.numeroSequenciaTransacao,
        dataReferencia: transacao.dataReferencia
      });
      transacoesBloqueadas.push(idtransacao);
    });
    this.transacaoService.desbloquearTransacoes(transacoesBloqueadas)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => {
        this.validarLiberacao(v);
        this.total = 0;
        this.ds.selection.clear();
        this.ds.filter();
      });
  }

  visualizarTransacao(transacao: Transacao) {
    const boletagemConsulta = new BoletagemConsulta(transacao);
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacao: boletagemConsulta }
    });
  }

  private validarLiberacao(transacoesResposta: TransacaoErro[]) {
    const transacoes = this.ds.selection.selected;
    const transacoesErro = [];
    for (const transacaoResposta of transacoesResposta) {
      const transacao = transacoes.find((v) => v.numeroSequenciaTransacao === transacaoResposta.numeroSequenciaTransacao);
      if (transacao) {
        const liberarTransacao = Object.assign(transacao, transacaoResposta);
        transacoesErro.push(liberarTransacao);
      }
    }
    this.exibirErrosTransacoes(transacoesErro);
  }

  private exibirErrosTransacoes(transacoes: TransacaoErro[]) {
    if (transacoes.length > 0) {
      this.drawerService.create({
        component: AvisoLiberacaoBloqueioDrawerComponent,
        size: 'small',
        componentProps: { transacoes },
      }
      );
    }
  }
}
