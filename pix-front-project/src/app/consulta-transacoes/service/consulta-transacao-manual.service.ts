import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MensagemTransacao } from 'src/app/shared/model/mensagem-transacao';
import { DateFormatHelper } from '../../shared/helper/date-format-helper';
import { Campo, FilterConditionBuilder } from '../../shared/helper/filter-condition-builder';
import { BoletagemAlcadaGestaoReserva } from '../../shared/model/alcada-gestao-reserva';
import { BoletagemConsulta } from '../../shared/model/boletagem-consulta';
import { BoletagemConsultaFiltro } from '../../shared/model/boletagem-consulta-filtro';
import { BoletagemTrilhaMensagem } from '../../shared/model/boletagem-trilha-mensagem';
import { BoletagemTrilhaMensagemTransacao } from '../../shared/model/boletagem-trilha-mensagem-transacao';
import { BoletagemTrilhaTransacao } from '../../shared/model/boletagem-trilha-transacao';
import { BoletoConsulta, BoletoGrupo, BoletoPayload } from '../../shared/model/boleto';
import { ConverteTransacaoGrupo } from '../../shared/model/converte-transacao-grupo-composicao';
import { DominioPrioridade } from '../../shared/model/dominio-prioridade';
import { Ordenacao } from '../../shared/model/enum/ordenacao';
import { LiberarBoleto, LiberarBoletoChave } from '../../shared/model/liberar-boleto';
import { ListResult, listResult } from '../../shared/model/list-result';
import { LogOcorrencia } from '../../shared/model/log-ocorrencia';
import { BoletagemMensagensRelacionadas, TransacaoMensagensRelacionadasFiltro } from '../../shared/model/mensagens-relacionadas';
import { PageRequest } from '../../shared/model/page-request';
import { Prioridade } from '../../shared/model/prioridade';
import { RepositorioXml } from '../../shared/model/repositorio-xml';
import { ExcluirTransacao, PostTransacao, TransacaoID, VerificarMensagem } from '../../shared/model/transacao';
import { BoletagemTrilhaAlcadaLiberacao } from '../../shared/model/trilha-alcada-liberacao';
import { BoletagemTrilhaAlcadaReserva } from '../../shared/model/trilha-alcada-reserva';
import { HttpClientService } from '../../shared/service/http-client.service';
import { LogWebhook } from "src/app/shared/model/log-webhook";
import { ConsultaTransacaoManual } from 'src/app/shared/model/consulta-transacao-manual';
import { ConsultaTransacaoFiltro } from 'src/app/shared/model/consulta-transacao-filtro';

@Injectable({
  providedIn: 'root'
})
export class ConsultaTransacaoManualService {
  constructor(private httpClientService: HttpClientService) { }

  excluirMensagem(transacoes: TransacaoID[]): Observable<ListResult<BoletagemConsulta>> {
    const path = 'boleto/excluir';

    const body = new ExcluirTransacao({});
    body.setTransacoes(transacoes);

    return this.httpClientService.pix.delete({
      path, body, id: null
    });
  }

  exportarExcel(filter, tipoCondicao?: Campo): Observable<any> {
    const dataInicio = DateFormatHelper.toUrlDate(filter.dataReferenciaInicio);
    const dataFim = DateFormatHelper.toUrlDate(filter.dataReferenciaFim);

    const path = `boleto/consulta/excel/${dataInicio}/${dataFim}/${filter.situacaoTransacao}`;
    const body = FilterConditionBuilder.adicionarFiltro(new BoletagemConsultaFiltro(filter)).build();
    const options = { observe: 'response', responseType: 'blob' };

    if (tipoCondicao) {
      body.filtro.condicoes.push(tipoCondicao);
    }

    return this.httpClientService.core.postOption({ path, body, options });
  }

  gerarPDF(filter): Observable<any> {
    const dataInicio = DateFormatHelper.toUrlDate(filter.dataReferenciaInicio);
    const dataFim = DateFormatHelper.toUrlDate(filter.dataReferenciaFim);

    const path = `boleto/consulta/pdf/${dataInicio}/${dataFim}/${filter.situacaoTransacao}`;

    const body = FilterConditionBuilder
      .adicionarFiltro(new BoletagemConsultaFiltro(filter))
      .build();

    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.core.postOption({
      path, body, options
    });
  }

