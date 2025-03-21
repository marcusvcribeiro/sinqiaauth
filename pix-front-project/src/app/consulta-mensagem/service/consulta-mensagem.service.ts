import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ConsultaMensagemFiltro, ConsultaMensagem } from 'src/app/shared/model/consulta-mensagem';
import { ListResultCore } from 'src/app/shared/model/list-result';
import { EntidadeParticipante } from 'src/app/shared/model/entidade-participante';
import { LogBacen } from 'src/app/shared/model/log-bacen';
import { TrilhaMensagem } from 'src/app/shared/model/trilha-mensagem';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';

@Injectable({
  providedIn: 'root'
})
export class ConsultaMensagemService {
  constructor(private httpClientService: HttpClientService) { }

  listarMensagens(filtro: ConsultaMensagemFiltro, params: { limit?: number, page?: number }): Observable<ListResultCore<ConsultaMensagem>> {
    const path = `mensagem`;

    filtro.dataReferencia = DateFormatHelper.toUrlDate(filtro.dataReferencia);

    const queryObj = { ...filtro, ...params };

    return this.httpClientService.core.find<ListResultCore<ConsultaMensagem>>({
      path, queryObj
    });
  }

  listarEntidades(): Observable<EntidadeParticipante[]> {
    const path = `entidade-participante`;

    return this.httpClientService.core.find<EntidadeParticipante[]>({ path });
  }

  listarTrilhaMensagem(params?: {
    limit?: number,
    offset?: number,
    dataReferencia: Date,
    sequencialMensagemTransacao: number
  }): Observable<ListResultCore<TrilhaMensagem>> {
    const dataReferencia = DateFormatHelper.toUrlDate(params.dataReferencia);
    const path = `mensagem/${dataReferencia}/${params.sequencialMensagemTransacao}/trilha-mensagem-transacao`;

    const queryObj = { limit: params.limit, offset: params.offset };

    return this.httpClientService.core.find<ListResultCore<TrilhaMensagem>>({
      path, queryObj
    });
  }
}
