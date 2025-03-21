import { CertificadoraDigital } from 'src/app/shared/model/certificadora-digital';
import { PixMessageService } from './../../../shared/service/pix-message-service';
import { DrawerService } from '@albert/ui';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ConfiguracaoService } from '../../service/configuracao.service';
import { ParametrosGerais } from 'src/app/shared/model/parametros-gerais';
import { DIA_UTIL, MESES} from 'src/app/shared/model/enum/parametros-gerais';
import Seg from './../../model/seg'
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { TransacaoAgendadas } from 'src/app/shared/model/transacaoAgendadas';
import { CertificadoDigitalContatoComponent } from '../certificado-digital-contato/certificado-digital-contato.component';

@Component({
  selector: 'app-parametros-gerais',
  templateUrl: './parametros-gerais.component.html',
  styleUrls: ['./parametros-gerais.component.scss']
})

export class ParametrosGeraisComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private configService: ConfiguracaoService,
    private drawerService: DrawerService, private pixMessageService: PixMessageService, private translateService: TranslateService) { }

  form: FormGroup;
  formtrasacaoAgendada?: FormGroup;
  seg: Seg = new Seg();
  diaUtil = DIA_UTIL;
  meses = MESES;

  tab_geral: string = "tab_geral";
  tab_transacao_agendada: string = "tab_transacao_agendada";
  tab_selected: string = "tab_geral";

  trasacaoAgendadas: TransacaoAgendadas[] = [];
  trasacaoAgendadaform: TransacaoAgendadas;
  parametrosgerais: ParametrosGerais;

  get controls() {
    return this.form.controls;
  }

  get isNew() {
    return this.trasacaoAgendadaform?.qtdLimTrnSgo == null || this.trasacaoAgendadaform?.qtdLimTrnSgo === 0;
  }

  setRequired($event){
      if($event.target.checked){
        this.controls.diaEnvArqSta.setValidators(Validators.required)
        this.controls.diaEnvArqSta.updateValueAndValidity()
      }else{
        this.controls.diaEnvArqSta.clearValidators()
        this.controls.diaEnvArqSta.updateValueAndValidity()
      }
  }

  ngOnInit(): void {
    this.loadForm();
    this.criarFormTransacaoAgenda();
    this.loadParametros();
  }

  loadParametros(){
    const datePipe = new DatePipe("en-US");
    this.configService.carregarParametrosGerais().subscribe(data => {
      this.controls.saldoIdeal.setValue(data.saldoIdealContaPI);
      this.controls.percMin.setValue(data.percentualMinimoContaPI);
      this.controls.percMax.setValue(data.percentualMaximoContaPI);
      this.controls.campoSaldo.setValue(data.campoSaldoContaPI);
      this.controls.realizacaoAutomatica.setValue(data.aporteSaqueAutomaticoContaPI);
      this.controls.usuarioPSTA.setValue(data.usuarioPSTA);
      this.controls.senhaPSTA.setValue(data.senhaPSTA);
      this.controls.diaEnvArqSta.setValue(data.diaEnvArqSta);
      this.controls.flgEnvArqSta.setValue(data.flgEnvArqSta);
      this.controls.qtdMnuItvEnvAla.setValue(data.qtdMnuItvEnvAla);
      this.controls.qtdMnuItvCsuSdo.setValue(data.qtdMnuItvCsuSdo);
      this.controls.qtdMaxRegBol.setValue(data.qtdMaxRegBol);
      this.controls.geraConsultaSaldoAutomatico.setValue(data.geraConsultaSaldoAutomatico);
      this.controls.dataAtual.setValue(datePipe.transform(data.dataAtual, 'dd/MM/yyyy'));
      this.controls.entidadeParticipante.setValue(data.idEntidadeParticipante);
      this.controls.ambiente.setValue(data.idAmbienteConfiguracao);
      this.controls.exibeConfSalvaBoleto.setValue(data.flgExbCofSavBol);
      this.controls.partPossuiIndireto.setValue(data.partPossuiIndireto);
      this.controls.flagControleSessao.setValue(data.flagControleSessao);
      this.controls.tempoCallBackWebhook.setValue(data.temAtsIniCbkWbhSgs);
      this.controls.intervaloCallBackWebhook.setValue(data.itvExeCbkWbhSgs);
      this.controls.parametroTransacaoAgendada.setValue(data.parametroTransacaoAgendada);
      this.trasacaoAgendadas = data.parametroTransacaoAgendada;
      this.controls.horNtfVctCerDgl.setValue(data.horNtfVctCerDgl);
      this.controls.diaAtdNtfVctCerDgl.setValue(data.diaAtdNtfVctCerDgl);
      this.controls.certificadoraDigitalId.setValue(data.certificadoraDigital.id);
      this.controls.certificadoraDigitalIdCliente.setValue(data.certificadoraDigital.idCliente);
      this.controls.certificadoraDigitalSenhaCliente.setValue(data.certificadoraDigital.senhaCliente);
      this.controls.urlFrtOrq.setValue(data.urlFrtOrq);
      this.controls.dsc_nom_res_inf_pix.setValue(data.dscNomResInfPix);
      this.controls.dsc_ema_res_inf_pix.setValue(data.dscEmaResInfPix);
      this.controls.dsc_tel_res_inf_pix.setValue(data.dscTelResInfPix);
      this.controls.idCatPtiDict.setValue(data.idCatPtiDict);
      this.controls.itvMesCsuFra.setValue(data.itvMesCsuFra);
      this.parametrosgerais = data;
      })
    }

  loadForm() {
    this.form = this.formBuilder.group({
      saldoIdeal: [0, Validators.required],
      percMin: [0, Validators.required],
      percMax: [0, Validators.required],
      campoSaldo: ['', Validators.required],
      realizacaoAutomatica: [false, Validators.required],
      usuarioPSTA:[''],
      senhaPSTA:[0],
      diaEnvArqSta:[''],
      flgEnvArqSta:[false],
      qtdMnuItvEnvAla: [1],
      qtdMnuItvCsuSdo: [1],
      qtdMaxRegBol: [1],
      geraConsultaSaldoAutomatico:[false],
      exibeConfSalvaBoleto:[false],
      partPossuiIndireto:[false],
      flagControleSessao:[false],
      dataAtual:[''],
      entidadeParticipante:[1],
      ambiente:[''],
      tempoCallBackWebhook:[null],
      intervaloCallBackWebhook:[null],
      parametroTransacaoAgendada: this.trasacaoAgendadas,
      horNtfVctCerDgl: ['08:00', [Validators.required, Validators.pattern(/^(?:[01]\d|2[0-3]):[0-5]\d$/)]],
      diaAtdNtfVctCerDgl: [7, Validators.required],
      certificadoraDigitalId: [1, Validators.required],
      certificadoraDigitalIdCliente:[null],
      certificadoraDigitalSenhaCliente: [null],
      urlFrtOrq: [null],
      dsc_nom_res_inf_pix: [null],
      dsc_ema_res_inf_pix: [null],
      dsc_tel_res_inf_pix: [null],
      idCatPtiDict: [null, Validators.required],
      itvMesCsuFra: [6, Validators.required]
    });
  }

  private criarFormTransacaoAgenda() {
    this.formtrasacaoAgendada = this.formBuilder.group({
      horIniEnvLiq: [this.isNew ? null : this.trasacaoAgendadaform?.horIniEnvLiq, Validators.required],
      horFimEnvLiq: [this.isNew ? null : this.trasacaoAgendadaform?.horFimEnvLiq, Validators.required],
      qtdLimTrnSgo: [this.isNew ? null : this.trasacaoAgendadaform?.qtdLimTrnSgo, Validators.required]
    });

    if (this.isNew) {
      this.trasacaoAgendadaform = new TransacaoAgendadas();
      this.trasacaoAgendadaform.horIniEnvLiq = '';
      this.trasacaoAgendadaform.horFimEnvLiq = '';
      this.trasacaoAgendadaform.qtdLimTrnSgo = 0;
    }
  }

  onSave() {
    this.configService.atualizarParametrosGerais(this.getObject())
      .subscribe(() => {
        this.drawerService.close();
        this.pixMessageService.toastSuccess("Parâmetros atualizados com sucesso");
      });
  }

  private getObject(): ParametrosGerais {
    const retorno = new ParametrosGerais();
    // Controle conta pi
    retorno.aporteSaqueAutomaticoContaPI = this.controls.realizacaoAutomatica.value;
    retorno.campoSaldoContaPI = this.controls.campoSaldo.value;
    retorno.percentualMaximoContaPI = this.controls.percMax.value;
    retorno.percentualMinimoContaPI = this.controls.percMin.value;
    retorno.saldoIdealContaPI = this.controls.saldoIdeal.value;
    retorno.usuarioPSTA = this.controls.usuarioPSTA.value;
    retorno.senhaPSTA = this.controls.senhaPSTA.value;
    retorno.diaEnvArqSta = this.controls.diaEnvArqSta.value;
    retorno.flgEnvArqSta = this.controls.flgEnvArqSta.value;
    retorno.qtdMnuItvEnvAla = this.controls.qtdMnuItvEnvAla.value;
    retorno.qtdMnuItvCsuSdo = this.controls.qtdMnuItvCsuSdo.value;
    retorno.qtdMaxRegBol = this.controls.qtdMaxRegBol.value;
    retorno.geraConsultaSaldoAutomatico = this.controls.geraConsultaSaldoAutomatico.value;
    retorno.flgExbCofSavBol = this.controls.exibeConfSalvaBoleto.value;
    retorno.idEntidadeParticipante = this.controls.entidadeParticipante.value;
    retorno.idAmbienteConfiguracao = this.controls.ambiente.value;
    retorno.partPossuiIndireto = this.controls.partPossuiIndireto.value;
    retorno.flagControleSessao = this.controls.flagControleSessao.value;
    retorno.temAtsIniCbkWbhSgs = this.controls.tempoCallBackWebhook.value;
    retorno.itvExeCbkWbhSgs = this.controls.intervaloCallBackWebhook.value;
    retorno.parametroTransacaoAgendada = this.controls.parametroTransacaoAgendada.value;
    retorno.horNtfVctCerDgl = this.controls.horNtfVctCerDgl.value;
    retorno.diaAtdNtfVctCerDgl = this.controls.diaAtdNtfVctCerDgl.value;
    retorno.certificadoraDigital = this.newCertificadoraDigital();
    retorno.urlFrtOrq = this.controls.urlFrtOrq.value;
    retorno.dscNomResInfPix = this.controls.dsc_nom_res_inf_pix.value;
    retorno.dscEmaResInfPix = this.controls.dsc_ema_res_inf_pix.value;
    retorno.dscTelResInfPix = this.controls.dsc_tel_res_inf_pix.value;
    retorno.idCatPtiDict = this.controls.idCatPtiDict.value;
    retorno.itvMesCsuFra = this.controls.itvMesCsuFra.value;
    return retorno;
  }

  receiverList(returnLists){
    this.trasacaoAgendadas = returnLists;
  }

  deletarList(returnBolean): void{
    if(returnBolean === true){
      this.controls.parametroTransacaoAgendada.setValue(this.trasacaoAgendadas);
      this.configService.atualizarParametrosGerais(this.getObject())
      .subscribe(() => {
          this.pixMessageService.toastSuccess("Parâmetros atualizados com sucesso");
      }, error=>{
        this.loadParametros();
      })
    }
  }

  inserir(): void {
    const retornoTraAgen = new TransacaoAgendadas();
    retornoTraAgen.horIniEnvLiq = this.formtrasacaoAgendada.controls.horIniEnvLiq.value;
    retornoTraAgen.horFimEnvLiq = this.formtrasacaoAgendada.controls.horFimEnvLiq.value;
    retornoTraAgen.qtdLimTrnSgo = this.formtrasacaoAgendada.controls.qtdLimTrnSgo.value;
    if (retornoTraAgen.horIniEnvLiq.length === 5){
        retornoTraAgen.horIniEnvLiq = retornoTraAgen.horIniEnvLiq + ":00"
      }
    if (retornoTraAgen.horFimEnvLiq.length === 5){
      retornoTraAgen.horFimEnvLiq = retornoTraAgen.horFimEnvLiq + ":00"
      }
    this.trasacaoAgendadas.push(retornoTraAgen);
    this.controls.parametroTransacaoAgendada.setValue(this.trasacaoAgendadas);

    this.configService.atualizarParametrosGerais(this.getObject())
    .subscribe(() =>
     {
        this.pixMessageService.toastSuccess("Parâmetros atualizados com sucesso");
    }, error=>{
      const index = this.trasacaoAgendadas.indexOf(retornoTraAgen);
      this.trasacaoAgendadas.splice(index);
      this.controls.parametroTransacaoAgendada.setValue(this.trasacaoAgendadas);
      this.pixMessageService.toastErro("Falha na inclusão do Parâmetro");
    })
  }

  onTrocarTab(event) {
    this.tab_selected = event;
  }

  newCertificadoraDigital() :CertificadoraDigital {
    return new CertificadoraDigital(
      this.controls.certificadoraDigitalId.value,
      this.controls.certificadoraDigitalIdCliente.value,
      this.controls.certificadoraDigitalSenhaCliente.value);
  }

  gerenciarContato(){
    this.drawerService.create({
      component: CertificadoDigitalContatoComponent,
      size: 'medium',
      title: this.translateService.instant('campo.gerEmail')
    });

  }
}
