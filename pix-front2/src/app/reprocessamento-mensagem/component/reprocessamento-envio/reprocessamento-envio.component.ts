import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ReprocessamentoEnvio } from 'src/app/shared/model/reprocessamento-envio';
import { ReprocessamentoMensagemService } from '../../service/reprocessamento-mensagem.service';
import { MensagemEnvio } from 'src/app/shared/model/reprocessa-erro-envio';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seg } from '../../model/seg';

@Component({
  selector: 'app-reprocessamento-envio',
  templateUrl: './reprocessamento-envio.component.html',
})
export class ReprocessamentoEnvioComponent implements OnInit, OnChanges {

  @Input() dataAutorizacao: Date;
  filtroForm: FormGroup;
  public ds: SinqiaDataSource<ReprocessamentoEnvio>;

  seg: Seg = new Seg();

  constructor(
    private reprocessamentoService: ReprocessamentoMensagemService,
    private pixMessageService: PixMessageService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.criarFiltro();
    this.criarDataSource();
  }

  ngOnChanges(change: SimpleChanges) {
    const { dataAutorizacao } = change;
    if (dataAutorizacao && this.ds) {
      this.filtroForm.patchValue({dataAutorizacao: this.dataAutorizacao});
      this.ds.filter();
    }
  }

  onReprocessar() {
    if (this.ds.selection.selected.length > 0) {
      const selecionados = this.ds.selection.selected.map(v => new MensagemEnvio({
        dataReferencia: v.dataReferencia,
        numSequenciaTransacaoMensagem: v.numSequenciaTransacaoMensagem
      }));
      this.reprocessamentoService.reprocessarMensagemEnvio(selecionados).subscribe(() => {
        this.pixMessageService.toastSuccess('reprocessamento.realizado');
        this.ds.selection.clear();
        this.ds.filter();
      });
    }
  }

  private criarFiltro() {
    this.filtroForm = this.formBuilder.group({
      dataAutorizacao: [this.dataAutorizacao, Validators.required],
    });
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<ReprocessamentoEnvio>()
      .withFilter(this.filtroForm)
      .fromNonPageableService((d) => {
        return this.reprocessamentoService.listarReprocessamentoEnvio(this.dataAutorizacao);
      })
      .multiSelectable()
      .build();
  }

}
