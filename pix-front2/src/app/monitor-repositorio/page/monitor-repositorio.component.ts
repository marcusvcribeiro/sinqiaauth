import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MonitorRepositorioService } from '../service/monitor-repositorio.service';
import { MensagemRepositorio } from 'src/app/shared/model/mensagem-repositorio';
import { Observable } from 'rxjs';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { v4 as uuidv4 } from 'uuid';
import { map } from 'rxjs/operators';
import { MensagemRepositorioSaida } from 'src/app/shared/model/mensagem-repositorio-saida';
import { TipoMonitorRepositorio } from '../../shared/model/enum/tipo-monitor-repositorio';
import { ToastService } from '@albert/ui';
import { TranslateService } from '@ngx-translate/core';
import { PageRequest } from 'src/app/shared/model/page-request';
import { ListResult } from 'src/app/shared/model/list-result';
import Seg from '../module/seg';

@Component({
  selector: 'app-monitor-repositorio',
  templateUrl: './monitor-repositorio.component.html',
  styleUrls: ['./monitor-repositorio.component.scss']
})

export class MonitorRepositorioComponent implements OnInit {

  filtroForm: FormGroup;
  dataReferencia: Date;

  TipoMonitorRepositorio = TipoMonitorRepositorio;

  abaSelecionada: TipoMonitorRepositorio;

  mensagensRepositorioEntrada$: Observable<ListResult<MensagemRepositorio>>;
  mensagensRepositorioSaida$: Observable<ListResult<MensagemRepositorioSaida>>;

  itemSelecionadoEntrada: MensagemRepositorio;
  itemSelecionadoSaida: MensagemRepositorioSaida;

  seg: Seg = new Seg();

  constructor(
    private formBuilder: FormBuilder,
    private monitorRepositorioService: MonitorRepositorioService,
    private parametrosGlobais: ParametrosGlobaisService,
    private toastService: ToastService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobais.dataReferencia;
    this.abaSelecionada = TipoMonitorRepositorio.ENTRADA;

    this.criarForm();
    this.listarMonitor();
  }

  onPesquisar() {
    this.listarMonitor();
    this.limparSelecionado();
  }

  onMudarTab(abaSelecionada: TipoMonitorRepositorio) {
    this.abaSelecionada = abaSelecionada;

    this.onPesquisar();
  }

  private listarMonitor() {
    if (this.filtroForm.invalid) {

      this.toastService.create({
        type: 'error',
        text: this.translateService.instant('validacoes.campoInvalido') + ': ' + this.translateService.instant('campo.dataReferencia'),
      });
      return;
    }

    if (this.abaSelecionada === TipoMonitorRepositorio.ENTRADA) {
      this.listarMonitorEntrada();

      return;
    }

    this.listarMonitorSaida();
  }

  listarMonitorEntrada(params?: PageRequest) {
    const filter = this.filtroForm.getRawValue();

    if (!params) {
      params = new PageRequest({ page: 1, limit: 15 });
    }

    this.mensagensRepositorioEntrada$ = this.monitorRepositorioService
      .listarMensagensRepositorioEntrada(filter, params).pipe(
        map(mensagem => {
          mensagem.records.forEach(valor => {
            valor.hash = uuidv4();
            valor.status = this.obterStatusSituacaoMensagem(valor.idSituacaoOperacaoLegado);
          });
          return mensagem;
        })
      );
  }

  listarMonitorSaida(params?: PageRequest) {
    const filter = this.filtroForm.getRawValue();

    if (!params) {
      params = new PageRequest({ page: 1, limit: 15 });
    }

    this.mensagensRepositorioSaida$ = this.monitorRepositorioService
      .listarMensagensRepositorioSaida(filter, params).pipe(
        map(mensagem => {
          mensagem.records.forEach(valor => {
            valor.hash = uuidv4();
            valor.status = this.obterStatusSituacaoMensagem(valor.idSituacaoOperacaoLegado);
          });
          return mensagem;
        })
      );
  }

  private limparSelecionado() {
    this.itemSelecionadoEntrada = null;
    this.itemSelecionadoSaida = null;
  }

  private criarForm() {
    const date = new Date();
    date.setDate(date.getDate() - 1);

    this.filtroForm = this.formBuilder.group({
      // Campos para os dois tipos de repositórios
      dataReferencia: [this.dataReferencia, Validators.required],
      deInclusao: [date],
      ateInclusao: [new Date()],
      deProcessamento: null,
      ateProcessamento: null,
      chaveLegado: null,
      situacao: null,
      liquidacao: null,
      complemento: null,
      sistemaOriginal: null,
      operacaoBancaria: null,
      produto: null,
      sistema: null,
      entidadeConveniada: null,

      // Campos exclusivos para repositório de entrada
      deAgendamento: null,
      ateAgendamento: null,
      permiteAlteracao: null,
      arquivoEntrada: null,
      composicaoOperacaoIdentificada: null,
      layoutIntegracao: null,

      // Campos exclusivos para repositório de saída
      chaveSPI: null,
      codigoMensagem: null,
      dataReferenciaTransacao: null,
      numeroSequencialTransacao: null,
      arquivoSaida: null,
    });
  }

  private obterStatusSituacaoMensagem(idSituacaoMensagem: number): string {
    switch (idSituacaoMensagem) {
      case 4:
      case 3:
        return 'success';
      case 10:
        return 'warn';
      default:
        return 'alert';
    }
  }
}
