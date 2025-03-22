import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DateFormatHelper } from '../helper/date-format-helper';
import { SistemaInterno } from '../model/composicao-operacao';
import { ConsultaDetalhadaMensagem } from '../model/consulta-detalhada-mensagem';
import { Ordenacao } from '../model/enum/ordenacao';
import { EstadoTransacao } from '../model/estado-transacao';
import { FiltroCampo, FiltroConsultaDetalhada } from '../model/filtro-consulta-detalhada';
import { FiltroMensagem } from '../model/filtro-mensagem';
import { listResult } from '../model/list-result';
import { Mensagem } from '../model/mensagem';
import { PageRequest } from '../model/page-request';
import { SituacaoMensagem } from '../model/situacao-mensagem';
import { TipoEntradaMensagem } from '../model/tipo-entrada-mensagem';
import { KeyValue } from './../model/key-value';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  constructor(private httpClientService: HttpClientService) { }

  listarEstadoTransacao(): Observable<EstadoTransacao[]> {
    return this.listar({ path: 'dominios/estado-transacao', responseType: EstadoTransacao });
  }

  listarSituacaoMensagem(): Observable<SituacaoMensagem[]> {
    return this.httpClientService.pix.find({ path: 'dominios/situacao-mensagem', responseType: SituacaoMensagem });
  }

  listarProduto(): Observable<KeyValue[]> {
    return this.httpClientService.core.find({ path: 'dominio/produto'});
  }

  listarSistemaInterno(): Observable<KeyValue[]> {
    return this.listar({ path: 'dominios/sistemas-internos', responseType: SistemaInterno });
  }

  listarLiquidacao(): Observable<KeyValue[]> {
    return this.listar({ path: 'liquidacao' });
  }

  listarSistemaOrigem(): Observable<KeyValue[]> {
    return this.httpClientService.core.find({ path: 'dominio/sistema-origem' });
  }

  listarEntidadeConveniada(): Observable<KeyValue[]> {
    return this.httpClientService.core.find({ path: 'dominio/entidade-conveniada' });
  }

  listarTipoMensagem(): Observable<KeyValue[]> {
    return this.listar({ path: 'tipo-mensagem' });
  }

  listarTipoEntradaMensagem(): Observable<TipoEntradaMensagem[]> {
    return this.listar({ path: 'dominios/tipo-entrada-mensagem', responseType: TipoEntradaMensagem });
  }

  listarFiltroMensagem(mensagens: Mensagem[]): Observable<FiltroMensagem[]> {
    const path = 'consulta-detalhada/tag-mensagem';
    return this.httpClientService.pix.post({ path, body: mensagens, responseType: FiltroMensagem });
  }

  listarConsultaDetalhada(params?: { limit?: number, page?: number, sortBy?: string, sortDirection?: Ordenacao },
    filtro?: FiltroConsultaDetalhada): Observable<ConsultaDetalhadaMensagem[]> {
    const path = 'consulta-detalhada';

    filtro.dataInicio = DateFormatHelper.toUrlDate(filtro.dataInicio);
    filtro.dataFim = DateFormatHelper.toUrlDate(filtro.dataFim);
    filtro.campos = this.verificarFiltroCamposDinamico(filtro.campos);

    const body = new FiltroConsultaDetalhada(filtro);
    const queryObj = new PageRequest(params);

    return this.httpClientService.pix.post({ path, queryObj, body, responseType: listResult(ConsultaDetalhadaMensagem) });
  }

  exportarExcelConsultaDetalhada(filtro: FiltroConsultaDetalhada): Observable<any> {
    const path = 'consulta-detalhada/excel';
    filtro.dataInicio = DateFormatHelper.toUrlDate(filtro.dataInicio);
    filtro.dataFim = DateFormatHelper.toUrlDate(filtro.dataFim);
    filtro.campos = this.verificarFiltroCamposDinamico(filtro.campos);

    const body = new FiltroConsultaDetalhada(filtro);

    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.core.postOption({
      path, body, options
    });
  }

  private listar(parametrosHttp: any): Observable<any> {
    return this.httpClientService.pix.find(parametrosHttp);
  }

  private verificarFiltroCamposDinamico(campos: any[]): FiltroCampo[] {
    const listaCampos: FiltroCampo[] = [];

    campos.forEach(campo => {
      if (campo.valorInicio) {
        const filtro = new FiltroCampo();
        filtro.campo = campo.campo;
        filtro.operador = campo.operadorInicio;
        filtro.valor = campo.valorInicio;
        listaCampos.push(filtro);
      }
      if (campo.valorFim) {
        const filtro = new FiltroCampo();
        filtro.campo = campo.campo;
        filtro.operador = campo.operadorFim;
        filtro.valor = campo.valorFim;
        listaCampos.push(filtro);
      }
    });

    return listaCampos;
  }

}