  listarMensagem(params?: { limit?: number, page?: number, sortBy?: string, sortDirection?: Ordenacao },
    filter?: ConsultaTransacaoFiltro, tipoCondicao?: Campo): Observable<ListResult<BoletagemConsulta>> {
    const dataInicio = DateFormatHelper.toUrlDate(filter.dataReferenciaInicio);
    const dataFim = DateFormatHelper.toUrlDate(filter.dataReferenciaFim);
    const path = `transacoes/manuais-bloqueadas/${dataInicio}/${dataFim}`;
    const queryObj = new PageRequest(params);

    const body = FilterConditionBuilder
      .adicionarFiltro(new ConsultaTransacaoFiltro(filter))
      .adicionarOrdenacao({ campo: params.sortBy, tipo: params.sortDirection })
      .build();

    if (tipoCondicao) {
      body.filtro.condicoes.push(tipoCondicao);
    }

    return this.httpClientService.core.post<ListResult<ConsultaTransacaoManual>>({
      path, queryObj, body, responseType: listResult(ConsultaTransacaoManual)
    });
  }

  listarMensagemTransacao(filtro: TransacaoMensagensRelacionadasFiltro): Observable<MensagemTransacao[]> {
    const path = `mensagem/relacionadas/${DateFormatHelper.toUrlDate(filtro.dataReferencia)}/${filtro.numeroSequenciaTransacao}`;

    return this.httpClientService.pix.find<MensagemTransacao[]>({
      path, responseType: MensagemTransacao
    });
  }

  liberarBoleto(liberarBoletoChaves: LiberarBoletoChave[]) {
    const path = 'boleto/liberar';

    const body = new LiberarBoleto({});
    body.setLiberarBoletoChave(liberarBoletoChaves);

    return this.httpClientService.pix.post({
      path, body
    });
  }

  definirPrioridade(body: Prioridade) {
    return this.httpClientService.pix.post({
      path: 'boleto/definir-prioridade', body
    });
  }

  cancelarTransacao(transacoes: TransacaoID[]) {
    const path = 'boleto/cancelar';

    const body = new PostTransacao({});
    body.setTransacoes(transacoes);

    return this.httpClientService.pix.delete({
      path, body, id: null
    });
  }

  verificarMensagem(transacoes: TransacaoID[], descricaoMotivo: string) {
    const path = 'boleto/verificar-mensagem';

    const body = new VerificarMensagem({});
    body.descricaoMotivo = descricaoMotivo;
    body.setTransacoes(transacoes);

    return this.httpClientService.pix.post({ path, body });
  }

