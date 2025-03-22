import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListResult } from 'src/app/shared/model/list-result';
import { MensagemRepositorioSaida } from 'src/app/shared/model/mensagem-repositorio-saida';
import { PageRequest } from 'src/app/shared/model/page-request';


@Component({
  selector: 'app-monitor-saida',
  templateUrl: './monitor-saida.component.html',
  styleUrls: ['./monitor-saida.component.scss']
})
export class MonitorSaidaComponent {
  @Input() mensagensRepositorioSaida: ListResult<MensagemRepositorioSaida>;
  @Input() itemSelecionadoSaida: MensagemRepositorioSaida;
  @Output() onSelecionado = new EventEmitter();
  @Output() onPesquisar = new EventEmitter<PageRequest>();

  private pageRequest = new PageRequest({ page: 1, limit: 15 });

  maximo: number;
  minimo: number;

  get itemMaximo() {
    this.maximo = this.mensagensRepositorioSaida.metadata.itemPerPage * this.mensagensRepositorioSaida.metadata.pageNo;
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
    if (this.itemMinimo < this.mensagensRepositorioSaida.metadata.itemPerPage) {
      return;
    }

    this.pageRequest.page -= 1;
    this.onPesquisar.emit(this.pageRequest);
  }

  onProsseguir() {
    if (this.itemMaximo >= this.mensagensRepositorioSaida.metadata.totalCount) {
      return;
    }

    this.pageRequest.page += 1;
    this.onPesquisar.emit(this.pageRequest);
  }

  onPularTodos() {
    this.pageRequest.page = this.mensagensRepositorioSaida.metadata.pageCount;
    this.onPesquisar.emit(this.pageRequest);
  }
}
