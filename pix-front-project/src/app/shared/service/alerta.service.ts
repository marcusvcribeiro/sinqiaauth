import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateFormatHelper } from '../helper/date-format-helper';
import { FilterConditionBuilder } from '../helper/filter-condition-builder';
import { Alerta, AlertaBody, AlertaFiltro } from '../model/alerta';
import { AlertaNaoLido } from '../model/alerta-nao-lido';
import { ListResult, listResult } from '../model/list-result';
import { PageRequest } from '../model/page-request';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AlertaService {

  constructor(private httpClientService: HttpClientService) {
  }

  listarAlerta(params: { limit?: number, page?: number, dataReferencia: Date }, filter): Observable<ListResult<Alerta>> {
    let path = `alertas/${DateFormatHelper.toUrlDate(params.dataReferencia)}`;
    let body;
    if (filter !== null) {
      body = FilterConditionBuilder.adicionarFiltro(new AlertaFiltro(filter)).build().filtro;
      path = `alertas/${DateFormatHelper.toUrlDate(filter.dataReferencia)}`;
    }

    const queryObj = new PageRequest(params);

    return this.httpClientService.pix.post<ListResult<Alerta>>(
      { path, queryObj, body, responseType: listResult(Alerta) });
  }

  obterQuantidadeAlertasNaoLidos(dataReferencia: Date): Observable<number> {
    const path = `alertas/nao-lida/${DateFormatHelper.toUrlDate(dataReferencia)}`;

    return this.httpClientService.pix
      .find<AlertaNaoLido>({ path, responseType: AlertaNaoLido, hideProgressBar: true }).pipe(map(v => v.alertaNaoLido));
  }


  listarMarcarLido(body: Alerta): Observable<ListResult<Alerta>> {
    const path = `alertas/marcar-como-lido/${DateFormatHelper.toUrlDate(body.dataReferencia)}/${body.numeroSequencial}`;

    return this.httpClientService.pix.put<ListResult<Alerta>>({
      path, responseType: listResult(AlertaBody)
    });
  }


  onExcluirAlerta(numeroSequencial: number, dataReferencia: Date) { }

}
