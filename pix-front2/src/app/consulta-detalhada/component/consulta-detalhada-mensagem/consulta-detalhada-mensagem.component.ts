import { Component, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Mensagem } from '../../../shared/model/mensagem';

@Component({
  selector: 'app-consulta-detalhada-mensagem',
  templateUrl: './consulta-detalhada-mensagem.component.html',
  styleUrls: ['./consulta-detalhada-mensagem.component.scss']
})
export class ConsultaDetalhadaMensagemComponent implements OnChanges {

  @Output() mensagensSelecionadas = new EventEmitter();
  @Input() mensagens: Mensagem[];
  listarConsultaDetalhada = [];
  listaSelecionados = [];

  selection: SelectionModel<Mensagem>;

  constructor() {}

  ngOnChanges() {
    this.selection = new SelectionModel<Mensagem>(true);
    this.listarConsultaDetalhada = this.mensagens;
  }

  itemSelecionado() {
    this.listaSelecionados = this.selection.selected;
    this.mensagensSelecionadas.emit(this.listaSelecionados);
  }

  isAllSelected() {
    return this.selection.selected.length === this.mensagens.length;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.mensagens.forEach(row => this.selection.select(row));
    this.itemSelecionado();
  }
}
