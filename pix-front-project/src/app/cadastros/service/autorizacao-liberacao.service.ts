import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ComposicaoOperacao } from 'src/app/cadastros/model/composicaoOperacao';
import { AutorizacaoLiberacao } from './../model/autorizacaoLiberacao';


@Injectable({
  providedIn: 'root'
})
export class AutorizacaoLiberacaoService {

  constructor(private httpClientService: HttpClientService) { }

  listarAutorizacaoLiberacao(queryParams: ComposicaoOperacao): Observable<AutorizacaoLiberacao[]>{
    const path = `alcada/autorizacao`;

    return this.httpClientService.pix.find<AutorizacaoLiberacao[]>({ path, queryObj: queryParams, responseType: AutorizacaoLiberacao });
  }

  adicionarAutorizacaoLiberacao(autorizacao: AutorizacaoLiberacao): Observable<AutorizacaoLiberacao>{
    const path = `alcada/autorizacao`;

    const body = autorizacao;

    return this.httpClientService.pix.post<AutorizacaoLiberacao>({ path, body })
  }

  atualizarAutorizacaoLiberacao(queryParams: any, autorizacaoLiberacao: AutorizacaoLiberacao): Observable<AutorizacaoLiberacao>{
    const path = `alcada/autorizacao`;

    const body = autorizacaoLiberacao;

    return this.httpClientService.pix.put({ path, queryObj: queryParams, body });
  }

  excluirAutorizacaoLiberacao(queryParams: any): Observable<AutorizacaoLiberacao>{
    const path = `alcada/autorizacao`;

    return this.httpClientService.pix.delete({ path, queryObj: queryParams })
  }
}
