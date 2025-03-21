import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinqiaDataSource } from '../../../shared/helper/sinqia-data-source';
import { MensagemRepositorioEntrada } from '../../../shared/model/mensagem-repositorio-entrada';
import { PixMessageService } from '../../../shared/service/pix-message-service';
import { Seg } from '../../model/seg';
import { ReprocessamentoMensagemService } from '../../service/reprocessamento-mensagem.service';

@Component({
  selector: 'app-reprocessamento-repositorio-entrada',
  templateUrl: './reprocessamento-repositorio-entrada.component.html',
})
export class ReprocessamentoRepositorioEntradaComponent implements OnInit, OnChanges {

  @Input() dataAutorizacao: Date;
  filtroForm: FormGroup;
  public ds: SinqiaDataSource<MensagemRepositorioEntrada>;

  seg: Seg = new Seg();
  constructor(
    private reprocessamentoMensagemService: ReprocessamentoMensagemService,
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
      const selecionadas = this.ds.selection.selected as MensagemRepositorioEntrada[];

      this.reprocessamentoMensagemService.reprocessarMensagemEntrada(selecionadas).subscribe(() => {
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
    this.ds = SinqiaDataSource.of<MensagemRepositorioEntrada>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(d => this.reprocessamentoMensagemService.listarReprocessamentoRepositorioEntrada(this.filtroForm.getRawValue().dataAutorizacao))
      .multiSelectable()
      .build();
  }
}
