import { Injectable } from '@angular/core';
import { LogOcorrencia } from '../../shared/model/log-ocorrencia';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ListResult, listResult } from 'src/app/shared/model/list-result';
import { Observable } from 'rxjs';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { PageRequest } from 'src/app/shared/model/page-request';
import { Campo, FilterConditionBuilder } from 'src/app/shared/helper/filter-condition-builder';
import { Ocorrencia } from 'src/app/shared/model/ocorrencia';

@Injectable({
  providedIn: 'root'
})
export class LogOcorrenciaService {
  constructor(private httpClientService: HttpClientService) { }

  listarLogOcorrencias(params?: { limit?: number, page?: number }, filter?, tipoCondicao?: Campo): Observable<ListResult<LogOcorrencia>> {
    let path = `log-ocorrencia/${DateFormatHelper.toUrlDate(filter.dataReferencia)}`;
    const queryObj = new PageRequest({ page: params.page, limit: params.limit });
    let body;

    if (filter) {
      body = FilterConditionBuilder.adicionarFiltro(new LogOcorrencia(filter)).build().filtro;
      path = `log-ocorrencia/${DateFormatHelper.toUrlDate(filter.dataReferencia)}`;
    }

    if (tipoCondicao) {
      body.condicoes.push(tipoCondicao);
    }

    return this.httpClientService.pix.post<ListResult<LogOcorrencia>>
      ({ path, queryObj, body, responseType: listResult(LogOcorrencia) });
  }

  listarOcorrencias(): Observable<Ocorrencia[]> {
    const path = `dominios/ocorrencia`;
    return this.httpClientService.pix.find({
      path, responseType: Ocorrencia
    });
  }

  exportarExcel(filter): Observable<any> {
    const body = FilterConditionBuilder.adicionarFiltro(new LogOcorrencia(filter)).build().filtro;
    const path = `consulta-log-ocorrencia/excel/${DateFormatHelper.toUrlDate(filter.dataReferencia)}`;

    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.core.postOption({
      path, body, options
    });
  }
}
