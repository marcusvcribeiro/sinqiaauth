import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { Transacao } from 'src/app/shared/model/transacao';
import { ReprocessamentoMensagemService } from '../../service/reprocessamento-mensagem.service';
import { MensagemErroFormatacaoID } from 'src/app/shared/model/mensagem-erro-formatacao';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seg } from '../../model/seg';

@Component({
  selector: 'app-reprocessamento-formatacao',
  templateUrl: './reprocessamento-formatacao.component.html',
})
export class ReprocessamentoFormatacaoComponent implements OnInit, OnChanges {

  @Input() dataAutorizacao: Date;
  filtroForm: FormGroup;
  ds: SinqiaDataSource<Transacao>;
  transacoes: Transacao[];

  seg: Seg = new Seg();
  constructor(
    private reprocessamentoMensagemService: ReprocessamentoMensagemService,
    private pixMessageService: PixMessageService,
    private formBuilder: FormBuilder) { }

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
      const ids = this.ds.selection.selected.map(v => new MensagemErroFormatacaoID({
        numeroSenquenciaTransacao: v.numeroSequenciaTransacao,
        dataReferenciaTransacao: v.dataReferencia
      }));
      this.reprocessamentoMensagemService
        .reprocessarMensagesFormatacao(ids).subscribe(v => {
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
    this.ds = SinqiaDataSource.of<Transacao>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(d => this.reprocessamentoMensagemService
        .listarReprocessamentoFormatacao(this.dataAutorizacao)
        .pipe(tap(v => this.transacoes = v)))
      .multiSelectable()
      .build();
  }
}
