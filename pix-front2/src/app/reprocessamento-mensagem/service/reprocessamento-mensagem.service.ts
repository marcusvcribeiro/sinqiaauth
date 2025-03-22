import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { ReprocessamentoEnvio } from 'src/app/shared/model/reprocessamento-envio';
import { ReprocessamentoSaida } from 'src/app/shared/model/reprocessamento-saida';
import { MensagemRepositorioEntrada } from 'src/app/shared/model/mensagem-repositorio-entrada';
import { MensagemErroRecebimento, MensagemErroRecebimentoID } from 'src/app/shared/model/mensagem-erro-recebimento';
import { Transacao } from 'src/app/shared/model/transacao';
import { MensagemEnvioRepositorioSaida } from 'src/app/shared/model/reprocessamento-envio-repositorio-saida';
import { MensagemErro } from 'src/app/shared/model/mensagem-erro';
import { MensagemErroFormatacaoID } from 'src/app/shared/model/mensagem-erro-formatacao';
import { MensagemEnvio } from 'src/app/shared/model/reprocessa-erro-envio';
import { MensagemSaida } from 'src/app/shared/model/reprocessa-erro-saida';

@Injectable()
export class ReprocessamentoMensagemService {
  constructor(private httpClientService: HttpClientService) { }

  listarReprocessamentoEnvio(data: Date): Observable<any> {
    const path = `mensagem/com-erro-de-envio/${DateFormatHelper.toUrlDate(data)}`;

    return this.httpClientService.pix.find({ path, responseType: ReprocessamentoEnvio });
  }

  listarReprocessamentoRepositorioSaida(data: Date): Observable<ReprocessamentoSaida[]> {
    const path = `mensagem/erro-no-repositorio-saida/${DateFormatHelper.toUrlDate(data)}`;

    return this.httpClientService.pix.find({ path, responseType: ReprocessamentoSaida });
  }

  listarReprocessamentoRepositorioEntrada(data: Date): Observable<MensagemRepositorioEntrada[]> {
    const path = `mensagem/erro-no-repositorio-entrada/${DateFormatHelper.toUrlDate(data)}`;
    return this.httpClientService.pix.find({ path, responseType: MensagemRepositorioEntrada });
  }

  listarReprocessamentoRecebimento(data: Date): Observable<MensagemErroRecebimento[]> {
    const path = `mensagem/com-erro-no-recebimento/${DateFormatHelper.toUrlDate(data)}`;
    return this.httpClientService.pix.find({ path, responseType: MensagemErroRecebimento });
  }

  listarReprocessamentoFormatacao(data: Date): Observable<Transacao[]> {
    const path = `mensagem/com-erro-de-formatacao/${DateFormatHelper.toUrlDate(data)}`;
    return this.httpClientService.pix.find({ path, responseType: Transacao });
  }

  listarReprocessamentoEnvioRepositorioSaida(data: Date): Observable<MensagemEnvioRepositorioSaida[]> {
    const path = `mensagem/com-erro-de-envio-repositorio-saida/${DateFormatHelper.toUrlDate(data)}`;
    return this.httpClientService.pix.find({ path, responseType: MensagemEnvioRepositorioSaida });
  }

  listarReprocessamentoMonitor(): Observable<any> {
    const path = `reprocessamento/monitor`;
    return this.httpClientService.pix.find({ path });
  }

  reprocessarEnvioRepositorioSaida(mensagensEnvioSaida: MensagemEnvioRepositorioSaida[]) {
    const path = `mensagem/reprocessa/com-erro-de-envio-repositorio-saida`;

    const body: MensagemErro<MensagemEnvioRepositorioSaida> = new MensagemErro({ records: mensagensEnvioSaida });
    return this.httpClientService.pix.post({ path, body });
  }

  reprocessarMensagesFormatacao(mensagensId: MensagemErroFormatacaoID[]) {
    const path = 'mensagem/reprocessa/com-erro-de-formatacao';

    const body: MensagemErro<MensagemErroFormatacaoID> = new MensagemErro({ records: mensagensId });
    return this.httpClientService.pix.post({ path, body });
  }

  reprocessarMensagesRecebimento(mensagensId: MensagemErroRecebimentoID[]) {
    const path = 'mensagem/reprocessa/com-erro-no-recebimento';

    const body: MensagemErro<MensagemErroRecebimentoID> = new MensagemErro({ records: mensagensId });
    return this.httpClientService.pix.post({ path, body });
  }

  reprocessarMensagemEnvio(mensagensEnvio: MensagemEnvio[]): Observable<MensagemEnvio[]> {
    const path = `mensagem/reprocessa/com-erro-de-envio`;
    const body: MensagemErro<MensagemEnvio> = new MensagemErro({ records: mensagensEnvio });

    return this.httpClientService.pix.post({ path, body });
  }

  reprocessarMensagemEntrada(mensagensEntrada: MensagemRepositorioEntrada[]) {
    const path = 'mensagem/reprocessa/erro-no-repositorio-entrada';
    const body: MensagemErro<MensagemSaida> = new MensagemErro({ records: mensagensEntrada });

    return this.httpClientService.pix.post({ path, body });
  }

  reprocessarMensagemSaida(mensagensSaida: MensagemSaida[]): Observable<MensagemEnvio[]> {
    const path = 'mensagem/reprocessa/erro-no-repositorio-saida';
    const body: MensagemErro<MensagemEnvio> = new MensagemErro({ records: mensagensSaida });

    return this.httpClientService.pix.post({ path, body });
  }
}

