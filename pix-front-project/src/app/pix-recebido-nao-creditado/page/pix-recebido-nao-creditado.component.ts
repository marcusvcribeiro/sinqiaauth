import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';
import Seg from '../model/seg';
import { ParametrosGlobaisService } from '../../shared/service/parametros-globais.service';
import { TipoAlerta } from '../../shared/model/enum/tipo-alerta';
import { LogOrquestrador } from 'src/app/shared/model/log-orquestrador';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { BottomSheetService } from '@albert/layout';
import { DrawerService } from '@albert/ui';
import { PixRecebidoNaoCreditadoService } from '../service/pix-recebido-nao-creditado.service';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { TIPO_NOTIFICACAO_MENSAGEM_LIST } from 'src/app/shared/model/enum/situacao-mensagem';
import { TIPO_MENSAGEM_LIST } from 'src/app/shared/model/enum/tipo-mensagem';
import { PixNaoCreditadoCCO } from 'src/app/shared/model/pix-nao-creditado-cco';
import { DetalhePixNaoCreditadoComponent } from '../component/detalhe-pix-nao-creditado/detalhe-pix-nao-creditado.component';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { PixNaoCreditadoFiltro } from 'src/app/shared/model/pix-nao-creditado-filtro-';
import { SegService } from 'src/app/seg/services/seg.service';
import { PixNaoCreditadoConsultaFiltro } from 'src/app/shared/model/pix-nao-creditado-consulta-filtro';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { ShortcutEventOutput } from 'ng-keyboard-shortcuts';
import { TranslateService } from '@ngx-translate/core';
import { PixNaoCreditadoReenvio } from 'src/app/shared/model/pix-nao-creditado-reenvio';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';



@Component({
  selector: 'app-pix-recebido-nao-creditado',
  templateUrl: './pix-recebido-nao-creditado.component.html',
  styleUrls: ['./pix-recebido-nao-creditado.component.scss']
})
export class PixRecebidoNaoCreditadoComponent implements OnInit {
  //@Output() keyPressed = new EventEmitter();
  @Output() selecionados: EventEmitter<PixNaoCreditadoCCO[]> = new EventEmitter();
  filtroAvancadoForm: FormGroup;


  statusList: String[] = new Array("Ativo","Inativo")
  isRefreshing: boolean;
  timerId;
  isDisabled: boolean = true;
  private tempo = 5000;
  private unsubscribe$ = new Subject();
  filtro$: Subject<PixNaoCreditadoConsultaFiltro> = new BehaviorSubject(null);
  tipoAlertaExportar$: Subject<number> = new Subject<number>();
  data = new Date;
  seg: Seg = new Seg();
  public ds: SinqiaDataSource<PixNaoCreditadoCCO>;
  situacaoMensagemList = TIPO_NOTIFICACAO_MENSAGEM_LIST;
  tipoMensagemList = TIPO_MENSAGEM_LIST;
  creditoDebito = [{label: 'C', value: 'C'}, {label: 'D', value: 'D'}];
  selected: PixNaoCreditadoCCO;
  excelNome: string = 'PixNaoCreditado';
  filtrarMensagem: boolean = true;
  dataSource = {listGeneric:[{
    itemLista1:"",
    itemLista2:"",
    itemLista3:"",
    itemLista4:"",
    itemLista5:"",
    itemLista6:"",
    itemLista7:"",
    itemLista8:"",
    itemLista9:""
  }]};
  lista: PixNaoCreditadoCCO[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private bottomSheetService: BottomSheetService,
    private drawerService: DrawerService,
    private servico: PixRecebidoNaoCreditadoService,
    private segService: SegService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService) { }
    
    
  shortcuts = [];
  ngOnInit(): void {
    
    this.criarFormFiltros();
    this.criarDataSourceParam();

    const {idEveMsg, situacao }  = this.filtroAvancadoForm.controls;
    idEveMsg.disable();    
  }
  
