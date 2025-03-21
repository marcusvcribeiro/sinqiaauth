import { PixCanalIniciacaoEnum } from "./../../enum/pix-canal-iniciacao.enum";
import { PixNaturezaUsuarioEnum } from "./../../enum/pix-natureza-usuario.enum";
import { PixMecanismoIniciacaoEnum } from "./../../enum/pix-mecanismo-iniciacao.enum";
import { PixProcessoIniciacaoEnum } from "./../../enum/pix-processo-iniciacao.enum";
import { PixMotivoRejeicaoEnum } from "./../../enum/pix-motivo-rejeicao.enum";
import { SistemaParticipante } from "./../../../shared/model/sistema.model";
import { DrawerService } from "@albert/ui";
import { PixMessageService } from "./../../../shared/service/pix-message-service";
import { TransacoesPixModel } from "./../../model/pix.model";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { TipoTransacaoEnum } from "./../../enum/tipo-transacao.enum";
import { PixStatusTrasacaoEnum } from "./../../enum/pix-status-transacao.enum";
import { PixFonteReceitaEnum } from "./../../enum/pix-fonte-receita.enum";
import { PixEnvolvidoTransacaoEnum } from "./../../enum/pix-envolvido-transacao.enum";
import { PixDetalheTransacaoEnum } from "./../../enum/pix-detalhe-transacao.enum";
import { DictTipoTransacaoEnum } from "./../../enum/dict-tipo-transacao.enum";
import { DictStatusTransacaoEnum } from "./../../enum/dict-status-transacao.enum";
import { DictChaveInclusaoEnum } from "./../../enum/dict-chave-inclusao.enum";
import { Component, OnInit } from "@angular/core";
import { strictEqual } from "assert";
import { TransacoesDictModel } from "../../model/dict.model";
import { ApuracaoDadosInformesBacenService } from "../../service/apuracao-dados-informes-bacen.service";
import { ComposicaoOperacaoService } from "src/app/shared/service/composicao-operacao.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { PixFinalidadeTransacaoEnum } from "../../enum/pix-finalidade-transacao.enum";
import { TransacoesBloqueioModel } from "../../model/bloqueio.model";
import { DetalheBloqueioEnum } from "../../enum/bloq-detalhe-bloqueio.enum";
import { TransacoesDisponibilidadeModel } from "../../model/disponibilidade.model";
import { MesesdoAnoEnum } from "src/app/shared/model/enum/meses-do-ano.enum";

