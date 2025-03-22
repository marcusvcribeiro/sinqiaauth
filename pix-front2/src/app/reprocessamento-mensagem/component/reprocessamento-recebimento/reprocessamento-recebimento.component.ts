import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { MensagemErroRecebimento, MensagemErroRecebimentoID } from 'src/app/shared/model/mensagem-erro-recebimento';
import { ReprocessamentoMensagemService } from '../../service/reprocessamento-mensagem.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DrawerService } from '@albert/ui';
import { TranslateService } from '@ngx-translate/core';
import { MensagemVisualizacaoXmlComponent } from '../visualizacao/mensagem-visualizacao-xml/mensagem-visualizacao-xml.component';
import { Seg } from '../../model/seg';

@Component({
  selector: 'app-reprocessamento-recebimento',
  templateUrl: './reprocessamento-recebimento.component.html',
})
export class ReprocessamentoRecebimentoComponent implements OnInit, OnChanges {

  @Input() dataAutorizacao: Date;
  filtroForm: FormGroup;
  ds: SinqiaDataSource<MensagemErroRecebimento>;
  transacoes: MensagemErroRecebimento[];

  seg: Seg = new Seg();
  constructor(
    private reprocessamentoMensagemService: ReprocessamentoMensagemService,
    private pixMessageService: PixMessageService,
    private formBuilder: FormBuilder,
    private drawerService: DrawerService,
    private translateService: TranslateService    ) { }

  ngOnInit() {
    this.criarFiltro();
    this.criarDataSource();
  }

  ngOnChanges(change: SimpleChanges) {
    const { filtro } = change;
    if (filtro && this.ds) {
      this.filtroForm.patchValue({dataAutorizacao: this.dataAutorizacao});
      this.ds.filter();
    }
  }

  onReprocessar() {
    if (this.ds.selection.selected.length > 0) {
      const ids = this.ds.selection.selected.map(v => new MensagemErroRecebimentoID({
        numeroSequencialMensagem: v.numeroSequencialMensagem,
        dataReferenciaMensagem: v.dataReferenciaMensagem,
        idEntidadeParticipante: v.idEntidadeParticipante
      }));
      this.reprocessamentoMensagemService
        .reprocessarMensagesRecebimento(ids)
        .subscribe(v => {
          this.pixMessageService.toastSuccess('reprocessamento.realizado');
          this.ds.selection.clear();
          this.ds.filter();
        });
    }
  }

  onCheck(event, mensagem) {
    if (event) {
      this.ds.selection.toggle(mensagem);
    }
  }

  onCheckAll() {
    if (this.ds && this.transacoes) {
      this.ds.selectAllToggle(this.transacoes);
    }
  }

  private criarFiltro() {
    this.filtroForm = this.formBuilder.group({
      dataAutorizacao: [this.dataAutorizacao, Validators.required],
    });
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<MensagemErroRecebimento>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(d => this.reprocessamentoMensagemService
        .listarReprocessamentoRecebimento(this.dataAutorizacao)
        .pipe(tap(v => this.transacoes = v)))
      .multiSelectable()
      .build();
  }

  onVisualizarXml(mensagem) {
    this.drawerService.create({
      component: MensagemVisualizacaoXmlComponent,
      size: 'medium',
      title: this.translateService.instant('botao.visualizarXml'),
      componentProps: { descricaoMensagem: mensagem.descricaoMensagem },
    });
  }
}
