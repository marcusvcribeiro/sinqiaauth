import { AssociacaoAlcadaGrupoUsuario } from 'src/app/cadastros/model/associacaoAlcadaGrpUsuario';
import { Observable } from 'rxjs';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import { Injectable } from '@angular/core';
import { HttpClientService } from 'src/app/shared/service/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AssociacaoAlcadaGrpUsuService {

  constructor(private httpClientService: HttpClientService) { }

  listarComposicaoOperacao(): Observable<ComposicaoOperacao[]>{
    const path = 'alcada/associacao';

    return this.httpClientService.pix.find<ComposicaoOperacao[]>({ path });
  }

  listarAssociacao(composicaoOperacao: any): Observable<AssociacaoAlcadaGrupoUsuario[]>{
    const path = 'alcada/associacao';

    const body = composicaoOperacao;

    return this.httpClientService.pix.find<AssociacaoAlcadaGrupoUsuario[]>({ queryObj: composicaoOperacao , path, responseType: AssociacaoAlcadaGrupoUsuario });
  }

  cadastrarAssociacao(associacaoAlcada: AssociacaoAlcadaGrupoUsuario): Observable<AssociacaoAlcadaGrpUsuService>{
    const path = 'alcada/associacao';

    const body = associacaoAlcada;

    return this.httpClientService.pix.post({ path, body })
  }

  deletarAssociacao(associacao: AssociacaoAlcadaGrupoUsuario): Observable<AssociacaoAlcadaGrpUsuService>{
    const path = 'alcada/associacao';

    return this.httpClientService.pix.delete({ queryObj: associacao, path })
  }

  editarAssociacao(params: any, associacao: AssociacaoAlcadaGrupoUsuario): Observable<AssociacaoAlcadaGrpUsuService>{
    const path = 'alcada/associacao';

    return this.httpClientService.pix.put({ queryObj: params, body: associacao, path})
  }
}
