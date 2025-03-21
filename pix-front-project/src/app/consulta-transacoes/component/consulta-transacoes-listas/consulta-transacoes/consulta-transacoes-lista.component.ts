import { DialogService, DrawerService, ToastService } from '@albert/ui';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConsultaTransacaoManualService } from 'src/app/consulta-transacoes/service/consulta-transacao-manual.service';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { BoletagemConsultaFiltro } from 'src/app/shared/model/boletagem-consulta-filtro';
import { Operacao } from 'src/app/shared/model/enum/operacao';
import { TipoBoletagem } from 'src/app/shared/model/enum/tipo-boletagem.enum';
import { ListResult } from 'src/app/shared/model/list-result';
import { Prioridade } from 'src/app/shared/model/prioridade';
import { TransacaoID } from 'src/app/shared/model/transacao';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Campo } from 'src/app/shared/helper/filter-condition-builder';
import { Condicao } from 'src/app/shared/model/enum/condicao';
import { BoletoComponent } from 'src/app/boleto/component/edicao/boleto/boleto.component';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import { TipoEstadoTransacao } from '../../../../shared/model/enum/tipo-estrado-transacao';
import { Seg } from 'src/app/boletagem-consulta/model/seg';
import { ConsultaTransacaoManual } from 'src/app/shared/model/consulta-transacao-manual';
import { ConsultaTransacaoFiltro } from 'src/app/shared/model/consulta-transacao-filtro';

@Component({
  selector: 'app-consulta-transacoes-lista',
  templateUrl: './consulta-transacoes-lista.component.html',
  styleUrls: ['./consulta-transacoes-lista.component.scss']
})
export class ConsultaTransacoesComponent implements OnInit, OnChanges, OnDestroy {
  @Input() isModelo = false;
  @Input() filtro: BoletagemConsultaFiltro;
  @Input() tipoBoletagem: TipoBoletagem;
  @Output() selecionados: EventEmitter<BoletagemConsulta[]> = new EventEmitter();
  @Output() mensagemSelecionada = new EventEmitter();
  @Output() keyPressed = new EventEmitter();


  condicaoTipo: Campo;
  public ds: SinqiaDataSource<ConsultaTransacaoManual>;
  filtroForm: FormGroup;
  listResult: ListResult<ConsultaTransacaoManual>;

  TipoBoletagem = TipoBoletagem;
  TipoEstadoTransacao = TipoEstadoTransacao;

  private unsubscribe$ = new Subject();

  seg: Seg = new Seg();

  constructor(
    private boletagemService: ConsultaTransacaoManualService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private toastService: ToastService,
    private drawerService: DrawerService) {
  }

  shortcuts = [];

  ngOnInit() {
    this.criarFiltroTabela();
    this.criarDataSource();
    
  }

  onKeyDown(event: KeyboardEvent) {
    switch(event.key){
      case 'Enter':
        this.keyPressed.emit();
        break;
      case 'Escape': 
        (event.target as HTMLInputElement).blur(); 
        break;
    }
  }


  ngOnChanges(change: SimpleChanges) {
    const { filtro } = change;
    if (filtro && this.ds) {
      this.filtro.situacaoTransacao = this.tipoBoletagem;
      this.filtroForm.patchValue(this.filtro);
      this.ds.filter();
    }
  }

  criarDataSource() {
    this.ds = SinqiaDataSource.of<ConsultaTransacaoManual>()
      .withFilter(this.filtroForm)
      .fromService((d: any) =>
        this.boletagemService.listarMensagem(d, this.filtroForm.getRawValue(), this.condicaoTipo))
      .multiSelectable()
      .build();
  }


  criarFiltroTabela() {

    const filtroEntrada = new ConsultaTransacaoFiltro({ ...this.filtro, situacaoTransacao: this.tipoBoletagem });

    this.filtroForm = this.formBuilder.group({
      // Filtros por colunas
      sequencia: [],
      idCanalMensagem: [],
      estadoTransacao: [],
      situacaoMensagem: [],
      agencia: [],
      conta: [],
      dataReferencia: [],
      codigo: [],
      dataInclusao: [],
      dataAgendamento: [],
      valorFinanceiro: [],
      composicaoOperacao: [],
      nomeModeloMensagem: [],
      dataMovimento: [],
      operacaoBancaria: [],
      sistema: [],
      usuarioUltimaManutencao: [],
      dataUltimaManutencao: [],
      usuarioInclusao: [],
      quantidadeAutorizacao: [],
      prioridade: [],
      numeroUnicoOperacao: [],
      numeroUnicoOperacaoOriginal: [],
      numeroControleMensagem: [],
      tipoEntradaMensagem: [],
      dataUltimoProcessamentoEmissor: [],
      numeroControleIF: [],
      idTransacaoCob: [],
      nomeUsuarioDesbloqueio: [],
      debitoCredito: [],

      // Filtros por pesquisa
      dataReferenciaInicio: [filtroEntrada.dataReferenciaInicio, Validators.required],
      dataReferenciaFim: [filtroEntrada.dataReferenciaFim, Validators.required],
      situacaoTransacao: [filtroEntrada.situacaoTransacao],
      mensagem: [filtroEntrada.mensagem],
      valorInicio: [filtroEntrada.valorInicio],
      valorFim: [filtroEntrada.valorFim],
      idSituacaoMensagem: [filtroEntrada.idSituacaoMensagem],
      canalMensagem: [filtroEntrada.canalMensagem],
    });
    if (this.isModelo) {
      this.condicaoTipo = { campo: 'MODELO', operador: Condicao.DIFERENTE, valor: '' };
    } else {
      this.condicaoTipo = { campo: 'MODELO', operador: Condicao.IGUAL, valor: '' };
    }
  }

