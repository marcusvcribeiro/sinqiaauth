import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResultCore } from 'src/app/shared/model/list-result';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { ChaveDict } from '../model/chave-dict';
import { DetalheChaveDict } from '../model/detalhe-chave-dict';
import { TipoChaveDict } from '../model/tipo-chave-dict';
import { TipoContaDict } from '../model/tipo-conta-dict';
import { TipoDonoDict } from '../model/tipo-dono-dict';
import { SituacaoChaveDict } from '../model/situacao-chave-dict';
import { DonoChave } from './../../shared/model/dono-chave-pix';
import { TrilhaSituacaoRegistroChaveDict } from '../model/trilha-situacao-registro-chave-dict';

@Injectable({
  providedIn: 'root'
})
export class DictService {

  constructor(private httpClientService: HttpClientService) { }

  listarChaves(params?: {}): Observable<ListResultCore<ChaveDict>> {
    const path = 'dict';
    return this.httpClientService.core.find({ queryObj: params, path });
  }

  listarTipoChave(): Observable<TipoChaveDict[]> {
    const path = 'dict/tipo-chave';
    return this.httpClientService.core.find({ path });
  }

  listarTipoDono(): Observable<TipoDonoDict[]> {
    const path = 'dict/tipo-dono';
    return this.httpClientService.core.find({ path });
  }

  listarTipoConta(): Observable<TipoContaDict[]> {
    const path = 'dict/tipo-conta';
    return this.httpClientService.core.find({ path });
  }

  listarDetalheDict(params?: {}): Observable<DetalheChaveDict[]> {
    const path = 'dict/detalhe-dict';
    return this.httpClientService.core.find({ queryObj: params, path });
  }

  listarDonos(): Observable<DonoChave[]> {
    const path = 'integracao/dict/donos';
    return this.httpClientService.core.find({ path });
  }

  listarSituacoes(): Observable<SituacaoChaveDict[]> {
    const path = 'dict/tipo-situacao';
    return this.httpClientService.core.find({ path });
  }

  editarChaveDict(dict: ChaveDict, idChaveDict: number): Observable<ChaveDict>{
    const path = `dict/atualizar-situacao/${idChaveDict}`;
    const body = dict;
    return this.httpClientService.core.put({ body, path });
  }

  listarTrilhaReivindicacao(idChaveDict: number): Observable<TrilhaSituacaoRegistroChaveDict[]> {
    const path = `dict/trilha-reivindicacao/${idChaveDict}`;
    return this.httpClientService.core.find({ path });
  }

}
