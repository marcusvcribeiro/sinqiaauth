import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { HistoricoComposicao } from 'src/app/shared/model/historico-composicao';
import { ComposicaoOperacaoService } from 'src/app/shared/service/composicao-operacao.service';

@Component({
  selector: 'app-historico-pesquisa-composicao',
  templateUrl: './historico-pesquisa-composicao.component.html',
})
export class HistoricoPesquisaComposicaoComponent implements OnInit, OnDestroy, OnChanges {

  @Input() update: boolean;
  @Output() historicoPesquisaComposicao: EventEmitter<HistoricoComposicao> = new EventEmitter();

  _unsubscribe$ = new Subject();
  historicoPesquisaComposicao$: Observable<HistoricoComposicao[]>;

  constructor(
    private composicaoOperacaoService: ComposicaoOperacaoService) { }

  // override
  ngOnInit() {
    this.pesquisarHistorico();
  }

  // override
  ngOnDestroy(): void {
    this._unsubscribe$.next();
    this._unsubscribe$.complete();
  }

  // override
  ngOnChanges(changes: SimpleChanges): void {
    this.pesquisarHistorico();
  }

  onItemSelecionadoClick(historico: HistoricoComposicao) {
    this.historicoPesquisaComposicao.emit(historico);
  }

  private pesquisarHistorico() {
    this.historicoPesquisaComposicao$ = this.composicaoOperacaoService
      .listarHistorico()
      .pipe(
        takeUntil(this._unsubscribe$),
        map((composicoes: HistoricoComposicao[]) => composicoes.filter(composicao => composicao.codigoMensagem)));
  }
}
