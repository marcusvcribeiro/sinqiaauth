import { Ordenacao } from './../../shared/model/enum/ordenacao';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ListResult, ListResultCore, listResult } from 'src/app/shared/model/list-result';

import { ToastService } from '@albert/ui';
import { MessageHelper } from 'src/app/shared/helper/message-helper';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { FilterConditionBuilder } from 'src/app/shared/helper/filter-condition-builder';
import { PixNaoCreditadoCCO } from 'src/app/shared/model/pix-nao-creditado-cco';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { CobLogOcorrencia } from 'src/app/shared/model/cob-log-ocorrencia';
import { PixNaoCreditadoLogOrq } from 'src/app/shared/model/pix-nao-creditado-log-orq';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { PixNaoCreditadoFiltroTransacao } from 'src/app/shared/model/pix-nao-creditado-filtro-transacao';
import { PixNaoCreditadoReenvio } from 'src/app/shared/model/pix-nao-creditado-reenvio';

@Injectable({
  providedIn: 'root'
})
export class PixRecebidoNaoCreditadoService {
  constructor(private httpClientService: HttpClientService, private http: HttpClient, private toastService: ToastService, private translateService: TranslateService) { }


  public toastSuccess(message: string) {
    this.toastService.create({
      type: 'success',
      text: this.translateService.instant(MessageHelper.extrairMensagem(message)),
    });
  }
  listarMensagemTransacao(filtro: PixNaoCreditadoFiltroTransacao): Observable<MensagemTransacao[]> {
    var dataRef = new Date(filtro.dataRefTra);
    const path = `mensagem/relacionadas/${DateFormatHelper.toUrlDate(dataRef)}/${filtro.numSeqTra}`;

    return this.httpClientService.pix.find<MensagemTransacao[]>({
      path, responseType: MensagemTransacao
    });
  }





  listPixNaoCreditado(filtro): Observable<PixNaoCreditadoCCO[]> {
    const path = `v1/reprocessamento-webhook`;
    return this.httpClientService.logLeg.find({path, responseType: PixNaoCreditadoCCO, queryObj: filtro});
  }

  listPixNaoCreditadoPaginado(filtro?: {}): Observable<ListResult<PixNaoCreditadoCCO>> {
    const path = `v1/reprocessamento-webhook/paginado`;
    filtro["sortDirection"] = Ordenacao.DESC;

    return this.httpClientService.logLeg.find({queryObj: filtro, path: path});
  }

  listLogOrq(idUniOpe): Observable<PixNaoCreditadoLogOrq[]> {
    const path = `v1/logLegado/${idUniOpe}`;
    return this.httpClientService.logLeg.find({path, responseType: PixNaoCreditadoLogOrq});
  }
  reenviar(body: PixNaoCreditadoReenvio): Observable<any> {
    const path = "v1/reprocessamento-webhook/reenviar";
    return this.httpClientService.logLeg.post({path, body});
  }

  // mocks -------------mocks ------------------mocks

  listMock(): Observable<PixNaoCreditadoCCO[]> {
    const path = `v1/logLegado/orquestrador/consulta/listMock`;
    return this.httpClientService.logLeg.find({path, responseType: PixNaoCreditadoCCO},);
  }
  listMockParam(filtro): Observable<PixNaoCreditadoCCO[]> {
    const path = `v1/logLegado/orquestrador/consulta/listMock/${DateFormatHelper.toUrlDate(filtro.dataInicio)}/${DateFormatHelper.toUrlDate(filtro.dataFim)}`;
    return this.httpClientService.logLeg.find({
      path, responseType: PixNaoCreditadoCCO});
  }
  listMockLog(): Observable<PixNaoCreditadoLogOrq[]> {
    const path = `v1/logLegado/orquestrador/consulta/listMockLog`;
    return this.httpClientService.logLeg.find({path, responseType: PixNaoCreditadoLogOrq});
  }

  // fim mocks -------------fim mocks ------------------fim mocks



  gerarPDF(filter): Observable<any> {
    const dataInicio = DateFormatHelper.toUrlDate(filter.dataReferenciaInicio);
    const dataFim = DateFormatHelper.toUrlDate(filter.dataReferenciaFim);

    const path = `boleto/consulta/pdf/${dataInicio}/${dataFim}/${filter.situacaoTransacao}`;

    const body = FilterConditionBuilder
      //.adicionarFiltro(new PixNaoCreditadoCCO(filter))
      .build();

    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.core.postOption({
      path, body, options
    });
  }


}
