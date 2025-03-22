import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DefaultResponse } from 'src/app/shared/model/default-response';
import { TransacaoErro } from 'src/app/shared/model/transacao-erro';
import { PostTransacao, Transacao } from '../../shared/model/transacao';
import { HttpClientService } from '../../shared/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class TransacaoService {


  private urlTransacaoBloqueada = 'transacao/bloqueadas';

  constructor(private httpClientService: HttpClientService) { }

  listarTransacaoBloqueada(): Observable<Transacao[]> {
    return this.httpClientService.pix.find({ path: this.urlTransacaoBloqueada, responseType: Transacao });
  }

  desbloquearTransacoes(desbloquearTransacoes: Transacao[]): Observable<TransacaoErro[]> {
    const path = 'transacao/desbloqueia';

    const body = new PostTransacao({});
    body.setTransacoes(desbloquearTransacoes);

    return this.httpClientService.pix.post<TransacaoErro[]>({ path, body, responseType: TransacaoErro });
  }

  bloquearTransacoes(transacoesDesbloqueadas: Transacao[]): Observable<TransacaoErro[]> {
    const path = 'transacao/bloqueia';

    const body = new PostTransacao({});
    body.setTransacoes(transacoesDesbloqueadas);

    return this.httpClientService.pix.post<TransacaoErro[]>({ path, body, responseType: DefaultResponse });
  }
}
