import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ReprocessamentoSaida } from 'src/app/shared/model/reprocessamento-saida';
import { ReprocessamentoMensagemService } from '../../service/reprocessamento-mensagem.service';
import { MensagemSaida } from 'src/app/shared/model/reprocessa-erro-saida';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seg } from '../../model/seg';

@Component({
  selector: 'app-reprocessamento-repositorio-saida',
  templateUrl: './reprocessamento-repositorio-saida.component.html',
})
export class ReprocessamentoRepositorioSaidaComponent implements OnInit, OnChanges {

  @Input() dataAutorizacao: Date;
  filtroForm: FormGroup;
  public ds: SinqiaDataSource<ReprocessamentoSaida>;

  seg: Seg = new Seg();

  constructor(
    private reprocessamentoService: ReprocessamentoMensagemService,
    private pixMessageService: PixMessageService,
    private formBuilder: FormBuilder
    ) { }

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
      const selecionados = this.ds.selection.selected.map(v => new MensagemSaida({
        dataReferenciaRepositorioSaida: v.dataReferenciaRepositorioSaida,
        numSequenciaRepositorioSaida: v.numSequenciaRepositorioSaida
      }));
      this.reprocessamentoService.reprocessarMensagemSaida(selecionados).subscribe(() => {
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
    this.ds = SinqiaDataSource.of<ReprocessamentoSaida>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(d => this.reprocessamentoService.listarReprocessamentoRepositorioSaida(this.filtroForm.getRawValue().dataAutorizacao))
      .multiSelectable()
      .build();
  }

}
