import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfiguracaoService } from 'src/app/configuracao/service/configuracao.service';
import { ConsultaMensagemService } from 'src/app/consulta-mensagem/service/consulta-mensagem.service';
import { ParametrosGerais } from 'src/app/shared/model/parametros-gerais';
import { TransacaoAgendadas } from 'src/app/shared/model/transacaoAgendadas';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';

@Component({
  selector: 'app-parametro-form-transacaoagendada',
  templateUrl: './parametro-form-transacaoagendada.component.html',
  styleUrls: ['./parametro-form-transacaoagendada.component.scss']
})

export class ParametroFormTransacaoagendadaComponent implements OnInit {

  @Input() edit?: TransacaoAgendadas;
  @Input() parametro:  ParametrosGerais;
  @Output() event =  new EventEmitter();
  lista: TransacaoAgendadas;
  
  form: FormGroup;

  constructor(
    private formBuild: FormBuilder, private configService: ConfiguracaoService,
    private drawerService: DrawerService, private pixMessageService: PixMessageService, 
    private consultaMensagemService: ConsultaMensagemService) { }

  get controls() {
    return this.form.controls;
  }

  get isInsert(){
    return this.edit == undefined && this.edit == null;
  }

  ngOnInit(): void {
    this.instanceFormGroupForUsuario();
  }

  private instanceFormGroupForUsuario() {
    this.form = this.formBuild.group({
      horIniEnvLiq: [this.isInsert? '' : this.edit?.horIniEnvLiq, Validators.required],
      horFimEnvLiq: [this.isInsert? '' : this.edit?.horFimEnvLiq, Validators.required],
      qtdLimTrnSgo: [this.isInsert? 0: this.edit?.qtdLimTrnSgo, Validators.required]
    });
  }

  onSave() {
    this.lista = new TransacaoAgendadas();
    this.lista.horIniEnvLiq = this.form.controls.horIniEnvLiq.value;
    this.lista.horFimEnvLiq = this.form.controls.horFimEnvLiq.value;
    this.lista.qtdLimTrnSgo = this.form.controls.qtdLimTrnSgo.value;
    if (this.lista.horIniEnvLiq.length === 5){
        this.lista.horIniEnvLiq = this.lista.horIniEnvLiq + ":00"
      }
    if (this.lista.horFimEnvLiq.length === 5){
        this.lista.horFimEnvLiq = this.lista.horFimEnvLiq + ":00"
      }
    var index = this.parametro.parametroTransacaoAgendada.indexOf(this.edit);
    if (index >-1){
      this.parametro.parametroTransacaoAgendada.splice(index, 1)
    }
    this.parametro.parametroTransacaoAgendada.push(this.lista);
    
    this.configService.atualizarParametrosGerais(this.getObject())
      .subscribe(() => {
        this.drawerService.close();
        this.event.emit();
        this.pixMessageService.toastSuccess("Parâmetros atualizados com sucesso");
      }, error=>{
        var ind = this.parametro.parametroTransacaoAgendada.indexOf(this.lista);
        if (ind >-1){
          this.parametro.parametroTransacaoAgendada.splice(ind, 1)
        }
        this.parametro.parametroTransacaoAgendada.push(this.edit);
        this.pixMessageService.toastErro("Falha na inclusão do Parâmetro");
      });
  }

  private getObject(): ParametrosGerais {
    const retorno = new ParametrosGerais();
    retorno.aporteSaqueAutomaticoContaPI = this.parametro.aporteSaqueAutomaticoContaPI;
    retorno.campoSaldoContaPI = this.parametro.campoSaldoContaPI;
    retorno.percentualMaximoContaPI = this.parametro.percentualMaximoContaPI;
    retorno.percentualMinimoContaPI = this.parametro.percentualMinimoContaPI;
    retorno.saldoIdealContaPI = this.parametro.saldoIdealContaPI;
    retorno.usuarioPSTA = this.parametro.usuarioPSTA;
    retorno.senhaPSTA = this.parametro.senhaPSTA;
    retorno.diaEnvArqSta = this.parametro.diaEnvArqSta;
    retorno.flgEnvArqSta = this.parametro.flgEnvArqSta;
    retorno.qtdMnuItvEnvAla = this.parametro.qtdMnuItvEnvAla;
    retorno.qtdMnuItvCsuSdo = this.parametro.qtdMnuItvCsuSdo;
    retorno.qtdMaxRegBol = this.parametro.qtdMaxRegBol;
    retorno.geraConsultaSaldoAutomatico = this.parametro.geraConsultaSaldoAutomatico;
    retorno.flgExbCofSavBol = this.parametro.flgExbCofSavBol;
    retorno.idEntidadeParticipante = this.parametro.idEntidadeParticipante;
    retorno.idAmbienteConfiguracao = this.parametro.idAmbienteConfiguracao;
    retorno.partPossuiIndireto = this.parametro.partPossuiIndireto;
    retorno.flagControleSessao = this.parametro.flagControleSessao;
    retorno.temAtsIniCbkWbhSgs = this.parametro.temAtsIniCbkWbhSgs;
    retorno.itvExeCbkWbhSgs = this.parametro.itvExeCbkWbhSgs;
    retorno.parametroTransacaoAgendada = this.parametro.parametroTransacaoAgendada;
    return retorno;
  }
  

}
