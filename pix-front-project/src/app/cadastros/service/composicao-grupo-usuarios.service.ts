import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { GrupoAlcada } from '../model/grupoAlcada';
import { PageRequest } from 'src/app/shared/model/page-request';
import { ListResult, listResult } from '../../shared/model/list-result';
import { GrupoAlarme } from '../model/grupoAlarme';

@Injectable({
  providedIn: 'root'
})
export class ComposicaoGrupoUsuariosService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  buscaAlcadaGrupoUsuarios(idGrupo:number, params?: { limit?: number, page?: number }): Observable<ListResult<GrupoAlcada>>  {
    const path = `alcada/grupo/${idGrupo}/alcadas`;

    const queryObj = new PageRequest(params);

    return this.httpClientService.pix.find<ListResult<GrupoAlcada>>({
      path, queryObj, responseType: listResult(GrupoAlcada)
    });

  }

  excluiAlcadaGrupoUsuarios(idGrupo: number): Observable<any>{
    const path = `alcada/grupo/${idGrupo}/alcadas`;

    return this.httpClientService.pix.delete({ path });
  }

  buscaAlarmeGrupoUsuarios(idGrupo:number, params?: { limit?: number, page?: number }): Observable<ListResult<GrupoAlarme>>  {
    const path = `alcada/grupo/${idGrupo}/alarmes`;

    const queryObj = new PageRequest(params);

    return this.httpClientService.pix.find<ListResult<GrupoAlarme>>({
      path, queryObj, responseType: listResult(GrupoAlarme)
    });

  }

  excluiAlarmeGrupoUsuarios(idGrupo: number): Observable<any>{
    const path = `alcada/grupo/${idGrupo}/alarmes`;

    return this.httpClientService.pix.delete({ path });
  }

}