@Component({
  selector: "app-apuracao-dados-informes-bacen-importar-cadastro-tab",
  templateUrl:
    "./apuracao-dados-informes-bacen-importar-cadastro-tab.component.html",
  styleUrls: [
    "./apuracao-dados-informes-bacen-importar-cadastro-tab.component.scss",
  ],
})
export class ApuracaoDadosInformesBacenImportarCadastroTabComponent
  implements OnInit
{
  dictChaveInclusaoList: DictChaveInclusaoEnum[] = new Array();
  dictStatusTransacaoList: DictStatusTransacaoEnum[] = new Array();
  dictTipoTransacaoList: DictTipoTransacaoEnum[] = new Array();
  pixDetalheTransacaoList: PixDetalheTransacaoEnum[] = new Array();
  pixEnvolvidoTransacaoList: PixEnvolvidoTransacaoEnum[] = new Array();
  pixFonteRefeitaList: PixFonteReceitaEnum[] = new Array();
  pixStatusTransacaoList: PixStatusTrasacaoEnum[] = new Array();
  tipoTransacaoList: TipoTransacaoEnum[] = new Array();
  sistemas: SistemaParticipante[] = new Array();
  pixMotivoRejeicaoList: PixMotivoRejeicaoEnum[] = new Array();
  pixProcessoIniciacaoList: PixProcessoIniciacaoEnum[] = new Array();
  pixMecanismoIniciacaoList: PixMecanismoIniciacaoEnum[] = new Array();
  pixNaturezaUsuarioPagadorList: PixNaturezaUsuarioEnum[] = new Array();
  pixNaturezaUsuarioRecebedorList: PixNaturezaUsuarioEnum[] = new Array();
  pixCanalIniciacaoList: PixCanalIniciacaoEnum[] = new Array();
  pixFinalidadeTransacaoList: PixFinalidadeTransacaoEnum[] = new Array();
  bloDetalheBloqueioList: DetalheBloqueioEnum[] = new Array();
  mesesList:  MesesdoAnoEnum[] = new Array();

  form: FormGroup;

  constructor(
    private apuracaoDadosInformesBacenService: ApuracaoDadosInformesBacenService,
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private composicaoOperacaoService: ComposicaoOperacaoService
  ) {}

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.instanceFormGroupForDict();
    this.carregarListas();
    this.loadSistemas();
  }

  onChangeTipoTransacao($event: TipoTransacaoEnum) {
    switch ($event) {
      case TipoTransacaoEnum.dict:
        this.instanceFormGroupForDict();
        break;
      case TipoTransacaoEnum.pix: {
        this.instanceFormGroupForPix();
        break;
      }
      case TipoTransacaoEnum.bloqueio: {
        this.instanceFormGroupForBloqueadas();
        break;
      }
      case TipoTransacaoEnum.disponibilidade: {
        this.instanceFormGroupForDisponibilidade();
        break;
      }
      default: {
        break;
      }
    }
  }

  onSave() {
    if (this.controls.tipoTransacao.value == TipoTransacaoEnum.dict) {
      this.importarCadastroDict();
    } else if (this.controls.tipoTransacao.value == TipoTransacaoEnum.pix) {
      this.importarCadastroPix();
    } else if (this.controls.tipoTransacao.value == TipoTransacaoEnum.bloqueio) {
      this.importarCadastroBloqueio();
    } else if (this.controls.tipoTransacao.value == TipoTransacaoEnum.disponibilidade) {
      this.importarCadastroDisponibilidade();
    }
  }

  onChangeStatusTransacaoPix($event: PixStatusTrasacaoEnum){
    if($event === PixStatusTrasacaoEnum.Devolvida || $event === PixStatusTrasacaoEnum.AgendadaDevolvida){
      this.controls.motivoRejeicao.setValidators(Validators.required);
    }else{
      this.controls.motivoRejeicao.clearValidators();
    }

    this.controls.motivoRejeicao.updateValueAndValidity();
  }

  private loadSistemas() {
    this.composicaoOperacaoService.listarSistema().subscribe((data) => {
      this.sistemas = data;
    });
  }

  private instanceFormGroupForDict() {
    this.form = this.formBuild.group({
      tipoTransacao: [TipoTransacaoEnum.dict, Validators.required],
      sistemaOrigem: [null, Validators.required],
      dataTransacao: [null, Validators.required],
      horaInicioTransacao: [null, Validators.required],
      horaFimTransacao: [null, Validators.required],
      statusTransacao: [null, Validators.required],
      tipoTransacaoDict: [null, Validators.required],
      chaveInclusao: [null, Validators.required],
      horaAcknowledge: [],
      horaNotificacaoUsuario: [],
      HoraInicioEnvioCodigoClient: [null, Validators.required],
      HoraFimEnvioCodigoClient: [null, Validators.required]
    });
  }

  private instanceFormGroupForBloqueadas() {
    this.form = this.formBuild.group({
      tipoTransacao: [TipoTransacaoEnum.bloqueio, Validators.required],
      sistemaOrigem: [null, Validators.required],
      horaInicioBloqueio: [null, Validators.required],
      horaFimBloqueio: [null, Validators.required],
      detalheBloqueio: [null, Validators.required],
      valorBloqueio: [null, Validators.required],
      endToEndID: [null, Validators.required]
    });
  }

  private instanceFormGroupForDisponibilidade() {
    this.form = this.formBuild.group({
      tipoTransacao: [TipoTransacaoEnum.disponibilidade, Validators.required],
      sistemaOrigem: [null, Validators.required],
      anoReferencia: [null, Validators.required],
      mesReferencia: [null, Validators.required],
      horasDisponiveis: [null, Validators.required],
      horasIndisponiveis: [null, Validators.required]
    });
  }

  private instanceFormGroupForPix() {
    this.form = this.formBuild.group({
      tipoTransacao: [TipoTransacaoEnum.pix],
      sistemaOrigem: [null, Validators.required],
      dataTransacao: [null, Validators.required],
      statusTransacao: [null, Validators.required],
      envolvidoTransacao: [null, Validators.required],
      detalheTransacao: [null, Validators.required],
      fonteReceita: [null, Validators.required],
      horaInicioTransacao: [null, Validators.required],
      horaFimTransacao: [null, Validators.required],
      valorTransacao: [null, Validators.required],
      valorTarifaTransacao: [null, Validators.required],
      motivoRejeicao: [null],
      processoIniciacao: [null, Validators.required],
      mecanismoIniciacao: [null, Validators.required],
      naturezaUsuarioPagador: [null, Validators.required],
      naturezaUsuarioRecebedor: [null, Validators.required],
      canalIniciacao: [null, Validators.required],
      endToEndID: [null, Validators.required],
      finalidade: [null, Validators.required],
      valorEspecie: [null, Validators.required]
    });
  }

  private getDisponibilidadeObject(): TransacoesDisponibilidadeModel {
    var model = new TransacoesDisponibilidadeModel();
    model.SistemaOrigem = this.controls.sistemaOrigem.value;
    model.AnoReferencia = this.controls.anoReferencia.value;
    model.MesReferencia = this.controls.mesReferencia.value;
    model.HorasDisponiveis = this.controls.horasDisponiveis.value;
    model.HorasIndisponiveis = this.controls.horasIndisponiveis.value;

    return model;

  }


  private getBloqueioObject(): TransacoesBloqueioModel {
    var model = new TransacoesBloqueioModel();

    model.SistemaOrigem = this.controls.sistemaOrigem.value;
    model.HoraInicioBloqueio = this.controls.horaInicioBloqueio.value;
    model.HoraFimBloqueio = this.controls.horaFimBloqueio.value;
    model.DetalheBloqueio = this.controls.detalheBloqueio.value;
    model.ValorBloqueio = this.controls.valorBloqueio.value;
    model.EndToEndID = this.controls.endToEndID.value;

    return model;
  }

  private getPixObject(): TransacoesPixModel {
    var model = new TransacoesPixModel();

    model.SistemaOrigem = this.controls.sistemaOrigem.value;
    model.DataTransacao = this.controls.dataTransacao.value;
    model.StatusTransacao = this.controls.statusTransacao.value;
    model.EnvolvidoTransacao = this.controls.envolvidoTransacao.value;
    model.DetalheTransacao = this.controls.detalheTransacao.value;
    model.FonteReceita = this.controls.fonteReceita.value;
    model.HoraInicioTransacao = `${model.DataTransacao}T${this.controls.horaInicioTransacao.value}`;
    model.HoraFimTransacao = `${model.DataTransacao}T${this.controls.horaFimTransacao.value}`;
    model.ValorTransacao = this.controls.valorTransacao.value;
    model.ValorTarifaTransacao = this.controls.valorTarifaTransacao.value;
    model.MotivoRejeicao = this.controls.motivoRejeicao.value;
    model.ProcessoIniciacao = this.controls.processoIniciacao.value;
    model.MecanismoIniciacao = this.controls.mecanismoIniciacao.value;
    model.NaturezaUsuarioPagador = this.controls.naturezaUsuarioPagador.value;
    model.NaturezaUsuarioRecebedor = this.controls.naturezaUsuarioRecebedor.value;
    model.CanalIniciacao = this.controls.canalIniciacao.value;
    model.EndToEndID = this.controls.endToEndID.value;
    model.Finalidade = this.controls.finalidade.value;
    model.ValorEspecie = this.controls.valorEspecie.value;
    return model;
  }

  private importarCadastroDict() {
    var model = this.getDictObject();
    this.apuracaoDadosInformesBacenService.importarManualDict(model).subscribe((data) => {
      this.pixMessageService.toastSuccess(data.message);
      this.drawerService.close();
    });
  }

  private getDictObject(): TransacoesDictModel {
    var model = new TransacoesDictModel();

    model.SistemaOrigem = this.controls.sistemaOrigem.value;
    model.DataTransacao = this.controls.dataTransacao.value;
    model.HoraInicioTransacaoDICT = `${model.DataTransacao}T${this.controls.horaInicioTransacao.value}`;
    model.HoraFimTransacaoDICT = `${model.DataTransacao}T${this.controls.horaFimTransacao.value}`;
    model.StatusTransacaoDICT = this.controls.statusTransacao.value;
    model.TipoTransacaoDICT = this.controls.tipoTransacaoDict.value;
    model.ChaveInclusaoDICT = this.controls.chaveInclusao.value;
    model.HoraAcknowledgeDICT = this.controls.horaAcknowledge.value;
    model.HoraNotificacaoUsuarioDICT = this.controls.horaNotificacaoUsuario.value;
    model.HoraInicioEnvioCodigoClient = `${model.DataTransacao}T${this.controls.HoraInicioEnvioCodigoClient.value}`;
    model.HoraFimCodigoClient = `${model.DataTransacao}T${this.controls.HoraFimEnvioCodigoClient.value}`;

    return model;
  }

  private importarCadastroPix() {
    var model = this.getPixObject();
    this.apuracaoDadosInformesBacenService.importarManualPix(model).subscribe((data) => {
      this.pixMessageService.toastSuccess(data.message);
      this.drawerService.close();
    });
  }

  private importarCadastroDisponibilidade() {
    var model = this.getDisponibilidadeObject();
    this.apuracaoDadosInformesBacenService.importarManualDisponibilidade(model).subscribe((data) => {
      this.pixMessageService.toastSuccess(data.message);
      this.drawerService.close();
    });
  }

  private importarCadastroBloqueio() {
    var model = this.getBloqueioObject();
    this.apuracaoDadosInformesBacenService.importarManualBloqueio(model).subscribe((data) => {
      this.pixMessageService.toastSuccess(data.message);
      this.drawerService.close();
    });
  }

  private carregarListas() {
    this.dictChaveInclusaoList.push(DictChaveInclusaoEnum.Aleatoria);
    this.dictChaveInclusaoList.push(DictChaveInclusaoEnum.Cnpj);
    this.dictChaveInclusaoList.push(DictChaveInclusaoEnum.Cpf);
    this.dictChaveInclusaoList.push(DictChaveInclusaoEnum.Email);
    this.dictChaveInclusaoList.push(DictChaveInclusaoEnum.Telefone);

    this.dictStatusTransacaoList.push(DictStatusTransacaoEnum.Cancelamento);
    this.dictStatusTransacaoList.push(DictStatusTransacaoEnum.Confirmacao);
    this.dictStatusTransacaoList.push(
      DictStatusTransacaoEnum.ConsultaBaseInterna
    );

    this.dictTipoTransacaoList.push(DictTipoTransacaoEnum.AlteracaoChave);
    this.dictTipoTransacaoList.push(DictTipoTransacaoEnum.ConsultaChave);
    this.dictTipoTransacaoList.push(DictTipoTransacaoEnum.ExclusaoChave);
    this.dictTipoTransacaoList.push(DictTipoTransacaoEnum.InclusaoChave);
    this.dictTipoTransacaoList.push(DictTipoTransacaoEnum.PortabilidadeChave);
    this.dictTipoTransacaoList.push(DictTipoTransacaoEnum.ReinvidicacaoPosse);

    this.pixDetalheTransacaoList.push(
      PixDetalheTransacaoEnum.EnvCliDifInstRejeitadasAposTratamentoSuspeitaFraude
    );
    this.pixDetalheTransacaoList.push(
      PixDetalheTransacaoEnum.EnvCliMesmaInstRejeitadasAposTratamentoSuspeitaFraude
    );
    this.pixDetalheTransacaoList.push(
      PixDetalheTransacaoEnum.LiqDentroMesmoParticipanteSPI
    );
    this.pixDetalheTransacaoList.push(
      PixDetalheTransacaoEnum.LiqMesmaInstAposTratamentoSuspeitaFraude
    );
    this.pixDetalheTransacaoList.push(
      PixDetalheTransacaoEnum.LiqMesmaInstSemTratamentoSuspeitaFraude
    );

    this.pixEnvolvidoTransacaoList.push(
      PixEnvolvidoTransacaoEnum.DiferentesParticipantes
    );
    this.pixEnvolvidoTransacaoList.push(
      PixEnvolvidoTransacaoEnum.MesmaInstituicao
    );

    this.pixFonteRefeitaList.push(PixFonteReceitaEnum.IniciacaoPJ);
    this.pixFonteRefeitaList.push(PixFonteReceitaEnum.RecebimentoPF);
    this.pixFonteRefeitaList.push(PixFonteReceitaEnum.RecebimentoPJ);

    this.pixStatusTransacaoList.push(PixStatusTrasacaoEnum.Acatada);
    this.pixStatusTransacaoList.push(PixStatusTrasacaoEnum.AgendadaAcatada);
    this.pixStatusTransacaoList.push(PixStatusTrasacaoEnum.AgendadaDevolvida);
    this.pixStatusTransacaoList.push(PixStatusTrasacaoEnum.Devolvida);

    this.tipoTransacaoList.push(TipoTransacaoEnum.dict);
    this.tipoTransacaoList.push(TipoTransacaoEnum.pix);
    this.tipoTransacaoList.push(TipoTransacaoEnum.bloqueio);
    this.tipoTransacaoList.push(TipoTransacaoEnum.disponibilidade);


    this.pixMotivoRejeicaoList.push(PixMotivoRejeicaoEnum.NaoUtilizar);
    this.pixMotivoRejeicaoList.push(PixMotivoRejeicaoEnum.PagadorSancionado);
    this.pixMotivoRejeicaoList.push(PixMotivoRejeicaoEnum.ProblemaAutenticacao);
    this.pixMotivoRejeicaoList.push(PixMotivoRejeicaoEnum.SuspeitaFraude);
    this.pixMotivoRejeicaoList.push(PixMotivoRejeicaoEnum.Timeout);

    this.pixProcessoIniciacaoList.push(PixProcessoIniciacaoEnum.Manual);
    this.pixProcessoIniciacaoList.push(
      PixProcessoIniciacaoEnum.ValoresPreArmazenados
    );

    this.pixMecanismoIniciacaoList.push(PixMecanismoIniciacaoEnum.ChavePix);
    this.pixMecanismoIniciacaoList.push(
      PixMecanismoIniciacaoEnum.QrCodeDinamico
    );
    this.pixMecanismoIniciacaoList.push(
      PixMecanismoIniciacaoEnum.QrCodeEstatico
    );
    this.pixMecanismoIniciacaoList.push(
      PixMecanismoIniciacaoEnum.ServicodeIniciacao
    );

    this.pixNaturezaUsuarioPagadorList.push(
      PixNaturezaUsuarioEnum.PessoaFisica
    );
    this.pixNaturezaUsuarioPagadorList.push(
      PixNaturezaUsuarioEnum.PessoaJuridica
    );

    this.pixNaturezaUsuarioRecebedorList.push(
      PixNaturezaUsuarioEnum.PessoaFisica
    );
    this.pixNaturezaUsuarioRecebedorList.push(
      PixNaturezaUsuarioEnum.PessoaJuridica
    );

    this.pixCanalIniciacaoList.push(PixCanalIniciacaoEnum.ATM);
    this.pixCanalIniciacaoList.push(PixCanalIniciacaoEnum.Agencia);
    this.pixCanalIniciacaoList.push(
      PixCanalIniciacaoEnum.AplicativoInstituicao
    );
    this.pixCanalIniciacaoList.push(PixCanalIniciacaoEnum.CallCenter);
    this.pixCanalIniciacaoList.push(
      PixCanalIniciacaoEnum.InternetBankingInstituicao
    );

    this.pixFinalidadeTransacaoList.push(PixFinalidadeTransacaoEnum.PixCompraTransferencia);
    this.pixFinalidadeTransacaoList.push(PixFinalidadeTransacaoEnum.PixSaque);
    this.pixFinalidadeTransacaoList.push(PixFinalidadeTransacaoEnum.PixTroco);

    this.bloDetalheBloqueioList.push(DetalheBloqueioEnum.BloMED);
    this.bloDetalheBloqueioList.push(DetalheBloqueioEnum.BloProcessoAnaliseConcluida);
    this.bloDetalheBloqueioList.push(DetalheBloqueioEnum.BloProcessoAnaliseNaoConcluida);
    this.bloDetalheBloqueioList.push(DetalheBloqueioEnum.BloProcessoDevolvidaAntesAnalise);

    this.mesesList.push(MesesdoAnoEnum.Janeiro);
    this.mesesList.push(MesesdoAnoEnum.Fevereiro);
    this.mesesList.push(MesesdoAnoEnum.Marco);
    this.mesesList.push(MesesdoAnoEnum.Abril);
    this.mesesList.push(MesesdoAnoEnum.Maio);
    this.mesesList.push(MesesdoAnoEnum.Junho);
    this.mesesList.push(MesesdoAnoEnum.Julho);
    this.mesesList.push(MesesdoAnoEnum.Agosto);
    this.mesesList.push(MesesdoAnoEnum.Setembro);
    this.mesesList.push(MesesdoAnoEnum.Outubro);
    this.mesesList.push(MesesdoAnoEnum.Novembro);
    this.mesesList.push(MesesdoAnoEnum.Dezembro);

  }
}
