import { BottomSheetService } from "@albert/layout";
import {
  DialogService,
  DrawerService,
  MenuComponent,
  ToastService,
} from "@albert/ui";
import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { BehaviorSubject, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { BoletoComposicaoComponent } from "src/app/boleto/component/edicao/boleto-composicao/boleto-composicao.component";
import { VerificarMensagemDialogComponent } from "src/app/shared/component/verificar-mensagem-dialog/verificar-mensagem-dialog.component";
import { DownloadFile } from "src/app/shared/helper/download-file-helper";
import { Campo } from "src/app/shared/helper/filter-condition-builder";
import { BoletagemConsulta } from "src/app/shared/model/boletagem-consulta";
import { BoletagemConsultaFiltro } from "src/app/shared/model/boletagem-consulta-filtro";
import { Condicao } from "src/app/shared/model/enum/condicao";
import { TipoBoletagem } from "src/app/shared/model/enum/tipo-boletagem.enum";
import { LiberarBoletoChave } from "src/app/shared/model/liberar-boleto";
import { TransacaoMensagensRelacionadasFiltro } from "src/app/shared/model/mensagens-relacionadas";
import { Prioridade } from "src/app/shared/model/prioridade";
import { TransacaoID } from "src/app/shared/model/transacao";
import { ParametrosGlobaisService } from "src/app/shared/service/parametros-globais.service";
import { Seg } from "../model/seg";
import { ConsultaTransacaoManualService } from "../service/consulta-transacao-manual.service";
import { DetalheMensagemTabsComponent } from "../component/detalhe-mensagem/detalhe-mensagem-tabs/detalhe-mensagem-tabs.component";

@Component({
  selector: "app-boletagem",
  templateUrl: "./transacoes.component.html",
  styleUrls: ["./consulta-transacoes.component.scss"],
})
export class TransacoesComponent implements OnInit, OnDestroy {
  @Input() keyPressed;
  // Filtro e Subject do filtro (ambos trabalham juntos para emitir as alterações para as listas)
  filtroForm: FormGroup;
  filtro$: Subject<BoletagemConsultaFiltro> = new BehaviorSubject(null);

  // Constante para auxiliar em condições no HTML
  TipoBoletagem = TipoBoletagem;

  // Tab selecionada de acordo com o respectivo enum
  boletagemTab: TipoBoletagem = TipoBoletagem.LIBERADA;

  dataReferencia: Date;
  isRefreshing: boolean;
  timerId;
  condicaoTipo: Campo;
  filtrarMensagem: boolean = true;

  selecionados: BoletagemConsulta[] = [];

  private unsubscribe$ = new Subject();

  private tempo = 5000;

  seg: Seg = new Seg();

  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private boletagemService: ConsultaTransacaoManualService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private drawerService: DrawerService,
    private translateService: TranslateService,
    private bottomSheetService: BottomSheetService
  ) {}

  shortcuts = [];
  ngOnInit(): void {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarForm();
    this.shortcuts.push(
      {
          key: "enter",
          preventDefault: true,
          command: e => {
              this.onPesquisar();
          }
      }
    )
  }

  pesquisarByKey(){
    this.onPesquisar();
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      mensagem: [],
      valorInicio: [],
      valorFim: [],
      idSituacaoMensagem: [],
      dataReferenciaInicio: [this.dataReferencia, Validators.required],
      dataReferenciaFim: [this.dataReferencia, Validators.required],
      situacaoTransacao: [TipoBoletagem.LIBERADA],
      canalMensagem: [],
    });
    this.onPesquisar();
  }

  onMensagensSelecionadas(mensagemSelecionada) {
    this.bottomSheetService.create({
      component: DetalheMensagemTabsComponent,
      title: this.translateService.instant("titulo.detalheBoleto"),
      componentProps: { filtro: this.converter(mensagemSelecionada) },
    });
  }

  onTrocarTab(tipoTabBoletagem: number) {
    this.bottomSheetService.close();
    let isModelo = false;
    this.boletagemTab = tipoTabBoletagem;

    if (tipoTabBoletagem === 0) {
      isModelo = true;
      tipoTabBoletagem = TipoBoletagem.PRE_BOLETO;
    }

    if (this.filtroForm) {
      this.definirFiltroModelo(isModelo);
      this.filtroForm.get("situacaoTransacao").setValue(tipoTabBoletagem);
      this.selecionados = [];
    }
  }

  private definirFiltroModelo(isModelo: boolean) {
    if (isModelo) {
      this.condicaoTipo = {
        campo: "MODELO",
        operador: Condicao.DIFERENTE,
        valor: "",
      };
      return;
    }

    this.condicaoTipo = {
      campo: "MODELO",
      operador: Condicao.IGUAL,
      valor: "",
    };
  }

  converter(dados: BoletagemConsulta): TransacaoMensagensRelacionadasFiltro {
    if (dados) {
      return {
        dataReferencia: dados.dataReferencia,
        numeroSequenciaTransacao: dados.numeroSequenciaTransacao,
        numeroUnicoOperacao: dados.numeroUnicoOperacao,
        numeroUnicoOperacaoOriginal: dados.numeroUnicoOperacaoOriginal,
      };
    }
  }

  onGerarPdf() {
    this.boletagemService
      .gerarPDF(this.filtroForm.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }

  onExportarExcel() {
    this.boletagemService
      .exportarExcel(this.filtroForm.getRawValue(), this.condicaoTipo)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => DownloadFile.downloadFile(res));
  }

  onPesquisar() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
  }

  onTipo() {
    this.filtroForm.get("mensagem").setValue(null);
  }

  onSelecionados(selecionados: BoletagemConsulta[]) {
    this.selecionados = selecionados;
  }

  onCancelarTransacoes() {
    this.dialogService.create({
      type: "confirm",
      message: this.translateService.instant("validacoes.cancelarMensagem"),
      title: this.translateService.instant("titulo.cancelarMensagem"),
      btnPrimaryText: this.translateService.instant("campo.sim"),
      btnSecondaryText: this.translateService.instant("campo.nao"),
      callback: () => {
        if (this.selecionados && this.selecionados.length <= 0) {
          return;
        }

        const transacoes: TransacaoID[] = this.getTransacaoID();

        this.boletagemService.cancelarTransacao(transacoes).subscribe((res) => {
          this.onPesquisar();
          this.toastService.create({
            type: "success",
            text: this.translateService.instant("mensagem.cancelarSucesso"),
          });
        });
      },
    });
  }

  onExcluirTransacoes() {
    this.dialogService.create({
      type: "confirm",
      message: this.translateService.instant("validacoes.excluirMensagem"),
      title: this.translateService.instant("titulo.excluirMensagem"),
      btnPrimaryText: this.translateService.instant("campo.sim"),
      btnSecondaryText: this.translateService.instant("campo.nao"),
      callback: () => {
        if (this.selecionados && this.selecionados.length <= 0) {
          return;
        }

        const transacoes: TransacaoID[] = this.getTransacaoID();

        this.boletagemService.excluirMensagem(transacoes).subscribe((res) => {
          this.onPesquisar();
          this.toastService.create({
            type: "success",
            text: this.translateService.instant("mensagem.excluirSucesso"),
          });
        });
      },
    });
  }

  onLiberarTransacoes() {
    this.dialogService.create({
      type: "confirm",
      message: this.translateService.instant("validacoes.liberarMensagem"),
      title: this.translateService.instant("titulo.liberarMensagem"),
      btnPrimaryText: this.translateService.instant("campo.sim"),
      btnSecondaryText: this.translateService.instant("campo.nao"),
      callback: () => {
        if (this.selecionados && this.selecionados.length <= 0) {
          this.toastService.create({
            type: "info",
            text: this.translateService.instant(
              "validacoes.listaSelecionadosVazia"
            ),
          });
          return;
        }

        const transacoes: LiberarBoletoChave[] = this.selecionados.map(
          ({ dataReferencia, numeroSequenciaTransacao, idMensagem }) =>
            new LiberarBoletoChave({
              dataReferencia,
              numeroSequenciaTransacao,
              idMensagem,
            })
        );

        if (this.selecionados[0].nomeModeloMensagem) {
          this.toastService.create({
            type: "info",
            text: this.translateService.instant("validacoes.boletoModelo"),
          });
        } else {
          this.boletagemService.liberarBoleto(transacoes).subscribe((res) => {
            this.onPesquisar();
            this.toastService.create({
              type: "success",
              text: this.translateService.instant("mensagem.liberarSucesso"),
            });
          });
        }
      },
    });
  }

  // async onAlterarPrioridade() {
  //   const { component } = await this.dialogService.create({
  //     type: "custom",
  //     component: DefinirPrioridadeComponent,
  //   });

  //   component.instance.close
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((idPrioridade) => {
  //       if (idPrioridade != null) {
  //         const alterarPrioridades: Prioridade = new Prioridade({
  //           idTipoPrioridade: idPrioridade,
  //           transacoes: this.getTransacaoID(),
  //         });
  //         this.boletagemService
  //           .definirPrioridade(alterarPrioridades)
  //           .subscribe((success) => {
  //             this.toastService.create({
  //               type: "success",
  //               text: this.translateService.instant(
  //                 "mensagem.definirPrioridadeSucesso"
  //               ),
  //             });
  //             this.onPesquisar();
  //           });
  //       }
  //     });
  // }

  async onVerificarMensagens() {
    const { component } = await this.dialogService.create({
      type: "custom",
      component: VerificarMensagemDialogComponent,
    });

    component.instance.close
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((message) => {
        if (message) {
          const transacoes = this.getTransacaoID();
          this.boletagemService
            .verificarMensagem(transacoes, message)
            .subscribe((success) => {
              this.toastService.create({
                type: "success",
                text: this.translateService.instant(
                  "mensagem.verificarMensagemSucesso"
                ),
              });
            });
        }
      });
  }

  onNovoBoleto() {
    this.drawerService.create({
      component: BoletoComposicaoComponent,
      size: "medium",
      title: this.translateService.instant("titulo.novoBoleto"),
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.bottomSheetService.close();
  }

  private getTransacaoID(): TransacaoID[] {
    return this.selecionados.map(
      ({ numeroSequenciaTransacao, dataReferencia }) =>
        new TransacaoID({ numeroSequenciaTransacao, dataReferencia })
    );
  }

  start(): void {
    this.isRefreshing = true;
    this.timerId = setTimeout(() => {
      this.onPesquisar();
      this.start();
    }, this.tempo);
  }

  stop(): void {
    this.isRefreshing = false;
    clearInterval(this.timerId);
  }

  refreshNow(): void {
    this.onPesquisar();
  }

  // async onOpcoes() {
  //   const { component } = await this.drawerService.create({
  //     component: BoletagemRefreshOptionsComponent,
  //     size: "small",
  //     title: this.translateService.instant("titulo.boletagemRefreshOptions"),
  //     componentProps: {
  //       tempo: this.tempo,
  //     },
  //   });

  //   component.instance.tempoChange.subscribe((valor) =>
  //     this.atualizarTempoRefresh(valor)
  //   );
  // }

  private atualizarTempoRefresh(tempo: number) {
    this.tempo = tempo;
    if (this.isRefreshing) {
      this.stop();
      this.start();
    }
  }
}



// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-transacoes',
//   templateUrl: './transacoes.component.html',
//   styleUrls: ['./transacoes.component.scss']
// })
// export class ConsultaTransacoesComponent implements OnInit {

//   transacoes: any[] = [];  // Array para armazenar as transações

//   constructor() {}

//   ngOnInit(): void {
//     // Aqui você vai adicionar a lógica para carregar as transações
//   }

//   visualizarTransacao(transacao: any): void {
//     console.log('Visualizando transação:', transacao);
//     // Aqui você pode adicionar a lógica de visualização, abrir um modal, ou redirecionar para outra página, por exemplo
//   }
// }