  onPesquisar() {
    this.filtroAvancadoForm.setValue(this.filtroAvancadoForm.getRawValue());
    this.ds.filter()
  }
      
      
  pesquisarByKey(){
    this.onPesquisar();
  }
  criarDataSourceParam() {
      this.ds = SinqiaDataSource.of<PixNaoCreditadoCCO>()
            .withFilter(this.filtroAvancadoForm)
            .fromService(this.servico.listPixNaoCreditadoPaginado.bind(this.servico))
            .multiSelectable()
            .build();
  }
  converter(): PixNaoCreditadoFiltro {
    if (this.filtroAvancadoForm.getRawValue()) {
      return {
        dataInicio: DateFormatHelper.toUrlDate(this.filtroAvancadoForm.getRawValue().dataInicio),
        dataFim: DateFormatHelper.toUrlDate(this.filtroAvancadoForm.getRawValue().dataFim),
        creditado: null,
        idSituacao: null,
        mensagem: null,
        idTipoCobranca: this.filtroAvancadoForm.getRawValue().idTipoCobranca,
        idUniOpe: this.filtroAvancadoForm.getRawValue().idUniOpe,
        instituicao: this.filtroAvancadoForm.getRawValue().instituicao,
        valor: this.filtroAvancadoForm.getRawValue().valor,
        chaveEnderecamento: this.filtroAvancadoForm.getRawValue().dscChvEnd,
        numSeq: this.filtroAvancadoForm.getRawValue().numSeq,
        dataInclusao: this.filtroAvancadoForm.getRawValue().dataInclusao
      };
    }
  }
  
  private criarFormFiltros(): void {
    this.filtroAvancadoForm = this.formBuilder.group({
      // idEveMsg: [],
      // situacao: [],
      // valor: [],
      // dataFim: [this.data, Validators.required], // TODO: verificar o problema de quando o date picker inicia com valor
      // dataInicio:  [this.data, Validators.required] , // TODO: verificar o problema de quando o date picker inicia com valor
      // idTipoCobranca:[],
      // dtLog:[],
      // instituicao: [],
      // idUniOpe: [],
      // dscChvEnd: [],
      // numSeq: [],
      // dataInclusao: []
    });
  }
  onCheck(event, mensagem) {
    if (event) {
      this.ds.selection.toggle(mensagem);
    }
    this.selecionados.emit(this.ds.selection.selected);
  }

  onCheckAll(mensagens) {
    this.ds.selectAllToggle(mensagens);
    this.selecionados.emit(this.ds.selection.selected);

  }

  async onDetalhe(mensagem: PixNaoCreditadoCCO) {
    this.selected = mensagem;
     const {bottomSheetComponent} = await this.bottomSheetService.create({
       title: this.translateService.instant('titulo.pixNaoCreditado'),
       component: DetalhePixNaoCreditadoComponent,
       componentProps: { mensagem: mensagem}
     });
     bottomSheetComponent.instance.close.subscribe(() => {
      this.selected = null;
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.bottomSheetService.close();
  }
  onReenviar() {
    if(this.ds.selection.selected.length > 0) {
      const listPixReenvio: PixNaoCreditadoReenvio = new PixNaoCreditadoReenvio();
      let limit = 200;
      this.ds.selection.selected.forEach(element => {
        listPixReenvio.listProcessId.push(element.idUniOpe);
        limit--;

        if(limit === 0){
          this.servico.reenviar(listPixReenvio).subscribe(() => {
            this.pixMessageService.toastSuccess('mensagem.operacaoSucessoParcial');
          });

          listPixReenvio.listProcessId = [];
          limit = 200;
        }
      });
      this.servico.reenviar(listPixReenvio).subscribe(() => {
        this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
        this.onPesquisar();
        this.ds.selection.clear();
      });
    }else {
      this.pixMessageService.toastInfo('validacoes.listaSelecionadosVazia');
    }
  }
  
  onGerarExcel() {
    this.excelNome = "DicionarioSenha";
    this.dataSource = {listGeneric: [{
      itemLista1:"Seq.", 
      itemLista2:"Código",
      itemLista3:"D/C",
      itemLista4:"Situação",
      itemLista5:"Data Hora Inclusão",
      itemLista6:"Situação",
      itemLista7:"End to end Id",
      itemLista8:"Valor Transação",
      itemLista9:"Chave de endereçamento",
    }]};
    this.lista.forEach(item => {
      this.dataSource.listGeneric.push({
        itemLista1:item.numSequencial.toString(),
        itemLista2:item.idEveMsg,
        itemLista3:item.idTipoCobranca,
        itemLista4:item.tipoMengemNotificada,
        itemLista5:item.dataInclusao.toString(),
        itemLista6:item.flgRvoMsgDeadLetter,
        itemLista7:item.idUniOpe,
        itemLista8:item.valor.toString(),
        itemLista9:item.dscErr})
    })
    this.segService
    .exportarExcel(this.dataSource, this.excelNome)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res)=> DownloadFile.downloadFile(res));
  }
}
