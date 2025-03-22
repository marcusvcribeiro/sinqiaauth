import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { MensagemRepositorio } from 'src/app/shared/model/mensagem-repositorio';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { MensagemRepositorioSaida } from 'src/app/shared/model/mensagem-repositorio-saida';
import { SituacaoMensagem } from 'src/app/shared/model/situacao-mensagem';
import { LogOcorrencia } from 'src/app/shared/model/log-ocorrencia';
import { RepositorioXml } from 'src/app/shared/model/repositorio-xml';
import { MensagemRepositorioEntrada } from 'src/app/shared/model/mensagem-repositorio-entrada';
import { MensagemRepositorioFiltro } from 'src/app/shared/model/mensagem-repositorio-filtro';
import { FilterConditionBuilder } from 'src/app/shared/helper/filter-condition-builder';
import { MensagemRepositorioSaidaFiltro } from '../../shared/model/mensagem-repositorio-saida-filtro';
import { PageRequest } from 'src/app/shared/model/page-request';
import { listResult, ListResult } from 'src/app/shared/model/list-result';

@Injectable()
export class MonitorRepositorioService {

  constructor(private httpClientService: HttpClientService) {
  }

  listarMensagensRepositorioEntrada(filtro: MensagemRepositorioFiltro, params: PageRequest): Observable<ListResult<MensagemRepositorio>> {
    const data = DateFormatHelper.toUrlDate(filtro.dataReferencia);
    const path = `repositorio/entrada/${data}`;

    filtro.dataAgendamento = DateFormatHelper.toUrlDateTime(filtro.dataAgendamento);
    filtro.deAgendamento = DateFormatHelper.toUrlDateTime(filtro.deAgendamento);
    filtro.ateAgendamento = DateFormatHelper.toUrlDateTime(filtro.ateAgendamento);

    filtro.dataInclusao = DateFormatHelper.toUrlDateTime(filtro.dataInclusao);
    filtro.deInclusao = DateFormatHelper.toUrlDateTime(filtro.deInclusao);
    filtro.ateInclusao = DateFormatHelper.toUrlDateTime(filtro.ateInclusao);

    filtro.dataProcessamento = DateFormatHelper.toUrlDateTime(filtro.dataProcessamento);
    filtro.deProcessamento = DateFormatHelper.toUrlDateTime(filtro.deProcessamento);
    filtro.ateProcessamento = DateFormatHelper.toUrlDateTime(filtro.ateProcessamento);

    const queryObj = new PageRequest(params);

    const body = FilterConditionBuilder
    .adicionarFiltro(new MensagemRepositorioFiltro(filtro))
    .build().filtro;
    return this.httpClientService.pix.post<ListResult<MensagemRepositorio>>({ path, queryObj, responseType: listResult(MensagemRepositorio), body });
  }

  listarMensagensRepositorioSaida(filtro: MensagemRepositorioSaidaFiltro, params: PageRequest): Observable<ListResult<MensagemRepositorioSaida>> {
    const data = DateFormatHelper.toUrlDate(filtro.dataReferencia);
    const path = `repositorio/saida/${data}`;

    filtro.dataInclusao = DateFormatHelper.toUrlDateTime(filtro.dataInclusao);
    filtro.deInclusao = DateFormatHelper.toUrlDateTime(filtro.deInclusao);
    filtro.ateInclusao = DateFormatHelper.toUrlDateTime(filtro.ateInclusao);

    filtro.dataProcessamento = DateFormatHelper.toUrlDateTime(filtro.dataProcessamento);
    filtro.deProcessamento = DateFormatHelper.toUrlDateTime(filtro.deProcessamento);
    filtro.ateProcessamento = DateFormatHelper.toUrlDateTime(filtro.ateProcessamento);

    const queryObj = new PageRequest(params);

    const body = FilterConditionBuilder
    .adicionarFiltro(new MensagemRepositorioSaidaFiltro(filtro))
    .build().filtro;

    return this.httpClientService.pix.post<ListResult<MensagemRepositorioSaida>>({ path, queryObj, responseType: listResult(MensagemRepositorioSaida), body });
  }

  listarSituacoes(): Observable<SituacaoMensagem> {
    const path = `mensagem/situacao`;
    return this.httpClientService.pix.find({ path: path });
  }

  obterRepositorioEntradaLogOcorrencia(dataReferencia: Date, mensagem: MensagemRepositorio): Observable<LogOcorrencia[]> {
    const data = DateFormatHelper.toUrlDate(dataReferencia);
    const path = `repositorio/entrada/log-ocorrencia/${mensagem.numeroSequencialEntradaLegado}/${data}`;
    return this.httpClientService.pix.find<LogOcorrencia[]>({ path: path, responseType: LogOcorrencia });
  }

  obterRepositorioEntradaXml(dataReferencia: Date, mensagem: MensagemRepositorio): Observable<RepositorioXml> {
    const data = DateFormatHelper.toUrlDate(dataReferencia);
    const path = `repositorio/entrada/xml/${mensagem.numeroSequencialEntradaLegado}/${data}`;
    return this.httpClientService.pix.find<RepositorioXml>({ path: path, responseType: RepositorioXml });
  }

  obterRepositorioSaidaLogOcorrencia(dataReferencia: Date, mensagem: MensagemRepositorioSaida): Observable<LogOcorrencia[]> {
    const data = DateFormatHelper.toUrlDate(dataReferencia);
    const path = `repositorio/saida/log-ocorrencia/${mensagem.numeroSequenciaSaidaLegado}/${data}`;
    return this.httpClientService.pix.find<LogOcorrencia[]>({ path: path, responseType: LogOcorrencia });
  }

  obterRepositorioSaidaXml(dataReferencia: Date, mensagem: MensagemRepositorioSaida): Observable<RepositorioXml> {
    const data = DateFormatHelper.toUrlDate(dataReferencia);
    const path = `repositorio/saida/xml/${mensagem.numeroSequenciaSaidaLegado}/${data}`;
    return this.httpClientService.pix.find<RepositorioXml>({ path: path, responseType: RepositorioXml })
  }
}
