import { AtribuicaoGrupoUsuario } from './../model/atribuicaoGrpUsu';
import { GrupoUsuario } from './../model/grupoUsuario';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { OperacaoSeg } from '../model/operacao.enum';
import { AlcadaUsuario } from '../model/alcadaUsuario';

@Injectable({
  providedIn: 'root'
})
export class AlcadaService {

  constructor(
    private httpClientService: HttpClientService
  ) { }

  // #region GRUPOS

  novoGrupo(grupo: GrupoUsuario): Observable<GrupoUsuario>{
    const path = 'alcada/grupos';

    const body = grupo;

    return this.httpClientService.pix.post<GrupoUsuario>({ path, body })
  }

  getGrupos(): Observable<GrupoUsuario[]> {
    const path = "alcada/grupos";

    return this.httpClientService.pix.find<GrupoUsuario[]>({ path, responseType: GrupoUsuario });
  }

  excluirGrupo(idGrupo: number): Observable<GrupoUsuario>{
    const path = `alcada/grupos/${idGrupo}`

    return this.httpClientService.pix.delete<GrupoUsuario>({ path })
  }

  editarGrupo(grupo: GrupoUsuario, idGrupo: number): Observable<GrupoUsuario>{
    const path = `alcada/grupos/${idGrupo}`;

    const body = grupo;

    return this.httpClientService.pix.put({ body, path });
  }

  //TODO alterar path
  getGruposUsuario(idUsuario: number): Observable<GrupoUsuario[]> {
    const path = `alcada/grupos/usuario/${idUsuario}`;

    return this.httpClientService.pix.find<GrupoUsuario[]>({ path, responseType: GrupoUsuario });
  }

  getUsuariosGrupo(idGrupo: number): Observable<AlcadaUsuario[]>{
    const path = `alcada/usuarios/grupo/${idGrupo}`;

    return this.httpClientService.pix.find<AlcadaUsuario[]>({ path, responseType: AlcadaUsuario })
  }

  //#region USUARIOS

  getUsuarios(): Observable<AlcadaUsuario[]> {
    const path = `alcada/usuarios`;

    return this.httpClientService.pix.find<AlcadaUsuario[]>({ path, responseType: AlcadaUsuario });
  }

  //#Operacoes de Grupo

  vincularUsuarioGrupo(atribuicaoGrpUsu: AtribuicaoGrupoUsuario): Observable<AtribuicaoGrupoUsuario>{
    const path = `alcada/grupos/usuario`;

    const body = atribuicaoGrpUsu;

    return this.httpClientService.pix.post({ path, body });
  }

  desvincularUsuarioGrupo(idUsuario: number, idGrupo: number): Observable<any>{
    const path = `alcada/grupos/usuario/${idUsuario}/${idGrupo}`;

    return this.httpClientService.pix.delete<any>({ path });
  }

  //#Operacoes de Usuario
  excluirGrupoDeUsuario(body: any, usuario: any): Observable<any>{
    const path = `grupos/usuario/${usuario}`;

    return this.httpClientService.pix.delete({ path, body });
  }

  adicionarGrupoUsuario(body: any, usuario: any): Observable<any>{
    const path = `grupos/usuario/${usuario}`;

    return this.httpClientService.pix.post({ path, body });
  }
}
