import { SistemaParticipante } from './../model/sistema.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../../shared/service/http-client.service';
import { ComposicaoOperacao, Liquidacao, Pesquisa, Produto, Sistema, TipoOperacao } from '../model/composicao-operacao';
import { HistoricoComposicao } from '../model/historico-composicao';
import { Mensagem } from '../model/mensagem';

@Injectable({
  providedIn: 'root'
})
export class ComposicaoOperacaoService {
  private baseURL = 'composicao-operacao';

  constructor(private httpClientService: HttpClientService) { }

  //isAlcada é recebido somente nos componentes que não necessitam de filtros de alçada
  listarComposicaoOperacoes(body: Pesquisa, isAlcada?: boolean): Observable<ComposicaoOperacao[]> {
    const queryObj = new Pesquisa(body);

    if(isAlcada){
      const path = 'composicao-operacao-alcada'

      return this.httpClientService.pix.find({
        path, queryObj, responseType: ComposicaoOperacao
      });
    }

    return this.httpClientService.pix.find({
      path: this.baseURL, queryObj, responseType: ComposicaoOperacao
    });
  }

  listarMensagens(): Observable<Mensagem[]> {
    const path = `${this.baseURL}/mensagem`;

    return this.httpClientService.pix.find({
      path, responseType: Mensagem
    });
  }

  listarTipoOperacaoBancaria(): Observable<TipoOperacao[]> {
    const path = `${this.baseURL}/operacao`;

    return this.httpClientService.pix.find({
      path, responseType: TipoOperacao
    });
  }

  listarSistema(): Observable<Sistema[]> {
    const path = `${this.baseURL}/sistema`;

    return this.httpClientService.pix.find({
      path, responseType: Sistema
    });
  }

  listarProduto(): Observable<Produto[]> {
    const path = `${this.baseURL}/produto`;

    return this.httpClientService.pix.find({
      path, responseType: Produto
    });
  }

  listarLiquidacao(): Observable<Liquidacao[]> {
    const path = `${this.baseURL}/liquidacao`;

    return this.httpClientService.pix.find({
      path, responseType: Liquidacao
    });
  }

  listarHistorico(): Observable<HistoricoComposicao[]> {
    const path = `${this.baseURL}/historico`;

    return this.httpClientService.pix.find({
      path, responseType: HistoricoComposicao
    });
  }

  listarSistemasParticipantes(): Observable<SistemaParticipante[]> {
    const path = `${this.baseURL}/sistema`;

    return this.httpClientService.pix.find({
      path, responseType: SistemaParticipante
    });
  }
}