  listarTrilhaTransacao(dadosPesquisa: TransacaoMensagensRelacionadasFiltro): Observable<BoletagemTrilhaTransacao[]> {
    // tslint:disable-next-line
    const path = `boleto/trilha-transacao/${DateFormatHelper.toUrlDate(dadosPesquisa.dataReferencia)}/${dadosPesquisa.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find({
      path,
      responseType: BoletagemTrilhaTransacao
    });
  }

  listarLogOcorrencia(dadosPesquisa: TransacaoMensagensRelacionadasFiltro): Observable<LogOcorrencia[]> {
    // tslint:disable-next-line
    const path = `boleto/log-ocorrencia/${DateFormatHelper.toUrlDate(dadosPesquisa.dataReferencia)}/${dadosPesquisa.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find<LogOcorrencia[]>({
      path, responseType: LogOcorrencia
    });
  }

  listarMensagensRelacionadas(numeroUnicoOperacao: string,
    numeroUnicoOperacaoOriginal: string): Observable<BoletagemMensagensRelacionadas[]> {
    // tslint:disable-next-line
    const path = `boleto/mensagens-relacionadas?num_ctr_msg=${numeroUnicoOperacao ? numeroUnicoOperacao : ''}&num_ctr_msg_ori=${numeroUnicoOperacaoOriginal ? numeroUnicoOperacaoOriginal : ''}`;
    return this.httpClientService.pix.find({
      path, responseType: BoletagemMensagensRelacionadas
    });
  }

  listarTrilhaAlcadaLiberacao(filtro: TransacaoMensagensRelacionadasFiltro): Observable<BoletagemTrilhaAlcadaLiberacao[]> {
    const path = `boleto/trilha-alcada/${DateFormatHelper.toUrlDate(filtro.dataReferencia)}/${filtro.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find({
      path, responseType: BoletagemTrilhaAlcadaLiberacao
    });
  }

  listarTrilhaAlcadaReserva(filtro: TransacaoMensagensRelacionadasFiltro): Observable<BoletagemTrilhaAlcadaReserva[]> {
    const path = `boleto/trilha-alcada-contapi/${DateFormatHelper.toUrlDate(filtro.dataReferencia)}/${filtro.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find({
      path, responseType: BoletagemTrilhaAlcadaReserva
    });
  }

  listarAlcadaGestaoReserva(filtro: TransacaoMensagensRelacionadasFiltro): Observable<BoletagemAlcadaGestaoReserva[]> {
    const path = `boleto/alcada-gestao-contapi/${DateFormatHelper.toUrlDate(filtro.dataReferencia)}/${filtro.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find({
      path, responseType: BoletagemAlcadaGestaoReserva
    });
  }

  listarTrilhaMensagem(filtro: TransacaoMensagensRelacionadasFiltro): Observable<BoletagemTrilhaMensagem> {
    const path = `boleto/trilha-mensagem/${DateFormatHelper.toUrlDate(filtro.dataReferencia)}/${filtro.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find({
      path, responseType: BoletagemTrilhaMensagem
    });
  }

  listarTrilhaMensagemTransacao(filtro: TransacaoMensagensRelacionadasFiltro): Observable<BoletagemTrilhaMensagemTransacao[]> {
    const path = `boleto/trilha-mensagem-transacao/${DateFormatHelper.toUrlDate(filtro.dataReferencia)}/${filtro.numeroSequenciaTransacao}`;
    return this.httpClientService.pix.find({
      path, responseType: BoletagemTrilhaMensagemTransacao
    });
  }

  listarBoletoCampos(mensagem: BoletoConsulta): Observable<BoletoGrupo> {
    // tslint:disable-next-line
    const path = `mensagem/nova/${mensagem.idMensagem}/${mensagem.idTipoMensagem}/${mensagem.codigoSistemaParticipante}/${mensagem.codigoOperacaoBancariaParticipante}/${mensagem.numeroOperacao}/${mensagem.leitura}`;

    return this.httpClientService.pix.find({
      path, responseType: BoletoGrupo
    });
  }

  listarValoresBoleto(dataReferencia: Date, idTransacao: number): Observable<BoletoGrupo> {
    const data = DateFormatHelper.toUrlDate(dataReferencia);

    return this.httpClientService.pix.find({
      path: `mensagem/vizualizar/${data}/${idTransacao}`, responseType: BoletoGrupo
    });
  }

  listarValoresBoletoRelacionado(codigoMensagem: string, dataReferencia: Date, idTransacao: number, idSistemaEnvioMensagem: number): Observable<BoletoGrupo> {
    const data = DateFormatHelper.toUrlDate(dataReferencia);

    return this.httpClientService.pix.find({

      path: `mensagem/relacionadas/estrutura/${codigoMensagem}/${data}/${idTransacao}/${idSistemaEnvioMensagem}`, responseType: BoletoGrupo
    });
  }

  listarGrupoComposicao(data: string, sequencial: number): Observable<ConverteTransacaoGrupo[]> {
    const path = `boletagem/converte-transacao/busca-composicao/${DateFormatHelper.toUrlDate(data)}/${sequencial}`;
    return this.httpClientService.pix.find({
      path, responseType: ConverteTransacaoGrupo
    });
  }

  listarXml(data: string, idTransacao: number, codMensagem: string, idSistemaEnvioMensagem: number): Observable<RepositorioXml> {
    const path = `mensagem/xml/${DateFormatHelper.toUrlDate(data)}/${idTransacao}/${codMensagem}/${idSistemaEnvioMensagem}`;
    return this.httpClientService.pix.find({
      path, responseType: RepositorioXml
    });
  }

  listarXmlDetalhe(data: string, idTransacao: number, codMensagem: string, idSistemaEnvioMensagem: number): Observable<RepositorioXml> {
    const path = `mensagem/xml/${DateFormatHelper.toUrlDate(data)}/${idTransacao}/${codMensagem}/${idSistemaEnvioMensagem}`;
    return this.httpClientService.pix.find({
      path, responseType: RepositorioXml
    });
  }

  salvarMensagem(boleto: BoletoPayload) {
    const path = `mensagem/salvar`;

    const body = new BoletoPayload(boleto);

    return this.httpClientService.pix.post({
      path, body
    });
  }

  atualizarMensagem(boleto: BoletoPayload) {
    const path = `mensagem/atualizar`;

    const body = new BoletoPayload(boleto);

    return this.httpClientService.pix.post({
      path, body
    });
  }

  listarPrioridade(): Observable<DominioPrioridade[]> {
    const path = 'dominios/prioridade';

    return this.httpClientService.pix.find({ path, responseType: DominioPrioridade });
  }
  exportarCamt052(camt052: string): Observable<any> {
    const path = `arquivo/download/extrato/camt052/${camt052}`;
    const options = { observe: 'response', responseType: 'blob' };
    return this.httpClientService.pix.findOption({path, options});
  }
  listLogWebhook(dadosPesquisa: TransacaoMensagensRelacionadasFiltro ): Observable<LogWebhook[]> {
    const date = DateFormatHelper.toUrlDate(dadosPesquisa.dataReferencia);
    const num = dadosPesquisa.numeroSequenciaTransacao;
    const path = `boleto/log-webhook/${date}/${num}`;
    return this.httpClientService.core.find<LogWebhook[]>({
      path, responseType: LogWebhook
    });
  }
}