  onMensagemSelecionada(transacao: BoletagemConsulta) {
    this.mensagemSelecionada.emit(transacao);
  }

  onDeletar({ numeroSequenciaTransacao, dataReferencia }: BoletagemConsulta) {
    this.dialogService.create({
      type: 'confirm',
      message: this.translateService.instant('validacoes.excluirMensagem'),
      title: this.translateService.instant('titulo.excluirMensagem'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.boletagemService.excluirMensagem([new TransacaoID({ dataReferencia, numeroSequenciaTransacao })]).subscribe(success => {
          this.toastService.create({
            type: 'success',
            text: this.translateService.instant('mensagem.excluirSucesso'),
          });
          this.ds.filter();
        });
      }
    });
  }

  onCancelar({ numeroSequenciaTransacao, dataReferencia }: BoletagemConsulta) {
    this.dialogService.create({
      type: 'confirm',
      message: this.translateService.instant('validacoes.cancelarMensagem'),
      title: this.translateService.instant('titulo.cancelarMensagem'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.boletagemService.cancelarTransacao([new TransacaoID({ dataReferencia, numeroSequenciaTransacao })]).subscribe(success => {
          this.toastService.create({
            type: 'success',
            text: this.translateService.instant('mensagem.cancelarSucesso'),
          });
          this.ds.filter();
        });
      }
    });
  }

  onLiberar({ numeroSequenciaTransacao, dataReferencia, idMensagem }: BoletagemConsulta) {
    this.dialogService.create({
      type: 'confirm',
      message: this.translateService.instant('validacoes.liberarMensagem'),
      title: this.translateService.instant('titulo.liberarMensagem'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.boletagemService.liberarBoleto([{ numeroSequenciaTransacao, dataReferencia, idMensagem }]).subscribe(success => {
          this.toastService.create({
            type: 'success',
            text: this.translateService.instant('mensagem.liberarSucesso'),
          });
          this.ds.filter();
        });
      }
    });
  }

  // async onDefinirPrioridade({ dataReferencia, numeroSequenciaTransacao }: BoletagemConsulta) {
  //   const { component } = await this.dialogService.create({
  //     type: 'custom',
  //     component: DefinirPrioridadeComponent,
  //   });

  //   component.instance.close.pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((idPrioridade) => {
  //       if (idPrioridade != null) {
  //         const alterarPrioridade = new Prioridade({});
  //         alterarPrioridade.idTipoPrioridade = idPrioridade;
  //         alterarPrioridade.transacoes = [new TransacaoID({ dataReferencia, numeroSequenciaTransacao })];

  //         this.boletagemService.definirPrioridade(alterarPrioridade).subscribe(success => {
  //           this.toastService.create({
  //             type: 'success',
  //             text: this.translateService.instant('mensagem.definirPrioridadeSucesso'),
  //           });
  //         });
  //         this.ds.filter();
  //       }
  //     });
  // }

  abrirBoleto(transacao: BoletagemConsulta, operacao: Operacao, titulo: string) {
    this.drawerService.create({
      component: BoletoComponent,
      size: 'large',
      title: this.translateService.instant(titulo),
      componentProps: {
        transacao,
        operacao
      }
    });
  }

  onEditarBoleto(transacao: BoletagemConsulta) {
    const tituloDrawer = 'titulo.editarBoleto';
    this.abrirBoleto(transacao, Operacao.ATUALIZAR, tituloDrawer);
  }

  onClonar(transacao: BoletagemConsulta) {
    const tituloDrawer = 'titulo.clonarBoleto';
    this.abrirBoleto(transacao, Operacao.INCLUIR, tituloDrawer);
  }

  onVisualizarTransacao(transacao: BoletagemConsulta) {
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacao }
    });
  }

  onCheck(event, boleto) {
    if (event) {
      this.ds.selection.toggle(boleto);
    }
    this.selecionados.emit(this.ds.selection.selected);
  }

  onCheckAll(boletos) {
    this.ds.selectAllToggle(boletos);
    this.selecionados.emit(this.ds.selection.selected);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  transacoes = [
    { nomeUsuarioDesbloqueio: 'Usuário Teste' },
    // Adicione mais objetos de transação se necessário
  ];

  
}
