import { DialogService, DrawerService } from '@albert/ui';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { DetalheReserva, DetalheReservaSomaValoresSelecionados } from 'src/app/shared/model/detalhe-reserva';
import { Transacao } from 'src/app/shared/model/transacao';
import { TransacaoErro } from 'src/app/shared/model/transacao-erro';
import { TransacaoService } from 'src/app/transacao/service/transacao.service';
import { PosicaoReserva } from '../../../shared/model/posicao-reserva';
import { AcompanhamentoReservaService } from '../../service/acompanhamento-reserva.service';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
// tslint:disable-next-line: max-line-length
import { AvisoLiberacaoBloqueioDrawerComponent } from 'src/app/transacao/component/aviso-liberacao-bloqueio-drawer/aviso-liberacao-bloqueio-drawer.component';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { VerificarMensagemDialogComponent } from 'src/app/shared/component/verificar-mensagem-dialog/verificar-mensagem-dialog.component';

@Component({
  selector: 'app-detalhe-transacoes-drawer',
  templateUrl: './detalhe-transacoes-drawer.component.html',
  styleUrls: ['./detalhe-transacoes-drawer.component.scss']
})
export class DetalheTransacoesDrawerComponent implements OnInit, OnDestroy {
  @Input() posicaoReserva: PosicaoReserva;
  @Input() headerText: string;
  public ds: SinqiaDataSource<DetalheReserva>;
  private unsubscribe$ = new Subject();

  selecionadosDetalheReserva$: Observable<DetalheReserva[]>;
  filtroForm: FormGroup;
  total = 0;
  soma: number;

  public readonly somarValoresSelecionados$ = new Subject<DetalheReservaSomaValoresSelecionados>();

  constructor(
    private drawerService: DrawerService,
    private acompanhamentoReservaService: AcompanhamentoReservaService,
    private transacaoService: TransacaoService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private parametrosGlobaisService: ParametrosGlobaisService
  ) {
  }

  ngOnInit() {
    this.criarFormFiltro();
    this.criarDataSource();
    this.somarValores();
  }

  selecionadoDetalheReserva(detalheReserva: DetalheReserva) {
    this.ds.selection.toggle(detalheReserva);
    this.somarValoresSelecionados$.next({ valor: detalheReserva.valor, selecionado: this.ds.selection.isSelected(detalheReserva) });
  }

  allSelecionadosDetalheReserva(detalheReserva: DetalheReserva[]) {
    this.ds.selectAllToggle(detalheReserva);
    this.total = 0;
    detalheReserva.forEach(element => {
      this.somarValoresSelecionados$.next({
        valor: element.valor,
        selecionado: this.ds.selection.isSelected(element)
      });
    });
  }

  validarLiberacao(transacoesResposta: TransacaoErro[]) {
    const transacoes = this.ds.selection.selected;
    const transacoesErro = [];
    for (const transacaoResposta of transacoesResposta) {
      const transacao = transacoes.find((v) => v.numeroSequencialDaTransacao === transacaoResposta.numeroSequenciaTransacao);
      if (transacao) {
        const liberarTransacao = Object.assign(transacao, transacaoResposta);
        transacoesErro.push(liberarTransacao);
      }
    }
    this.exibirErrosTransacoes(transacoesErro);
  }

  async onVerificarMensagens() {

    const { component } = await this.dialogService.create({
      type: 'custom',
      component: VerificarMensagemDialogComponent,
    });

    component.instance.close.pipe(takeUntil(this.unsubscribe$))
      .subscribe((descricaoMotivo) => {
        this.acompanhamentoReservaService.verificarMensagem(descricaoMotivo);
      });
  }

  onDesbloquearTransacao() {
    const detalheReserva = this.ds.selection.selected;
    const transacoesBloqueadas: Transacao[] = [];
    detalheReserva.forEach((transacao) => {
      const transacaoConvertida = new Transacao({
        numeroSequenciaTransacao: transacao.numeroSequencialDaTransacao,
        dataReferencia: transacao.dataReferencia
      });
      transacoesBloqueadas.push(transacaoConvertida);
    });
    this.transacaoService.desbloquearTransacoes(transacoesBloqueadas)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => this.validarLiberacao(v));
  }

  onBloquearTransacao() {
    const detalheReserva = this.ds.selection.selected;
    const transacoesDesbloqueadas: Transacao[] = [];
    detalheReserva.forEach((transacao) => {
      const transacaoConvertida = new Transacao({
        numeroSequenciaTransacao: transacao.numeroSequencialDaTransacao,
        dataReferencia: transacao.dataReferencia
      });
      transacoesDesbloqueadas.push(transacaoConvertida);
    });
    this.transacaoService.bloquearTransacoes(transacoesDesbloqueadas)
      .pipe(takeUntil(this.unsubscribe$));
  }

  onVisualizarTransacao(detalheReserva: DetalheReserva) {
    const transacao = new BoletagemConsulta({
      dataReferencia: detalheReserva.dataReferencia,
      numeroSequenciaTransacao: detalheReserva.numeroSequencialDaTransacao,
      idMensagem: detalheReserva.evento,
      idTipoMensagem: detalheReserva.idTipoMensagem,
      codigoSistemaParticipante: detalheReserva.codigoSistemaParticipante,
      codigoOperacaoBancariaParticipante: detalheReserva.codigoOperacaoBancariaParticipante,
      numeroOperacao: detalheReserva.numeroOperacao
    });
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacao }
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private criarFormFiltro() {
    this.filtroForm = this.formBuilder.group({
      dataReferencia: [this.parametrosGlobaisService.dataReferenciaDashboard ?  this.parametrosGlobaisService.dataReferenciaDashboard : this.parametrosGlobaisService.dataReferencia]
    });
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<DetalheReserva>()
      .fromNonPageableService((d) => {
        const filtro = this.filtroForm.getRawValue();
        const observableDetalheReserva = this.acompanhamentoReservaService.obterDetalheCampo(this.posicaoReserva.campo, filtro.dataReferencia);
        this.somarValor(observableDetalheReserva);
        return observableDetalheReserva;
      })
      .multiSelectable()
      .build();
  }

  private somarValores() {
    this.somarValoresSelecionados$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(valoresDetalheReserva => {
        if (valoresDetalheReserva.selecionado) {
          this.total += valoresDetalheReserva.valor;
        } else if (this.total > 0) {
          this.total -= valoresDetalheReserva.valor;
        }
      });
  }
  private somarValor(reservas: Observable<DetalheReserva[]>) {
    reservas.subscribe(arrayReserva => 
      this.soma = arrayReserva.map(e => e.valor)
      .reduce((soma, value) => soma + value, 0));
  }

  private exibirErrosTransacoes(transacoes: TransacaoErro[]) {
    if (transacoes.length > 0) {
      this.drawerService.create({
        component: AvisoLiberacaoBloqueioDrawerComponent,
        size: 'medium',
        componentProps: {
          transacoes
        }
      }
      );
    }
  }

}
