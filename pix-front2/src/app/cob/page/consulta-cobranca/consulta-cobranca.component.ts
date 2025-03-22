import { BottomSheetService } from '@albert/layout';
import { DrawerService } from '@albert/ui';
import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import DateComponent from '@fullcalendar/core/component/DateComponent';
import * as moment from 'moment';
import { Subject } from 'rxjs';
import { DetalheConsultaMensagemComponent } from 'src/app/consulta-mensagem/component/detalhe-consulta-mensagem/detalhe-consulta-mensagem.component';
import { ConsultaMensagemService } from 'src/app/consulta-mensagem/service/consulta-mensagem.service';
import { Parametro } from 'src/app/seg/model/parametro';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { CobDescontoDatafixa } from 'src/app/shared/model/cob-desc-data-fixa';
import { CobrancaImediata } from 'src/app/shared/model/cobranca-imediata';
import { CobrancaVencimento } from 'src/app/shared/model/cobranca-vencimento';
import { ConsultaCobrancaFilter } from 'src/app/shared/model/consulta-cob-filter';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { ConsultaMensagem } from 'src/app/shared/model/consulta-mensagem';
import { SIM_NAO_LIST } from 'src/app/shared/model/enum/combo-sim-nao';
import { SITUACAO_COB_LIST } from 'src/app/shared/model/enum/situacao-cob';
import { SITUACAO_ITG_COB_LIST } from 'src/app/shared/model/enum/situacao-itg-cobranca';
import { TipoCob, TIPO_COB_LIST } from 'src/app/shared/model/enum/tipo-cob';
import { InformacoesAdicionais } from 'src/app/shared/model/info-adicionais';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { DetalheConsultaCobrancaComponent } from '../../component/detalhe-consulta-cobranca/detalhe-consulta-cobranca.component';
import { DetalheCopiaColaComponent } from '../../component/detalhe-copia-cola/detalhe-copia-cola.component';
import { DetalheImediataComponent } from '../../component/detalhe-imediata/detalhe-imediata.component';
import { DetalheVencimentoComponent } from '../../component/detalhe-vencimento/detalhe-vencimento.component';
import Seg from '../../model/seg';
import { ConsultaCobrancaService } from '../../service/consulta-cobranca.service';


@Component({
  selector: 'app-consulta-cobranca',
  templateUrl: './consulta-cobranca.component.html',
  styleUrls: ['./consulta-cobranca.component.scss']
})
export class ConsultaCobrancaComponent implements OnInit, OnDestroy {

  private unsubscribe$ = new Subject();

  filtroAvancadoForm: FormGroup;
  statusList: String[] = new Array("Ativo","Inativo")
  tipoCobList = TIPO_COB_LIST;
  tipoSituacaoList = SITUACAO_COB_LIST;
  simNaoList = SIM_NAO_LIST;
  situacaoItgList = SITUACAO_ITG_COB_LIST;
  eventEmitterGrupo = new EventEmitter();
  parametro: Parametro;
  cobImediata: CobrancaImediata;
  cobVencimento: CobrancaVencimento;
  infAdicionais: InformacoesAdicionais[]
  dscDtFixa: CobDescontoDatafixa[]
  cobLogOcorrencia: CobDescontoDatafixa[]
  data = new Date;

  public ds: SinqiaDataSource<ConsultaCobranca>;
  public dsImediata: SinqiaDataSource<CobrancaImediata>;
  seg: Seg = new Seg();
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private consultaMensagemService: ConsultaMensagemService,
    private consultaCobrancaService: ConsultaCobrancaService,
    private bottomSheetService: BottomSheetService,
    private drawerService: DrawerService
  ) { }

  ngOnInit(): void {
    this.criarDataSource();
    this.criarFormFiltros();
    console.log(this.data)
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.bottomSheetService.close();
  }

  private criarFormFiltros(): void {
    this.filtroAvancadoForm = this.formBuilder.group({
      revisao: [],
      dataInicio:  [this.data, Validators.required] , // TODO: verificar o problema de quando o date picker inicia com valor
      dataFim: [this.data, Validators.required], // TODO: verificar o problema de quando o date picker inicia com valor
      idSituacaoCobranca: [],
      idTipoCobranca: [],
      idFlgApiPix: [],
      idIntCob: [],
      chave: [],
      idCpfCnpjRec: [],
      idCpfCnpjDev: [],
      idVlrOriginalMaior: [],
      idVlrOriginalMenor: [],
      txid: [],
      vlrOriginal: [],
      tokenAcesso: [],
      usuRec: [],
      nomeRec: [],
      nomeDev: [],
      solPag: [],
      dscCopiaCola: [],
      cepRec: [],
      dtCriacaoCob: []
    });
  }


  criarDataSource() {
    this.ds = SinqiaDataSource.of<ConsultaCobranca>()
      .fromService((d) => {
      var valor =  this.consultaCobrancaService.listarCobrancas(this.filtroAvancadoForm.getRawValue(),d, "", "");
      return valor
      }) .multiSelectable()
      .build();
  }

  pesquisar() {
    console.log(this.filtroAvancadoForm.getRawValue());
    this.filtroAvancadoForm.setValue(this.filtroAvancadoForm.getRawValue());
    this.ds.filter()
  }
  onDetalhew(cobranca: ConsultaCobranca) {
    this.bottomSheetService.create({
      component: DetalheConsultaMensagemComponent,
      componentProps: { cobranca }
    });
  }

  onCobranca(cobranca: ConsultaCobranca) {
    if (cobranca.dscTipCob.toUpperCase()==="IMEDIATA"){
      this.consultaCobrancaService.listarImediataDefault(cobranca).subscribe(data  => {
        this.cobImediata = data
        this.drawerService.create({
          component: DetalheImediataComponent,
          size: 'small',
          componentProps: { event: this.eventEmitterGrupo, cobrancaImediataa: this.cobImediata , consultaCobranca: cobranca}
        });
      });   
    }else{
      this.consultaCobrancaService.listarVencimentoDefault(cobranca).subscribe(data  => {
        this.cobVencimento = data
        this.drawerService.create({
          component: DetalheVencimentoComponent,
          size: 'small',
          componentProps: { event: this.eventEmitterGrupo, cobrancaVencimento: this.cobVencimento , consultaCobranca: cobranca}
        });
      })
    };
  }

  onCopiaCola(cobranca: ConsultaCobranca) { 
        this.drawerService.create({
          component: DetalheCopiaColaComponent,
          size: 'small',
          componentProps: { descricao: cobranca.dscCopiaCola}
        });
      }  
  



  onDetalhe(cobranca: ConsultaCobranca) {
    this.bottomSheetService.create({
      component: DetalheConsultaCobrancaComponent,
      componentProps: { cobranca: cobranca}
    });
  }

  onReprocessar() {
    if (this.ds.selection.selected.length > 0) {
      const selecionados = this.ds.selection.selected.map(v => new ConsultaCobrancaFilter({
        tokenAcesso: v.tokenAcesso,
        revisao: v.rev,
        txid: v.txid
      }));
      this.consultaCobrancaService.reprocessar(selecionados).subscribe(() => {
        this.consultaCobrancaService.toastSuccess('reprocessamento.realizado');
        this.pesquisar()
        this.ds.selection.clear();
     
      });
    }
  }

  
  obtemImediata(cobranca: ConsultaCobranca) {
    return this.consultaCobrancaService.listarImediataDefault(cobranca).subscribe(data => this.cobImediata = data);
  }

}