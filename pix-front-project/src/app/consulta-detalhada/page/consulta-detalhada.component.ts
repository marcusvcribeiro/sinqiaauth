import { DrawerService } from '@albert/ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { Condicao, CONDICAO_LIST } from 'src/app/shared/model/enum/condicao';
import { Mensagem } from 'src/app/shared/model/mensagem';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';
import { ConsultaService } from 'src/app/shared/service/consulta.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { ConsultaDetalhadaMensagem } from './../../shared/model/consulta-detalhada-mensagem';
import { FiltroMensagem } from './../../shared/model/filtro-mensagem';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { BoletoVisualizacaoComponent } from 'src/app/boleto/component/visualizacao/boleto-visualizacao/boleto-visualizacao.component';
import Seg from '../model/seg';

@Component({
  selector: 'app-consulta-detalhada',
  templateUrl: './consulta-detalhada.component.html',
  styleUrls: ['./consulta-detalhada.component.scss']
})
export class ConsultaDetalhadaComponent implements OnInit, OnDestroy {

  dataReferencia: Date;
  filtroForm: FormGroup;
  listarConsultaDetalhadaMensagem$: Observable<ConsultaDetalhadaMensagem[]>;
  listarMensagens$: Observable<Mensagem[]>;
  camposFiltro: FiltroMensagem[];
  mensagensSelecionadas: Mensagem[];
  operadores = CONDICAO_LIST;

  public ds: SinqiaDataSource<ConsultaDetalhadaMensagem>;

  private unsubscribe$ = new Subject();

  seg: Seg = new Seg();

  constructor(
    private parametrosGlobaisService: ParametrosGlobaisService,
    private formBuilder: FormBuilder,
    private consultaService: ConsultaService,
    private composicaoOperacaoService: ComposicaoOperacaoService,
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarFormFiltro();
    this.carregarValores();
  }

  private criarFormFiltro() {
    this.filtroForm = this.formBuilder.group({
      dataInicio: [this.dataReferencia, Validators.required],
      dataFim: [this.dataReferencia, Validators.required],
      campos: new FormArray([]),
      mensagemSelecionadas: []
    });
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<ConsultaDetalhadaMensagem>()
      .withBody(this.filtroForm)
      .fromService(this.consultaService.listarConsultaDetalhada.bind(this.consultaService))
      .multiSelectable()
      .build();
  }

  private carregarValores() {
    this.listarMensagens$ = this.composicaoOperacaoService.listarMensagens();
  }

  onPesquisar() {
    if (!this.ds) {
      this.criarDataSource();
      return;
    }
    this.ds.filter();
  }

  atualizarFiltro(mensagensSelecionadas: Mensagem[]) {
    this.mensagensSelecionadas = mensagensSelecionadas;
    this.filtroForm.get('mensagemSelecionadas').setValue(mensagensSelecionadas);

    this.consultaService.listarFiltroMensagem(mensagensSelecionadas).subscribe(campos => {
      this.criarFormCampos(campos);
      this.camposFiltro = campos;
    }, () => {
      this.camposFiltro = [];
    });
  }

  private criarFormCampos(campos) {
    this.filtroForm.controls.campos = new FormArray([]);
    const camposForm = this.filtroForm.controls.campos as FormArray;

    campos.forEach(campo => {
      camposForm.push(this.formBuilder.group({
        campo: campo.idCampo,
        descricaoCampo: campo.descricao,
        operadorInicio: Condicao.IGUAL,
        valorInicio: [],
        operadorFim: [],
        valorFim: [],
        tipoCampo: []
      }));
    });
  }

  onAbrirDrawerMensagem(mensagem: ConsultaDetalhadaMensagem) {
    const transacao = new BoletagemConsulta(mensagem);
    this.drawerService.create({
      component: BoletoVisualizacaoComponent,
      size: 'large',
      componentProps: { transacao }
    });
  }

  onExportarExcel() {
    this.consultaService.exportarExcelConsultaDetalhada(this.filtroForm.getRawValue())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(res => DownloadFile.downloadFile(res));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
