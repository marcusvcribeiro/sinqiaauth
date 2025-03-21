import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ListResult } from 'src/app/shared/model/list-result';
import { MensagemRepositorio } from 'src/app/shared/model/mensagem-repositorio';
import { PageRequest } from 'src/app/shared/model/page-request';


@Component({
  selector: 'app-monitor-entrada',
  templateUrl: './monitor-entrada.component.html',
  styleUrls: ['./monitor-entrada.component.scss']
})
export class MonitorEntradaComponent {

  @Input() mensagensRepositorioEntrada: ListResult<MensagemRepositorio>;
  @Input() itemSelecionadoEntrada: MensagemRepositorio;
  @Output() onSelecionado = new EventEmitter();
  @Output() onPesquisar = new EventEmitter<PageRequest>();

  private pageRequest = new PageRequest({ page: 1, limit: 15 });

  maximo: number;
  minimo: number;

  get itemMaximo() {
    this.maximo = this.mensagensRepositorioEntrada.metadata.itemPerPage * this.mensagensRepositorioEntrada.metadata.pageNo;
    return this.maximo;
  }

  get itemMinimo() {
    this.minimo = (this.itemMaximo - 15) + 1;
    return this.minimo;
  }


  onVoltarTodos() {
    this.pageRequest.page = 1;
    this.onPesquisar.emit(this.pageRequest);
  }

  onVoltar() {
    if (this.itemMinimo < this.mensagensRepositorioEntrada.metadata.itemPerPage) {
      return;
    }

    this.pageRequest.page -= 1;
    this.onPesquisar.emit(this.pageRequest);
  }

  onProsseguir() {
    if (this.itemMaximo >= this.mensagensRepositorioEntrada.metadata.totalCount) {
      return;
    }

    this.pageRequest.page += 1;
    this.onPesquisar.emit(this.pageRequest);
  }

  onPularTodos() {
    this.pageRequest.page = this.mensagensRepositorioEntrada.metadata.pageCount;
    this.onPesquisar.emit(this.pageRequest);
  }

}
