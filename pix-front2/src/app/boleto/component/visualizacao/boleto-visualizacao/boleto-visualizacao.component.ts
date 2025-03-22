import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { DrawerService } from '@albert/ui';
import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of, Subject, zip } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { BoletoHelper } from 'src/app/boleto/helper/boleto-helper';
import { SidenavItem } from 'src/app/shared/component/sidenav/sidenav.component';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { BoletoGrupo, BoletoConsulta, BoletoTag } from 'src/app/shared/model/boleto';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { BoletoVisualizacaoXmlComponent } from '../boleto-visualizacao-xml/boleto-visualizacao-xml.component';
import { MensagemTransacaoComponent } from '../mensagem-transacao/mensagem-transacao.component';

@Component({
  selector: 'app-boleto-visualizacao',
  templateUrl: './boleto-visualizacao.component.html',
  styleUrls: ['./boleto-visualizacao.component.scss']
})
export class BoletoVisualizacaoComponent implements OnInit {

  @Input() transacao: BoletagemConsulta;
  @Input() transacaoRelacionada: MensagemTransacao;
  boleto$: Observable<BoletoGrupo>;
  sideNav$: Observable<SidenavItem[]>;
  idBoletoSelecionado$: Observable<String>;
  hasSideNav = false;
  isCamt052 = false;
  boletoGrupo = [];
  camt052;

  constructor(
    private boletoService: BoletagemConsultaService,
    private drawerService: DrawerService,
    private translateService: TranslateService) {
  }

  ngOnInit() {
    this.construirBoleto();
    this.relacionarTransacoes();
    this.capturarHashCamt();
  }
  construirBoleto() {
    this.boleto$ = zip(this.carregarEstrutura(), this.carregarDados())
      .pipe(
        map((values: any) => {
          const estrutura: BoletoGrupo = values[0];
          const dados: BoletoGrupo = values[1];
          const boleto = BoletoHelper.criarVisualizacao(estrutura, dados);

          this.hasSideNav = BoletoHelper.hasRepeticao(estrutura);

          if (this.hasSideNav) {
            this.sideNav$ = of(BoletoHelper.criarSideNav(boleto));
          }
          if(this.transacao.codigoMensagem == "camt.052"){
            this.isCamt052 = true;
          }

          return boleto;
        })
      );
  }

  relacionarTransacoes() {
    if (this.transacaoRelacionada) {
      this.transacao = new BoletagemConsulta({});
      this.transacao.dataReferencia = this.transacaoRelacionada.dataReferencia;
      this.transacao.numeroSequenciaTransacao = this.transacaoRelacionada.idTransacao;
      this.transacao.codigoMensagem = this.transacaoRelacionada.idMensagem;
      this.transacao.idSistemaEnvioMensagem = this.transacaoRelacionada.idSistemaEnvioMensagem;
    }
  }

  onVisualizarXml() {
    this.drawerService.create({
      component: BoletoVisualizacaoXmlComponent,
      size: 'medium',
      title: this.translateService.instant('botao.visualizarXml'),
      componentProps: { dataTransacao: this.transacao.dataReferencia, idTransacao: this.transacao.numeroSequenciaTransacao, codMensagem: this.transacao.codigoMensagem, idSistemaEnvioMensagem: this.transacao.idSistemaEnvioMensagem },
    });
  }

  onVisualizarRelacionadas() {
    this.drawerService.create({
      component: MensagemTransacaoComponent,
      size: 'medium',
      title: this.translateService.instant('botao.mensagemTransacao'),
      componentProps: { dataTransacao: this.transacao.dataReferencia, idTransacao: this.transacao.numeroSequenciaTransacao },
    });
  }

  carregarEstrutura() {
    return this.boletoService.listarBoletoCampos(
      new BoletoConsulta(this.transacaoRelacionada ? this.transacaoRelacionada : this.transacao, false));
  }

  carregarDados() {
    if (this.transacaoRelacionada) {
      return this.boletoService.listarValoresBoletoRelacionado(this.transacaoRelacionada.idMensagem,
        this.transacaoRelacionada.dataReferencia, this.transacaoRelacionada.idTransacao, this.transacaoRelacionada.idSistemaEnvioMensagem);
    }
    return this.boletoService.listarValoresBoleto(this.transacao.dataReferencia, this.transacao.numeroSequenciaTransacao);
  }

  private unsubscribe$ = new Subject();
  onDownloadCamt(){
    this.boletoService.exportarCamt052(this.camt052).pipe(takeUntil(this.unsubscribe$))
    .subscribe(res => DownloadFile.downloadFile(res));

  }

  capturarHashCamt(){
    this.boleto$.subscribe(boleto => {
      this.boletoGrupo = boleto.tags;
      let grupos = boleto.grupos[0].grupos[0];
      if(grupos.tags.length == 0){
        grupos = grupos.grupos[0];
      }
      let tags: BoletoTag[] = new Array();
      if(grupos.label == 'camt.052'){
         tags = grupos.grupos[1].tags;
      }
        tags.forEach(tag => {
          if(tag.id === "AddtlRptInf"){
            this.camt052 = tag.valorTag;
          }
        })
    });
  }
  onNavigate(item) {
    const id = item.hash;
    this.idBoletoSelecionado$ = of(id);
  }
}
