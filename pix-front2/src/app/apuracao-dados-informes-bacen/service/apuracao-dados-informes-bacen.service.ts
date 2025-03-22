import { TransacoesDict2Model, TransacoesDictModel } from './../model/dict.model';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { ApuracaoTempoProcessamentoAnalitico } from 'src/app/shared/model/apuracao-tempo-processamento-analitico';
import { ApuracaoTempoProcessamentoSintetico } from 'src/app/shared/model/apuracao-tempo-processamento-sintetico';
import { KeyValue } from 'src/app/shared/model/key-value';
import { ListResult, ListResultCore } from 'src/app/shared/model/list-result';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { TransacoesPix2Model, TransacoesPixModel } from '../model/pix.model';
import { TransacoesBloqueio2Model, TransacoesBloqueioModel } from '../model/bloqueio.model';
import { TransacoesDisponibilidade2Model, TransacoesDisponibilidadeModel } from '../model/disponibilidade.model';

@Injectable({
  providedIn: 'root'
})
export class ApuracaoDadosInformesBacenService {


  constructor(private httpClientService: HttpClientService) {
  }

  listarIndicador(): Observable<KeyValue[]> {
    const path = `apuracao-tempo/indicador`;

    return this.httpClientService.core.find<KeyValue[]>({path});
  }

  listarProcessoAnalitico(params?: { limit?: number, page?: number, dataFim?: Date | string, dataInicio?: Date | string, indicador: string, duracao: string}): Observable<ListResultCore<ApuracaoTempoProcessamentoAnalitico[]>> {
    const path = `apuracao-tempo/analitico/${params.indicador}`;
    if (params.dataFim !== undefined && params.dataInicio !== undefined) {
      params.dataInicio = DateFormatHelper.toUrlDate(params.dataInicio);
      params.dataFim = DateFormatHelper.toUrlDate(params.dataFim);
    }
    return this.httpClientService.core.find<ListResultCore<ApuracaoTempoProcessamentoAnalitico[]>>({ queryObj: params, path });
  }

  listarProcessoSintetico(params?: { limit?: number, page?: number, dataFim?: Date | string, dataInicio?: Date | string, indicador: string}): Observable<ApuracaoTempoProcessamentoSintetico[]> {
    const path = `apuracao-tempo/sintetico/${params.indicador}`;
    if (params.dataFim !== undefined && params.dataInicio !== undefined) {
      params.dataInicio = DateFormatHelper.toUrlDate(params.dataInicio);
      params.dataFim = DateFormatHelper.toUrlDate(params.dataFim);
    }

    return this.httpClientService.core.find<ApuracaoTempoProcessamentoSintetico[]>({ queryObj: params, path });
  }

  importarManualDict(body: TransacoesDictModel): Observable<any>{
    const path = 'transacao/insere/informacao/transacao/2';

    return this.httpClientService.pix.post<any>({path, body});
  }

  importarManualPix(body: TransacoesPixModel): Observable<any>{
    const path = 'transacao/insere/informacao/transacao/1';

    return this.httpClientService.pix.post<any>({path, body});
  }

  importarManualBloqueio(body: TransacoesBloqueioModel): Observable<any>{
    const path = 'transacao/insere/informacao/transacao/3';

    return this.httpClientService.pix.post<any>({path, body});
  }

  importarManualDisponibilidade(body: TransacoesDisponibilidadeModel): Observable<any>{
    const path = 'transacao/insere/informacao/transacao/4';

    return this.httpClientService.pix.post<any>({path, body});
  }

  importarFile(ano: string, mes: string, file: File): Observable<any> {
    const caminho = `transacao/upload/planilha/${ano}/${mes}`;
    const formData = new FormData();

    formData.append('file', file, file.name);

   return this.httpClientService.pix.post({path: caminho, body: formData, options: {reportProgress: true} });
  }

  gerarDados(mes: string, ano: string): Observable<any>{
    const caminho = `transacao/processa/informacao/transacao/${mes}/${ano}`;
    return this.httpClientService.pix.post({ path: caminho});
  }

  download(path: string):Observable<any>{
    return this.httpClientService.pix.get({path});
  }

  consultarDadosDictAnaliticos(params?: {ano: string, mes: string}): Observable<TransacoesDict2Model[]>{
    const caminho = `transacao/consulta/informacao/transacao/dict/${params.mes}/${params.ano}`;
    return this.httpClientService.pix.find<TransacoesDict2Model[]>({ path: caminho});
  }

  consultarDadosSpiAnaliticos(params?: {ano: string, mes: string}): Observable<TransacoesPix2Model[]>{
    const caminho = `transacao/consulta/informacao/transacao/spi/${params.mes}/${params.ano}`;
    return this.httpClientService.pix.find<TransacoesPix2Model[]>({ path: caminho});
  }

  consultarDadosTransacoesBloqueadas(params?: {ano: string, mes: string}): Observable<TransacoesBloqueio2Model[]>{
    const caminho = `transacao/consulta/informacao/transacao/bloqueio/${params.mes}/${params.ano}`;
    return this.httpClientService.pix.find<TransacoesBloqueio2Model[]>({ path: caminho});
  }

  consultarDadosTransacoesDisponibilidade(params?: {ano: string, mes: string}): Observable<TransacoesDisponibilidade2Model[]>{
    const caminho = `transacao/consulta/informacao/transacao/disponibilidade/${params.mes}/${params.ano}`;
    return this.httpClientService.pix.find<TransacoesDisponibilidade2Model[]>({ path: caminho});
  }

  exportar(params?: { ano: string, mes: string, tipo}): Observable<any> {
    const path = `apuracao-tempo/exportar/${params.tipo}/${params.mes}/${params.ano}`;
    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.core.findOption({path, options});
  }
}
