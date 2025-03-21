import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ConsultaMensagemFiltro, ConsultaMensagem } from 'src/app/shared/model/consulta-mensagem';
import { ListResultCore } from 'src/app/shared/model/list-result';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { HttpClient } from '@angular/common/http';
import { ConsultaCobrancaFiltro } from 'src/app/shared/model/consulta-cobranca-filtro';
import { CobrancaImediata } from 'src/app/shared/model/cobranca-imediata';
import { CobrancaVencimento } from 'src/app/shared/model/cobranca-vencimento';
import { InformacoesAdicionais } from 'src/app/shared/model/info-adicionais';
import { CobDescontoDatafixa } from 'src/app/shared/model/cob-desc-data-fixa';
import { CobLogOcorrencia } from 'src/app/shared/model/cob-log-ocorrencia';
import { ToastService } from '@albert/ui';
import { MessageHelper } from 'src/app/shared/helper/message-helper';
import { TranslateService } from '@ngx-translate/core';
import { ConsultaCobrancaFilter } from 'src/app/shared/model/consulta-cob-filter';
import { CobLogWebhook } from 'src/app/shared/model/cob-log-webhook';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCobrancaService {
  constructor(private httpClientService: HttpClientService, private http: HttpClient, private toastService: ToastService, private translateService: TranslateService) { }

  listarMensagens(filtro: ConsultaMensagemFiltro, params: { limit?: number, page?: number }): Observable<ListResultCore<ConsultaMensagem>> {
    const path = `mensagem`;

    filtro.dataReferencia = DateFormatHelper.toUrlDate(filtro.dataReferencia);

    const queryObj = { ...filtro, ...params };

    return this.httpClientService.core.find<ListResultCore<ConsultaMensagem>>({
      path, queryObj
    });
  }

  public toastSuccess(message: string) {
    this.toastService.create({
      type: 'success',
      text: this.translateService.instant(MessageHelper.extrairMensagem(message)),
    });
  }

  listarCobrancas( filtro: ConsultaCobrancaFiltro, page: { limit?: number, page?: number }, dataInicio: string, dataFim: string): Observable<ListResultCore<ConsultaCobranca>> {

    if (page.limit===undefined || page.page===undefined ){
      page.limit=10
      page.page=1
    }
 
    if (filtro.vlrOriginal===''){
      filtro.vlrOriginal = null
    }
    if (filtro.idVlrOriginalMaior===''){
      filtro.idVlrOriginalMaior = null
    }
    if (filtro.idVlrOriginalMenor===''){
      filtro.idVlrOriginalMenor = null
    }

    const path = `QrCodeDinamico/consulta/listCobContent`;
    return this.httpClientService.cob.post<ListResultCore<ConsultaCobranca>>({
      path, body:{txid: filtro.txid, revisao: filtro.revisao,  idSituacaoCobranca: filtro.idSituacaoCobranca, idTipoCobranca: filtro.idTipoCobranca, idFlagApiPix: filtro.idFlgApiPix,
        idIntCob: filtro.idIntCob, chave: filtro.chave, idCpfCnpjRec: filtro.idCpfCnpjRec, idCpfCnpjDev:filtro.idCpfCnpjDev, idVlrOriginalMaior: filtro.idVlrOriginalMaior, idVlrOriginalMenor: filtro.idVlrOriginalMenor, dataInicio:  filtro.dataInicio, dataFim:   filtro.dataFim, limit: page.limit, page: page.page,
        dtCriacaoCob: filtro.dtCriacaoCob,  vlrOriginal: filtro.vlrOriginal, tokenAcesso: filtro.tokenAcesso, chvEnd: filtro.chvEnd, usuRec: filtro.usuRec, nomeRec: filtro.nomeRec, nomeDev:filtro.nomeDev, solPag:filtro.solPag
      }
      });
   
  }
  

  listarImediataDefault(cons: ConsultaCobranca ): Observable<CobrancaImediata> {
    const tokenAcesso = cons.tokenAcesso;
    const cobrevisao = cons.rev;
    const cobtxid = cons.txid;
     const path = `QrCodeDinamico/consulta/imediata`;
    return this.httpClientService.cob.post<CobrancaImediata>({
      path , body:{txid: cobtxid, tokenAcesso: tokenAcesso, revisao: cobrevisao}
    });

  }


  reprocessar(filtro: ConsultaCobrancaFilter[] ): Observable<string> {
     const path = `QrCodeDinamico/processa/reprocessar`;
    return this.httpClientService.cob.post<string>({
      path , body:{lista:filtro}
    });

  }

  listarVencimentoDefault(cons: ConsultaCobranca ): Observable<CobrancaVencimento> {
    const tokenAcesso = cons.tokenAcesso;
    const cobrevisao = cons.rev;
    const cobtxid = cons.txid;
     const path = `QrCodeDinamico/consulta/vencimento`;
    return this.httpClientService.cob.post<CobrancaVencimento>({
      path , body:{txid: cobtxid, tokenAcesso: tokenAcesso, revisao: cobrevisao}
    });
   
  }

  listInfoAdicional(cons: ConsultaCobranca ):Observable<InformacoesAdicionais[]> {
    const tokenAcesso = cons.tokenAcesso;
    const cobrevisao = cons.rev;
    const cobtxid = cons.txid;
     const path = `QrCodeDinamico/consulta/infoAdicional`;
    return this.httpClientService.cob.post<InformacoesAdicionais[]>({
      path , body:{txid: cobtxid, tokenAcesso: tokenAcesso, revisao: cobrevisao}
    });
   
  }

  listDescDataFixa(cons: ConsultaCobranca ): Observable<CobDescontoDatafixa[]> {
    const tokenAcesso = cons.tokenAcesso;
    const cobrevisao = cons.rev;
    const cobtxid = cons.txid;
     const path = `QrCodeDinamico/consulta/dataFixa`;
    return this.httpClientService.cob.post<CobDescontoDatafixa[]>({
      path , body:{txid: cobtxid, tokenAcesso: tokenAcesso, revisao: cobrevisao}
    });
   
  }
  listLogQrCodeOcorrencia(cons: ConsultaCobranca ): Observable<CobLogOcorrencia[]> {
    const tokenAcesso = cons.tokenAcesso;
    const cobrevisao = cons.rev;
    const cobtxid = cons.txid;
     const path = `QrCodeDinamico/consulta/logQrCodeOcorrencia`;
    return this.httpClientService.cob.post<CobLogOcorrencia[]>({
      path , body:{txid: cobtxid, tokenAcesso: tokenAcesso, revisao: cobrevisao}
    });

  }

  listLogWebhookQrCode(cons: ConsultaCobranca ): Observable<CobLogWebhook[]> {
    const tokenAcesso = cons.tokenAcesso;
    const cobrevisao = cons.rev;
    const cobtxid = cons.txid;
     const path = `QrCodeDinamico/consulta/logWebhookQrCode`;
    return this.httpClientService.cob.post<CobLogWebhook[]>({
      path , body:{txid: cobtxid, tokenAcesso: tokenAcesso, revisao: cobrevisao}
    });
  }

}
